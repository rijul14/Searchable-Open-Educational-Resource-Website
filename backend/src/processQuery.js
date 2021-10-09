const headers = ['title', 'vocabulary', 'grammar', 'level', 'author', 'technology_used', 'skills']

module.exports.processQuery = async function (query, params, docClient) {
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
    qterm = headers.map((header, _) => `contains(#${header}, :q)`).join(" or ");
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
    Object.assign(params.ExpressionAttributeNames, headers.reduce((map, header, _) => (map[`#${header}`] = header, map), {}));
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
