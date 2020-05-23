import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.headers.common["Content-Type"] = "application/json";

//Fixing Bi Directional Dependancies
export function setJwt(jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  if (!expectedError) {
    Swal.close();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  } else if (error.response.status === 404) {
    Swal.close();
    Swal.fire({
      icon: "error",
      title: "404 Not Found",
    });
  } else if (error.response.status === 500) {
    localStorage.removeItem("token");
    window.location = "/expired";
  } else return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  setJwt,
};
