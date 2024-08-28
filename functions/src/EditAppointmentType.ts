import { db } from ".";
import * as functions from "firebase-functions";

const editAppointmentType = functions.https.onCall(async (data, context) => {
  const name = data.name;
  const duration = data.duration;
  const price = data.price;
  const description = data.description;
  const id = data.id;

  const appointmentTypeRef = db.collection("appointmentTypes").doc(id);

  await appointmentTypeRef.update({
    name,
    duration,
    price,
    description,
  });

  return { id: appointmentTypeRef.id };
});

export default editAppointmentType;
