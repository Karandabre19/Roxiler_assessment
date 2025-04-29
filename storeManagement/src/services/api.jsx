    import axios from "axios";

    export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: {
        "Content-Type": "application/json",
    },
    });

    axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    });

    axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) { 
        console.error("Unauthorized! Redirecting to login...", error);
        localStorage.removeItem("token");
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
        }
        return Promise.reject(error);
    }
    );
