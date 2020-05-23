import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/sites/uploadScript";
const deleteEndpoint = apiUrl + "/sites/deleteScript";
const websiteList = apiUrl + "/user/getScripts";
const websiteUpdate = apiUrl + "/sites/updateScript";

export function uploadData(formData) {
  return http.put(apiEndpoint, formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
}

export function viewWebsites() {
  return http.get(websiteList);
}

export async function deleteSite(s_id) {
  await http.delete(deleteEndpoint, {
    data: {
      scriptId: s_id,
    },
  });
}

export async function updateSite(s_name, s_id, des, pri, cat) {
  return await http.patch(websiteUpdate, {
    name: s_name,
    scriptId: s_id,
    categories: [cat],
    price: pri,
    description: des,
  });
}
