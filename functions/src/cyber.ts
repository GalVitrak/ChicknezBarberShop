import * as jwt from "jsonwebtoken";
import * as crypto from "crypto-js";
import axios from "axios";
import { log } from "firebase-functions/logger";
const jwtSecretKey = "ChicknezBarberSh";

const botToken = "7340796327:AAEs2Px38L0gOc-Bjk8SFAsFccNogcEAjCY";

const url = "https://api.telegram.org/bot" + botToken;

// // a function to generate a new Token
function getNewToken(user: {}): string {
  const container = { user };
  const options = { expiresIn: "120h" };
  const token = jwt.sign(container, jwtSecretKey, options);
  return token;
}

async function sendTelegramMessage(message: string, chatID: string) {
  const response = await axios.get(
    url + "/sendMessage?chat_id=" + chatID + "&text=" + message
  );
  log(response.data);
}

// // a function to verify the token
// // function verifyToken(request: Request): Promise<boolean> {
// //   return new Promise<boolean>((resolve, reject) => {
// //     try {
// //       const header = request.header("authorization");
// //       if (!header) {
// //         resolve(false);
// //         return;
// //       }
// //       const token = header.substring(7);
// //       if (!token) {
// //         resolve(false);
// //         return;
// //       }
// //       jwt.verify(token, jwtSecretKey, (err) => {
// //         if (err) {
// //           resolve(false);
// //           return;
// //         }
// //         resolve(true);
// //       });
// //     } catch (err: any) {
// //       reject(err);
// //     }
// //   });
// // }

// //for sms
function generateOTP() {
  const otp = Math.floor(Math.random() * 900000) + 100000;
  // const hashedOTP = hash("123456");
  return otp;
}

const salt = "TommyChicknez";

// // a function to encrypt passwords
function hash(plainText: string): string | null {
  if (!plainText) return null;
  // Hash with salt:
  const hashedText = crypto.HmacSHA256(plainText, salt).toString();
  return hashedText;
}

// // a function to verify that the user's role is Admin
// // async function verifyAdmin(request: Request): Promise<boolean> {
// //   const isLoggedIn = await verifyToken(request);
// //   if (!isLoggedIn) return false;

// //   const header = request.header("authorization");
// //   const token = header.substring(7);

// //   const container: any = jwt.decode(token);

// //   const user: UserModel = container.user;

// //   return user.role === RoleModel.Admin;
// // }

export default {
  getNewToken,
  //   //   verifyToken,
  //   //   verifyAdmin,
  generateOTP,
  hash,
  sendTelegramMessage,
  //   //   validateOTP,
};
