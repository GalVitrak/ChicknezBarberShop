import * as functions from "firebase-functions";
import { db } from "./index";

const getImages = functions.https.onCall(async (data, context) => {
  const snapshot = await db.collection("images").get();
  const images = snapshot.docs.map((doc) => doc.data());
  return images;
});

// export the function
export default getImages;
