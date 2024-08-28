import * as functions from "firebase-functions";
import { db } from ".";
import cyber from "./cyber";

const registerUser = functions.https.onCall(async (data, context) => {
  const phoneNumber = data.phoneNumber;
  const otp = cyber.generateOTP();
  const hashedOTP = cyber.hash(otp.toString());
  const firstName = data.firstName;
  const lastName = data.lastName;
  const chatID = data.chatID;
  const role = false;
  const userRef = await db
    .collection("users")
    .add({ phoneNumber, otp: hashedOTP, firstName, lastName, role, chatID });

  cyber.sendTelegramMessage("הסיסמא החד פעמית שלך: " + otp, chatID);
  return { id: userRef.id };
});

export default registerUser;
