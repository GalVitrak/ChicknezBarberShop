import * as functions from "firebase-functions";
import { db } from ".";
import cyber from "./cyber";

const updateOTP = functions.https.onCall(async (data, context) => {
  const phone = data.phone;
  const otp = cyber.generateOTP();
  const hashedOTP = cyber.hash(otp.toString());
  let chatID: string = "";
  const userRef = db
    .collection("users")
    .where("phoneNumber", "==", phone)
    .get();
  (await userRef).forEach((doc) => {
    chatID = doc.data().chatID;
    doc.ref.update({ otp: hashedOTP });
  });

  cyber.sendTelegramMessage("הסיסמא החד פעמית שלך: " + otp, chatID);
});

export default updateOTP;
