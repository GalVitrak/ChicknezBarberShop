import * as jwt from "jsonwebtoken";
import * as crypto from "crypto-js";
import axios from "axios";
import { config } from "../../firebase-config";

// // a function to generate a new Token
function getNewToken(user: {}): string {
  const container = { user };
  const options = { expiresIn: "120h" };
  const token = jwt.sign(container, config.jwtSecretKey, options);
  return token;
}

async function sendTelegramMessage(message: string, chatID: string) {
  const response = await axios.get(
    config.url + "/sendMessage?chat_id=" + chatID + "&text=" + message
  );
  console.log(response.data);
}

// //for sms
function generateOTP() {
  const otp = Math.floor(Math.random() * 900000) + 100000;
  return otp;
}

// // a function to encrypt passwords
function hash(plainText: string): string | null {
  if (!plainText) return null;
  // Hash with salt:
  const hashedText = crypto.HmacSHA256(plainText, config.salt).toString();
  return hashedText;
}

export default {
  getNewToken,

  generateOTP,
  hash,
  sendTelegramMessage,
};
