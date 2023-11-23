import { TOKEN_COOKIES } from "@/constant/api-end-point";
import Cookies from "universal-cookie";
import CryptoJS from "crypto-js";

export const getToken = (payload: string) => {
  const cookies = new Cookies();
  const token = cookies.get(payload);
  const bytes = CryptoJS.AES.decrypt(token, `${process.env.SECRET_PASS}`);
  const decryptToken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptToken;
};

export const getAuthId = (payload: string) => {
  const cookies = new Cookies();
  const token = cookies.get(payload);
  const bytes = CryptoJS.AES.decrypt(token, `${process.env.SECRET_PASS}`);
  const decryptToken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptToken;
};

export function setToken(payload: string) {
  const cookies = new Cookies();
  const tokenEncrypt = CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    `${process.env.SECRET_PASS}`
  ).toString();

  const token = cookies.set(TOKEN_COOKIES.TOKEN_NAME, tokenEncrypt);

  return token;
}

export function setId(payload: string) {
  const cookies = new Cookies();
  const idEncrypt = CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    `${process.env.SECRET_PASS}`
  ).toString();

  const authId = cookies.set(TOKEN_COOKIES.AUTH_ID, idEncrypt);

  return authId;
}

export function removeToken(payload: string, authId: string) {
  const cookies = new Cookies();
  cookies.remove(authId);
  cookies.remove(payload);
}
