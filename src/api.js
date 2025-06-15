import axios from "axios";

// Create a reusable Axios instance
export const api = axios.create({
  baseURL: "/api/v1",     // via Vite proxy -> localhost:8080 
  withCredentials: true,  // only if you'll use cookies
});

// Automatically attach the access token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken")
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

api.interceptors.request.use(
  res => res, // If response is OK, just return it

  async err => {
    const originalRequest = err.config;

    // Check if 401 Unauthorized and we haven't retried this request yet
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        // Try to refresh the access token
        const res = await axios.post("/api/v1/auth/refresh-token", {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        // Store the new access token
        localStorage.setItem("accessToken", newAccessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }catch (refreshError) {
        // Refresh token failed (expired or invalid)
        console.log("Refresh token failed: ", refreshToken);

        // Clear session and redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    // If not a 401 or already retried, reject the error
    return Promise.reject(err);
  }
)

