// AuthContext.tsx
import { AxiosResponse } from "axios";
import { createContext } from "react";

interface ApiResponse {
  message: string;
  userId?: string;
}

export interface UserData {
  id: string;
  email: string;
  GithubUsername?: string;
}

export interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => Promise<AxiosResponse<ApiResponse> | undefined>;
  logoutUser: () => Promise<void>;
  signupUser: (email: string, password: string, GithubUsername: string) => Promise<AxiosResponse<ApiResponse> | undefined>;
  verifyOtpUser: (otp: string) => Promise<void>;
  resendOtp: () => Promise<void>;
  getrepos: () => Promise<string[]>; 
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;