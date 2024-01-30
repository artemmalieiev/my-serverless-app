const DynamoDB = require("@aws-sdk/client-dynamodb").DynamoDB;
const DynamoLib = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDB({});
const documentClient = DynamoLib.DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  const result = await documentClient.send(
    new DynamoLib.ScanCommand({
      TableName: "users",
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };
};
