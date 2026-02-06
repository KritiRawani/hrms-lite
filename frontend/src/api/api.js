import axios from "axios";

const api = axios.create({
  baseURL: "https://hrms-lite-backend-vhik.onrender.com",
});

export default api;
