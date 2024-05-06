import * as functions from "firebase-functions";
import { db } from ".";

const setAvailability = functions.https.onCall(
  async (data, context) => {
    const day = data.day;
    const month = data.month;
    const year = data.year;
    const startTime = data.startTime;
    const endTime = data.endTime;

    const availabilityRef = await db
      .collection("availability")
      .add({
        day,
        month,
        year,
        startTime,
        endTime,
      });

    return { id: availabilityRef.id };
  }
);

export default setAvailability;
