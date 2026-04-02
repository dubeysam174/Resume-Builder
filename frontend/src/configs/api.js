import axios from "axios";
import {store} from "@/app/Store"; // 👈 import your store

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// ✅ Attach token from Redux Persist
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = token; // or Bearer if needed
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;