// frontend/lib/api.js
import axios from "axios";

/*───────────────────────────────────────────────────────────────*
 *  Axios instance
 *───────────────────────────────────────────────────────────────*/
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // e.g. http://127.0.0.1:8000/api
});

/*───────────────────────────────────────────────────────────────*
 *  1. Attach access-token to every request
 *───────────────────────────────────────────────────────────────*/
api.interceptors.request.use((cfg) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

/*───────────────────────────────────────────────────────────────*
 *  2. Auto-refresh token once if 401
 *───────────────────────────────────────────────────────────────*/
api.interceptors.response.use(
  (r) => r,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original.__isRetryRequest) {
      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        window.location.href = "/login";
        return Promise.reject(err);
      }

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh/`,
          { refresh }
        );

        localStorage.setItem("token", data.access);
        original.__isRetryRequest = true;
        original.headers.Authorization = `Bearer ${data.access}`;
        return api(original); // 🔁 retry
      } catch (e) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }

    return Promise.reject(err);
  }
);

/*───────────────────────────────────────────────────────────────*
 *  3. Helper wrappers (ONE declaration each!)
 *───────────────────────────────────────────────────────────────*/
export const getCategories = () =>
  api.get("/categories/").then((r) => r.data);

export const getProducts = () =>
  api.get("/products/").then((r) => r.data);

export const getProduct = (id) =>
  api.get(`/products/${id}/`).then((r) => r.data);

/* add more helpers here as needed */

export default api;
