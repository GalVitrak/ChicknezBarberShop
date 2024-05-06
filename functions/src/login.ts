import * as functions from "firebase-functions";
import { db } from ".";
import cyber from "./cyber";
import { HttpsError } from "firebase-functions/v1/https";

const login = functions.https.onCall(async (data, context) => {
  const phoneNumber = data.phoneNumber;
  const OTP = cyber.hash(data.OTP);

  const snapshot = await db
    .collection("users")
    .where("phoneNumber", "==", phoneNumber)
    .where("otp", "==", OTP)
    .get();
    

  let token;
  if (snapshot.empty) {
    return new HttpsError("not-found", "User not found");
  }
  snapshot.forEach((doc) => {
    const user = {
      userId: doc.id,
      firstName: doc.data().firstName,
      lastName: doc.data().lastName,
      phoneNumber: doc.data().phoneNumber,
      role: doc.data().role,
    };
    token = cyber.getNewToken(user);
  });
  return token;
});

export default login;
