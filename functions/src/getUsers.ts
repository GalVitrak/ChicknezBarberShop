import * as functions from "firebase-functions";
import { db } from "./index";

const getUsers = functions.https.onCall(async (data, context) => {
  const snapshot = await db.collection("users").get();
  const users = snapshot.docs.map((doc) => doc.data());
  return users;
});

export default getUsers;
