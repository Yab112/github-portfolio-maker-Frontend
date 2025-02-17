import axios from "axios";
import { GitHubRepo } from "../types/github";

// Create a new instance of axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1",
  withCredentials: true, 
});

// Add an interceptor for handling 401 errors
api.interceptors.response.use(
  (response) => response,  
  async (error) => {
    // Check if the error is a 401 Unauthorized error
    if (error.response?.status === 401 && error.config && !error.config.__isRetryRequest) {
      try {
        // Mark this request as a retry request to avoid infinite loops
        error.config.__isRetryRequest = true;

        // Send a request to refresh the access token
        await api.post("/auth/refresh-token");

        // Retry the original request with the new access token
        return api(error.config);
      } catch (refreshError) {
        console.log(refreshError)
        console.error("Refresh token expired or invalid. Redirecting to login...");
        // Handle logic to redirect the user to login or logout
      }
    }
    return Promise.reject(error);  // If it's not a 401 error, reject the promise
  }
);

// Now replace all axios requests with the `api` instance.

export const getMe = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const login = (email: string, password: string) => {
  return api.post("/auth/login", { email, password });
};

export const logout = () => {
  return api.post("/logout", {});
};

export const SignUp = (email: string, password: string, Githubusername: string) => {
  return api.post("/auth/register", { email, password, Githubusername });
};

export const VerifyOtp = async (otp: string) => {
  try {
    console.log("DEBUG: OTP sent to backend", otp);
    const response = await api.post("/auth/verify", { otp });
    // console.log("Response from backend:", response);
    return response;
  } catch (error) {
    console.error("OTP verification failed:", error);
    throw error;
  }
};

export const getUserRepos = async (username: string): Promise<GitHubRepo[]> => {
  try {
    const response = await api.get(`/github/${username}/repos`);
    return response.data.map((repo: GitHubRepo) => ({
      name: repo.name
    }));
  } catch (error) {
    console.error("Error fetching repos:", error);
    return [];
  }
};

