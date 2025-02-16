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
  const response =  axios.post(`${API_URL}/auth/login`, { email, password }, { 
    withCredentials: true 
  });
  return response
};

export const logout = () => {
  return axios.post(`${API_URL}/logout`, {}, { 
    withCredentials: true 
  });
};


export const SignUp = (email: string, password: string) =>{
  const response =axios.post(`${API_URL}/auth/register`,{ email, password },{
    withCredentials:true,
  }
  )
  return response
}

export const VerifyOtp = async (otp: string) => {
  try {
    console.log("DEBUG: OTP sent to backend", otp);
    
    const response = await axios.post(`${API_URL}/auth/verify`, 
      { otp }, 
      { 
        withCredentials: true,
      }
    );

    console.log("Response from backend:", response);
    return response;
  } catch (error) {
    console.error("OTP verification failed:", error);
    throw error;
  }
};


