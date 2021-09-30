export async function processQuery(body, params, docClient) {
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
  const queryTerm = Object.entries(body).map(([key, val], idx) => `contains(#k${idx}, :v${idx})`).join(" and ");
  Object.assign(params, {
    FilterExpression: queryTerm,
    ExpressionAttributeNames:
      Object.entries(body).map(([key, val], _) => `_search_${key.toLowerCase()}`) // use the search columns
        .reduce((map, key, idx) => (map[`#k${idx}`] = key, map), {}),
    ExpressionAttributeValues:
      Object.entries(body).map(([key, val], _) => val.toLowerCase())
        .reduce((map, val, idx) => (map[`:v${idx}`] = val, map), {}),
  })
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
