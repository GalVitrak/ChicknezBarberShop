import { db } from ".";
import * as functions from "firebase-functions";


const getAvailability = functions.https.onCall(async (data, context) => {
    const month = data.month;
    const year = data.year;

    const availabilityRef = await db
        .collection("availability")
        .where("month", "==", month)
        .where("year", "==", year)
        .get();

    const availability = availabilityRef.docs.map((doc) => {
        return doc.data();
    });

    return availability;
});

export default getAvailability;
