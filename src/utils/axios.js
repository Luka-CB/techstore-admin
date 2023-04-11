import axios from "axios";

const url =
  import.meta.env.VITE_APP_ENV === "development"
    ? "http://localhost:5000"
    : "https://techstore-server-production.up.railway.app";

export default axios.create({
  baseURL: url,
});
