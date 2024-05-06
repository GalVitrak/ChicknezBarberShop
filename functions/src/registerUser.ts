import * as functions from "firebase-functions";
import { db } from ".";
import cyber from "./cyber";

const registerUser = functions.https.onCall(async (data, context) => {
  const phoneNumber = data.phoneNumber;
  const otp = cyber.generateOTP();
  const firstName = data.firstName;
  const lastName = data.lastName;
  const role = false;
  const userRef = await db
    .collection("users")
    .add({ phoneNumber, otp, firstName, lastName, role });
  return { id: userRef.id };
});

export default registerUser;
