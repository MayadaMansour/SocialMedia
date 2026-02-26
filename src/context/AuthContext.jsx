import { createContext, useEffect, useState } from "react";
import { apiServices } from "../services/api";


export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setUserToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getUserData() {
    try {
      const user = await apiServices.getLoggedUserData();
      setUserData(user.data.user);
      console.log(user.data.user);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setUserToken(null);
      }
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (token) {
      getUserData();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  return (
    <authContext.Provider value={{ token, setUserToken, userData, isLoading }}>
      {children}
    </authContext.Provider>
  );
}
