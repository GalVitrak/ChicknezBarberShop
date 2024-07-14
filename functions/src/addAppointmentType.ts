import { db } from ".";
import * as functions from "firebase-functions";

const addAppointmentType = functions.https.onCall(async (data, context) => {
  const name = data.name;
  const duration = data.duration;
  const price = data.price;
  const description = data.description;

  const appointmentTypeRef = await db.collection("appointmentTypes").add({
    name,
    duration,
    price,
    description,
  });

  return { id: appointmentTypeRef.id };
});

export default addAppointmentType;
