import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { getMe, login, logout } from "..//service/api";

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

  const loginUser = async (email: string, password: string) => {
    try {
      await login(email, password);
      const userData = await getMe();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
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

  if (loading) {
    return <div>Loading...</div>; // Add a proper loading state
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;