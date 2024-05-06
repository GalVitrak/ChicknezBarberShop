import * as functions from "firebase-functions";
import { db } from ".";
import cyber from "./cyber";

const updateOTP = functions.https.onCall(async (data, context) => {
  const phone = data.phone;
  const otp = cyber.generateOTP();
  const userRef = db
    .collection("users")
    .where("phoneNumber", "==", phone)
    .get();
  (await userRef).forEach((doc) => {
    doc.ref.update({ otp: otp });
  });
});

export default updateOTP;
