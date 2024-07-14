import { db } from ".";
import * as functions from "firebase-functions";

const getAppointmentTypes = functions.https.onCall(async (data, context) => {
  const snapshot = await db.collection("appointmentTypes").get();
  const appointmentTypes = snapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    return data;
  });
  return appointmentTypes;
});

export default getAppointmentTypes;
