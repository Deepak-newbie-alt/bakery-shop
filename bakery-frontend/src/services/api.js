import axios from "axios";

const API = axios.create({
  baseURL: "https://bakery-shop-8o7w.onrender.com/api"
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;