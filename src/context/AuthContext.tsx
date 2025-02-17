import { AxiosResponse } from "axios";
import { createContext } from "react";

interface ApiResponse {
    message: string;
    userId?: string;
  } 

export interface AuthContextType {
  user: { id: string; email: string } | null;
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => Promise<AxiosResponse<ApiResponse> | undefined>;
  logoutUser: () => Promise<void>;
  signupuser : (email: string, password: string,GithubUsername:string) => Promise<AxiosResponse<ApiResponse> | undefined>
  Verify_Otp :(otp:string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;