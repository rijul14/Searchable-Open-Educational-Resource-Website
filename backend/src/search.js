const {Document} = require("flexsearch");
const searchHeaders = ['title', 'vocabulary', 'grammar', 'level', 'author', 'technology_used', 'skills'];
const param_settings = ['limit', 'offset'];
module.exports.searchHeaders = searchHeaders;

let docIndex;
const indexOptions = {
  preset: "default",
  charset: "latin:advanced",
  language: "es",
  tokenize: "full",
  index: searchHeaders,
  store: [...searchHeaders, "location"]
}

// const LocalStorage = require('node-localstorage').LocalStorage,
//   localStorage = new LocalStorage('./scratch');

module.exports.processQueryDynamo = async function (query, params, docClient) {
  // const data = (await docClient.scan(params).promise()).Items;
  // let keyConditions = Object.entries(body).map(([key, val], _) => [key, val])
  //   .reduce((map, obj) => (map[obj[0]] = {
  //     ComparisonOperator: "EQ",
  //     AttributeValuesList: [{S: obj[1]}]
  //   }, map), {});
  // Object.assign(params, {
  //   KeyConditions :
  //     keyConditions
  // })
  let q;
  let qterm;
  if ('q' in query) {
    q = query.q;
    delete query.q;
    qterm = searchHeaders.map((header, _) => `contains(#${header}, :q)`).join(" or ");
  }
  let queryTerm = Object.entries(query).map(([key, val], idx) => `contains(#k${idx}, :v${idx})`).join(" and ");
  if (typeof qterm !== 'undefined') {
    if (queryTerm !== "") {
      qterm = ` and (${qterm})`
    }
    queryTerm += qterm;
  }
  Object.assign(params, {
    FilterExpression: queryTerm,
    ExpressionAttributeNames:
      Object.entries(query).map(([key, val], _) => `_search_${key.toLowerCase()}`) // use the search columns
        .reduce((map, key, idx) => (map[`#k${idx}`] = key, map), {}),
    ExpressionAttributeValues:
      Object.entries(query).map(([key, val], _) => val.toLowerCase())
        .reduce((map, val, idx) => (map[`:v${idx}`] = val, map), {}),
  });
  if (typeof q !== 'undefined') {
    Object.assign(params.ExpressionAttributeNames, searchHeaders.reduce((map, header, _) => (map[`#${header}`] = header, map), {}));
    params.ExpressionAttributeValues[':q'] = q;
  }
  console.log("Query params:", params);
  const data = (await docClient.scan(params).promise()).Items;
  // console.log("Data from db", data);
  // get rid of search columns
  data.forEach(item => Object.keys(item).forEach(key => {
    if (key.startsWith("_search_")) delete item[key];
  }))
  console.log('Requested data:', data, `Count: ${data.length}`);
  return data;
}

const isObjEmpty = obj => Object.keys(obj).length === 0;

const indexDocs = async (docClient, tableName) => {
  const start = new Date().getTime();
  const docIndex = new Document(indexOptions);
  const data = (await docClient.scan({TableName: tableName}).promise()).Items;
  data.forEach(item => {
    docIndex.add(item);
  });
  console.log("Indexing took", new Date().getTime() - start, 'ms');
  await docIndex.export((key, data) => {
    console.log("Index key:", key);
    // localStorage.setItem(key, data);
  });
  return docIndex;
}

const loadIndex = (docClient) => {
  // const keys = Object.keys(localStorage);
  // const docIndex = new Document(indexOptions);
  // for(let i = 0, key; i < keys.length; i++){
  //   key = keys[i];
  //   docIndex.import(key, localStorage.getItem(key));
  // }
 // return docIndex;
  return null;
}

const getDocIndex = async (docClient, tableName) => {
  if (typeof docIndex === 'undefined') {
    docIndex = await loadIndex(docClient);
    if (!docIndex) {
      docIndex = await indexDocs(docClient, tableName);
    }
  }
  return docIndex;
}

function apply_enrich(res){

  const arr = new Array(res.length);

  for(let x = 0, id; x < res.length; x++){

    id = res[x];

    arr[x] = docIndex.get(id);
  }

  return arr;
}

module.exports.processQueryFlex = async function (query, docClient, tableName) {
  if (typeof docIndex === 'undefined') docIndex = await getDocIndex(docClient, tableName);
  let q;
  let params = {suggest: true};
  if ('q' in query) {
    q = query.q;
    delete query.q;
  }

  function processParams(param) {
    if (param in query) {
      params[param] = query[param];
      delete query[param];
    }
  }

  param_settings.forEach(s => processParams(s));

  let result;
  if (isObjEmpty(query)) { // simple full text search
    params.enrich = true;
    result = await docIndex.search(q, params);
  } else { // per field queries
    // params.bool = "and";
    let qResult;
    if (q) {
      // searchList.push.apply(searchList, searchHeaders.map(val => ({...params, field: val, query: q})));
      qResult = await docIndex.search(q, params);
      if (qResult.length === 0){
        return []; // global query didn't match anything
      }
    }
    const searchList = Object.entries(query).map(([key, val]) => ({...params, field: key, query: val}));
    console.log("Search list", searchList);
    result = await docIndex.search(searchList);
    if (qResult) {
      for (const qres of qResult) {
        const findRes = result.find(res => res.field === qres.field);
        if (typeof findRes !== "undefined"){ // combine results
          findRes.result.push.apply(findRes, qres.result);
        }else{ // push in new result
          result.push(qres);
        }
      }
    }
    if (true) { // todo intersection option
      // intersect all results to get AND behavior, removed from flexsearch :(
      result = [{result: result.map(res => {
        if (res.field in query) delete query[res.field];
        return res.result;
      }).reduce((a, b) => a.filter(c => b.includes(c)))}]; // from https://stackoverflow.com/a/51874332/8170714
      if (!isObjEmpty(query)){ // have fields not matched at all
        result = [];
      }
    }
  }
  result = result.map(res => {
    if (res.result && res.result.length > 0 && !isNaN(res.result[0])){ // not enriched, bug https://github.com/nextapps-de/flexsearch/issues/264
      return res.result.map(id => docIndex.get(id));
    } else return res.result;
  }).flat(1); // flatten to 1d array
  console.log("Search params", params, `result (${result.length}):`, result);
  return result;
}
