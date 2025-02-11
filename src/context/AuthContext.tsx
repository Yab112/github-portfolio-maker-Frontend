import { createContext } from "react";

export interface AuthContextType {
  user: { id: string; email: string } | null;
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;