import axios from "axios";

const url =
  !import.meta.env.VITE_APP_ENV === "development"
    ? "http://localhost:5000"
    : "https://techstore-api-3jmr.onrender.com";

export default axios.create({
  baseURL: url,
});
