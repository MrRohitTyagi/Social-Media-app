import axios from "axios";
import { deleteCookie, getCookie } from "./cookieHandler";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

export async function caller(method, extendedUrl, body) {
  try {
    const customHeaders = {
      token: getCookie("authToken"),
    };
    const config = {
      method: method, // or 'post', 'put', 'delete', etc.
      url: `${baseUrl}${extendedUrl}`,
      headers: customHeaders,
      data: body,
    };

    const res = await axios(config);

    return res;
  } catch (error) {
    if (error.request.status === 401) {
      deleteCookie("authToken");
      window.location.href = "/login";
    }
    console.log("error", error);
  }
}
