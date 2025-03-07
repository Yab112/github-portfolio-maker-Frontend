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
  Githubusername?: string;
  profilePic?: string;
  isVerified?: boolean;
  authProvider?: string;
  failedLoginAttempts?: number;
  projects?: Array<{
    category: string;
    key: string;
    value: string;
    _id: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
  refreshTokenExpires?: string;
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
  fetchRepoFiles : (owner: string) => Promise<{ [key: string]: string } |undefined>
  fetchFileContent : (fileUrl: string) => Promise<string | undefined>
  fetchAllRepoFiles: (fileUrls: { [key: string]: string }) => Promise<{ [key: string]: string }>;
  GetHCatResponseApi: (prompt:string) => Promise<string |undefined>
  ChatResponse : (prompt:string) => Promise<string |undefined>
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;