import * as functions from "firebase-functions";
import { db } from ".";

const getDayOff = functions.https.onCall(async (data, context) => {
  const dayOffRef = db.collection("dayOff").doc("dayOff");
  const dayOffDoc = await dayOffRef.get();
  const dayOff = dayOffDoc.data()?.dayOff;
  return dayOff;
});

export default getDayOff;
