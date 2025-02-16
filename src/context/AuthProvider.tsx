import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { getMe, login, logout,SignUp,VerifyOtp} from "..//service/api";
import {Loading} from "../components"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication on initial load
  useEffect(() => {
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
  }, []);

const signupuser = async (email:string,password:string)=>{
  try {
    const response = await SignUp(email, password);
    return response;
  } catch (error) {
    console.log("DEBUG: error in signup user", error);
    return undefined;
  }
  }

  const loginUser = async (email: string, password: string) => {
    try {
      const response  = await login(email, password);
      const userData = await getMe();
      setUser(userData);
      setIsAuthenticated(true);
      return response
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const Verify_Otp = async (otp:string)=>{
    try {
      console.log(otp,"DEBUG:otp accepted in the auth provider")
      await VerifyOtp(otp);
      const userData = await getMe();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Verify Otp Failed:", error);
      throw error;
    }
  }

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

  if (loading) {
    return <Loading/> 
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loginUser, logoutUser,signupuser,Verify_Otp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;