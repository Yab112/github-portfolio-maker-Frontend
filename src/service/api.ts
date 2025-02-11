import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1";

export const getMe = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/me`, { 
      withCredentials: true 
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const login = (email: string, password: string) => {
  return axios.post(`${API_URL}/login`, { email, password }, { 
    withCredentials: true 
  });
};

export const logout = () => {
  return axios.post(`${API_URL}/logout`, {}, { 
    withCredentials: true 
  });
};