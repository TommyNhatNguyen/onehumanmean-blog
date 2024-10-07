import { TOKEN } from "../constant/token";
import Cookies from "js-cookie";
const tokenMethod = {
  set: (payload: { accessToken: string; refreshToken: string }) => {
    Cookies.set(TOKEN.token, JSON.stringify(payload));
  },
  get: () => {
    if (Cookies.get(TOKEN.token))
      return JSON.parse(Cookies.get(TOKEN.token) as string) as {
        accessToken: string;
        refreshToken: string;
      };
  },
  delete: () => {
    Cookies.remove(TOKEN.token);
  },
};

export default tokenMethod;
