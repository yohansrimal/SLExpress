import http from "./httpService";
import { apiUrl } from "../config.json";

const loginEndpoint = apiUrl + "/user/sign-in";
const deleteEndpoint = apiUrl + "/user/deleteUser";

export async function login(developer) {
  const { data: jwt } = await http.post(loginEndpoint, {
    email: developer.lemail,
    password: developer.lpassword,
    type: developer.ltype,
  });
  localStorage.setItem("token", jwt.token);
}

export function logout() {
  localStorage.removeItem("token");
  window.location = "/";
}

export function getCurrentUser() {
  try {
    return localStorage.getItem("token");
  } catch (ex) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem("token");
}

export async function deleteUser() {
  await http.delete(deleteEndpoint);
  localStorage.removeItem("token");
  window.location = "/";
}

http.setJwt(getJwt());

export default {
  login,
  logout,
  getCurrentUser,
  getJwt,
  deleteUser,
};
