import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://expense-tracker-app-liard.vercel.app",
});

export default axiosInstance ;