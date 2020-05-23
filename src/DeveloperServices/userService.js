import http from "./httpService";
import { apiUrl } from "../config.json";

const registerEndpoint = apiUrl + "/user/sign-up";
const updateDeveloperEndpoint = apiUrl + "/user/updateUser";
const getUserDataEndpoint = apiUrl + "/user/getUser";
const changeUserPasswordEndpoint = apiUrl + "/user/updatePassword";

export function register(developer) {
  return http.put(registerEndpoint, {
    username: developer.username,
    firstname: developer.firstname,
    lastname: developer.lastname,
    email: developer.email,
    password: developer.password,
    phone: developer.phone,
    type: developer.type,
  });
}

export function retrieveData() {
  return http.get(getUserDataEndpoint);
}

export function changeUserPassword(newPassword) {
  return http.patch(changeUserPasswordEndpoint, {
    password: newPassword,
  });
}

export function update(updatedData) {
  return http.patch(updateDeveloperEndpoint, {
    username: updatedData.username,
    firstname: updatedData.firstName,
    lastname: updatedData.lastName,
    email: updatedData.email,
    phone: updatedData.phone,
  });
}
