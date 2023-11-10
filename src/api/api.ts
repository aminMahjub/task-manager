import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4001",
  timeout: 10000,
});

export default api;
