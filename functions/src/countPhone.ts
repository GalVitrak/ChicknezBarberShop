import * as functions from "firebase-functions";
import { db } from "./index";
import { HttpsError } from "firebase-functions/v1/auth";

const countPhone = functions.https.onCall(async (data, context) => {
  try {
    const phone = data.phone;
    console.log(phone);
    
    const collection = db.collection("users"); 
    console.log(collection);
    
    const query = collection.where("phoneNumber", "==", phone);
    console.log(query);

    const snapshot = await query.count().get();

    console.log(snapshot.data());

    return snapshot.data();
  } catch (error: any) {
    throw new HttpsError("unknown", error.message as string);
  }
});

export default countPhone;
