import { TOKEN_COOKIES } from "@/constant/api-end-point";
import Cookies from "universal-cookie";

export function getToken() {
  const cookies = new Cookies();
  const token = cookies.get(TOKEN_COOKIES.TOKEN_NAME);

  return token?.toString();
}

export function setToken(payload: string) {
  const cookies = new Cookies();
  const token = cookies.set(TOKEN_COOKIES.TOKEN_NAME, payload);

  return token;
}
