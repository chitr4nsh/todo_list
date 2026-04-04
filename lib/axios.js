

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
//   withCredentials: true,
// });

// // 🔐 Attach token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // 🚨 HANDLE 401 → AUTO LOGOUT
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.log("🚨 Auto logout triggered");

//       // ❌ clear storage
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("user");

//       // 🔁 redirect
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// 🔐 Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🚨 GLOBAL ERROR HANDLER
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    switch (status) {
      case 400:
        if (error.response?.data?.errors) {
          error.response.data.errors.forEach((err) => {
            toast.error(`${err.field}: ${err.message}`);
          });
        } else {
          toast.error(message || "Validation error");
        }
        break;

      case 401:
        console.log("🚨 Auto logout triggered");

        toast.error("Session expired. Please login again");

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        window.location.href = "/login";
        break;

      case 403:
        toast.error("Forbidden: You don’t have access");
        break;

      case 404:
        toast.error(message || "Resource not found");
        break;

      case 429:
        toast.error(message || "Too many requests. Try later");
        break;

      case 500:
        toast.error("Server error. Try again later");
        break;

      default:
        toast.error(message || "Something went wrong");
    }

    return Promise.reject(error);
  }
);

export default api;