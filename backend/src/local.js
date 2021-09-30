// default imports, from https://github.com/aws-samples/lambda-refarch-webapp/
// const AWSXRay = require("aws-xray-sdk-core");
// const AWS = AWSXRay.captureAWS(require("aws-sdk"));
// const { metricScope, Unit } = require("aws-embedded-metrics");
// const DDB = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
const AWS = require("aws-sdk");

// environment variables
const {TABLE_NAME, ENDPOINT_OVERRIDE, REGION} = process.env;
const options = {region: "us-west-2"};
AWS.config.update({
  region: REGION,
  accessKeyId: 'KEY_ID',
  secretAccessKey: 'ACCESS_KEY',
});

const isRunningLocally = () => 'true'
// const tableName = process.env.TABLE_NAME;
const tableName = "MainTable";

if (ENDPOINT_OVERRIDE !== "") {
  options.endpoint = ENDPOINT_OVERRIDE;
} else if (isRunningLocally()) {
  options.endpoint = 'http://dynamodb:8000';
  // options.endpoint = 'http://docker.for.windows.localhost:8000';
}
options.endpoint = 'http://127.0.0.1:8000';

const docClient = new AWS.DynamoDB.DocumentClient(options);
// response helper
const jsonResponse = (statusCode, body, additionalHeaders) => ({
  statusCode,
  body: JSON.stringify(body),
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    ...additionalHeaders,
  },
});

// adapted from https://stackoverflow.com/a/62900949/8170714
const updateParams = async (item, idAttributeName) => {
  const params = {
    Key: {},
    ExpressionAttributeValues: {},
    ExpressionAttributeNames: {},
    UpdateExpression: "",
    ReturnValues: "UPDATED_NEW"
  };

  params["Key"][idAttributeName] = item[idAttributeName];

  let prefix = "set ";
  let attributes = Object.keys(item);
  for (let i = 0; i < attributes.length; i++) {
    let attribute = attributes[i];
    if (attribute !== idAttributeName) {
      params["UpdateExpression"] += prefix + "#" + attribute + " = :" + attribute;
      params["ExpressionAttributeValues"][":" + attribute] = item[attribute];
      params["ExpressionAttributeNames"]["#" + attribute] = attribute;
      prefix = ", ";
    }
  }
}

const search = async (event, context) => {
  try {
    console.log('Search received:', event);
    // const body = JSON.parse(event.body);
    const body = {"skills": "auditiv"};
    console.log('Options', options, 'Table name', tableName);

    const params = {
      TableName: tableName
    };
    console.log('Search request json', body);

    const data = await processQuery(body, params, docClient);

    return jsonResponse(200, data);
  } catch (e) {
    console.error(e);
  }
}

search().then(r => console.log("Result", r));
