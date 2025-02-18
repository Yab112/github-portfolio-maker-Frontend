import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { getMe, login, logout, SignUp, verifyOtp,OtpResend } from "../service/api";
import { Loading } from "../components";
import axios from "axios";
import { GithubRepository } from "../types/github";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if we're on a public page
  const isPublicPage = window.location.pathname === "/" || window.location.pathname === "/login" || window.location.pathname === "/signup" || window.location.pathname === "/verify-otp" || window.location.pathname === "/reset-password";

  useEffect(() => {
    if (!isPublicPage) { // Only check authentication on non-public pages
      const checkAuth = async () => {
        try {
          const userData = await getMe();
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Authentication check failed:", error);
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    } else {
      setLoading(false); // Skip loading on public pages
    }
  }, [isPublicPage]);

  const signupUser = async (email: string, password: string, GithubUsername: string) => {
    try {
      const response = await SignUp(email, password, GithubUsername);
      return response;
    } catch (error) {
      console.log("DEBUG: error in signup user", error);
      return undefined;
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      const userData = await getMe();
      setUser(userData);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const verifyOtpUser = async (otp: string) => {
    try {
      console.log(otp, "DEBUG: otp accepted in the auth provider");
      await verifyOtp(otp);
      const userData = await getMe();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Verify Otp Failed:", error);
      throw error;
    }
  };

  const resendOtp = async () => {
    try {
      await OtpResend();
    } catch (error) {
      console.error("Resending OTP Failed:", error);
      throw error;
    }
  };
  

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const getrepos = async () => {
    try {
      const userData = await getMe();
      console.log("DEBUG: github username ===>", userData);
      if (userData.Githubusername) {
        console.log("DEBUG: github username", userData.Githubusername);
        const githubApiUrl = `https://api.github.com/users/${userData.Githubusername}/repos`;
        
        // Add await and properly handle response
        const response = await axios.get(githubApiUrl);
        
        // Access response.data and map properly
        return response.data.map((repository:GithubRepository) => repository.name);
      } else {
        throw new Error("GitHub username not found in user data");
      }
    } catch (error) {
      console.error("Error in fetching repos:", error);
      throw error; 
    }
  };
  

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loginUser, logoutUser, signupUser, verifyOtpUser,resendOtp,getrepos }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
