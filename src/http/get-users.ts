import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDB({});
const documentClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  const result = await documentClient.send(
    new ScanCommand({
      TableName: "users",
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };
};
