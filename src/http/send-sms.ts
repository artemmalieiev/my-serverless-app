import {
  SNSClient,
  SetSMSAttributesCommand,
  PublishCommand,
} from "@aws-sdk/client-sns";
import { Responses } from "../common/Responses";

const client = new SNSClient({});

exports.handler = async (event) => {
  try {
    const { message, phone } = JSON.parse(event.body);

    if (!message || !phone) {
      return Responses._400({ message: "Invalid Input" });
    }

    await client.send(
      new SetSMSAttributesCommand({
        attributes: {
          DefaultSMSType: "Promotional",
        },
      })
    );

    const result = await client.send(
      new PublishCommand({
        PhoneNumber: phone,
        Message: message,
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return Responses._400({ error });
  }
};
