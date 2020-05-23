import http from "./httpService";
import { apiUrl } from "../config.json";

const earningEndpoint = apiUrl + "/user/getDeveloperEarnings";

export function getEarnings() {
  return http.get(earningEndpoint);
}
