import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { Responses } from "../common/Responses";

const client = new SESClient({});

interface EmailParams {
  subject: string;
  message: string;
  from: string;
  to: string[];
}

export const handler = async (event) => {
  try {
    const { subject, message } = JSON.parse(event.body);

    if (!subject || !message) {
      return Responses._400({ message: "Invalid input" });
    }

    const params: EmailParams = {
      subject,
      message,
      from: "artem.malieiev@gmail.com",
      to: ["artem.malieiev@gmail.com"],
    };

    const result = await sendEmail(params);

    return Responses._200({ result });
  } catch (error) {
    return Responses._400({ error });
  }
};

const sendEmail = (params: EmailParams) => {
  return client.send(
    new SendEmailCommand({
      Destination: {
        ToAddresses: params.to,
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: "<h2>Hello from SES</h2>",
          },
          Text: {
            Charset: "UTF-8",
            Data: params.message,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: params.subject,
        },
      },
      Source: params.from,
    })
  );
};
