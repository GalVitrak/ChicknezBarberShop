import * as functions from "firebase-functions";
import { db } from ".";

const deleteAppointmentType = functions.https.onCall(async (data, context) => {
  const id = data.id;

  const appointmentTypeRef = db.collection("appointmentTypes").doc(id);
  await appointmentTypeRef.delete();
});

export default deleteAppointmentType;
