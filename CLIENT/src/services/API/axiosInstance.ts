import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:5000";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Request timeout (10s)
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<unknown>) => {
    const portalPath = window.location.pathname.split("/")?.[1];
    let token;
    if (portalPath === "candidate") {
      token = Cookies.get("candidateToken");
    } else {
      token = Cookies.get("organisationToken");
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    return Promise.reject(error)
  }
);

export default axiosInstance;
