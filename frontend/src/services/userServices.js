import axios from "@/axios";

export const LoginUser = (email, password) => {
  return axios.post("/auth/login", {
    email: email,
    password: password,
  });
};
export const AddUser = (email, password) => {
  return axios.post("/auth/register", {
    email: email,
    password: password,
  });
};
export const DeleteUser = (id) => {
  return axios.post(`/users/delete`, { id: id });
};
export const GetUser = () => {
  return axios.get(`/users`);
};
export const DeleteAllowList = (id, email) => {
  return axios.post(`/users/allowlist/delete`, { id: id, email: email });
};
export const AddAllowlist = (id, email) => {
  return axios.post(`/users/allowlist`, { id: id, email: email });
};
