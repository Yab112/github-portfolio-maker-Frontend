import axios from "axios";

// Create a new instance of axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1",
  withCredentials: true, 
});

api.interceptors.response.use(
  (response) => response,  
  async (error) => {

    if (error.response?.status === 401 && error.config && !error.config.__isRetryRequest) {
      try {
        error.config.__isRetryRequest = true;

        await api.post("/auth/refresh-token");

        return api(error.config);
      } catch (refreshError) {
        console.error("Refresh token expired or invalid. Redirecting to login...");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); 
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

export const verifyOtp = async (otp: string) => {
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

// export const GetRepos = () => {
//   return api.get("/users/github/repos")
// }



export const OtpResend = async () => {
   const response = await api.post("auth/resend-otp");
   return response;
}

