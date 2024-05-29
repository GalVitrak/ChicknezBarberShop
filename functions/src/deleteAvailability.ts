import * as functions from "firebase-functions";
import { db } from ".";

const deleteAvailability = functions.https.onCall(async (data, context) => {
  const id = data.id;

  const availabilityRef = db.collection("availability").doc(id);
  await availabilityRef.delete();
});

export default deleteAvailability;
