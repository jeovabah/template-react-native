import axios from "axios";

const api = axios.create({
  baseURL: "https://course-english-api.me2.com.br/app/",
  headers: {
    "Content-Type": "application/json",
    "client-id": "1",
  },
});

export default api;
