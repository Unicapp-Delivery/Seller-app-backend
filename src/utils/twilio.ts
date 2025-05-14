import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
console.log("Twilio client created")
console.log(process.env.TWILIO_PHONE_NUMBER)
export async function createMessage(body: string, to: string) {
  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
      body,
    })
    console.log(message.body)
  } catch (error) {
    console.log(error)
  }
}
