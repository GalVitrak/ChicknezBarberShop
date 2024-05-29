import * as admin from "firebase-admin";
import countPhone from "./countPhone";
import registerUser from "./registerUser";
import updateOTP from "./updateOTP";
import login from "./login";
import getUsers from "./getUsers";
import getImages from "./getImages";
import setAvailability from "./setAvailability";
import getAvailability from "./getAvailability";
import setDayOff from "./setDayOff";
import getDayOff from "./getDayOff";
import deleteAvailability from "./deleteAvailability";

admin.initializeApp();

export const db = admin.firestore();

exports.countPhone = countPhone;
exports.registerUser = registerUser;
exports.updateOTP = updateOTP;
exports.login = login;
exports.getUsers = getUsers;
exports.getImages = getImages;
exports.setAvailability = setAvailability;
exports.getAvailability = getAvailability;
exports.deleteAvailability = deleteAvailability;
exports.setDayOff = setDayOff;
exports.getDayOff = getDayOff;
