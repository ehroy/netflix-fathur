import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // penting untuk kirim cookie
});
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      router.push({ name: "Login" });
    }
    return Promise.reject(error);
  }
);
export default instance;
