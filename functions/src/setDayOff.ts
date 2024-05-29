import * as functions from "firebase-functions";
import { db } from ".";

const setDayOff = functions.https.onCall(async (data, context) => {
  const dayOff = data.dayOff;

  const dayOffRef = db.collection("dayOff").doc("dayOff");

  await dayOffRef.set({ dayOff: dayOff });
});

export default setDayOff;
