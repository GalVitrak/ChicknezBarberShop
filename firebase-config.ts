import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1rgK5CKP2XdjuW8mi3GQjCW6dOYxFdNI",
  authDomain: "chicknezbarbershop-7941d.firebaseapp.com",
  projectId: "chicknezbarbershop-7941d",
  storageBucket: "chicknezbarbershop-7941d.appspot.com",
  messagingSenderId: "794943114385",
  appId: "1:794943114385:web:8458125fe3354773d90330",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

if (window.location.hostname === "localhost") {
  connectFunctionsEmulator(functions, "localhost", 5002);
}
