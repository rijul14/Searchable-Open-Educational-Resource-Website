
// default imports, from https://github.com/aws-samples/lambda-refarch-webapp/
const AWSXRay = require("aws-xray-sdk-core");
const AWS = AWSXRay.captureAWS(require("aws-sdk"));
const { metricScope, Unit } = require("aws-embedded-metrics");
// const DDB = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

// environment variables
const { TABLE_NAME, ENDPOINT_OVERRIDE, REGION } = process.env;
const options = { region: REGION };
AWS.config.update({ region: REGION });

if (ENDPOINT_OVERRIDE !== "") {
  options.endpoint = ENDPOINT_OVERRIDE;
}

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

exports.search = async (event, context) => {
  console.info('Search received:', event);
  const data = {result: event.pathParameters.q};
  return jsonResponse(200, data);
}
