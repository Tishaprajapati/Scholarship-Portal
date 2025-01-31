import axios from "axios";

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

// Add request interceptor to add auth header if needed
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // If you're using token-based auth
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
