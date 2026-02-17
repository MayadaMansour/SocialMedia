import { createContext, useState } from "react";

export const authContext = createContext(0);

export  default function AuthContextProvider({ children }) {
  const [token, setUserToken] = useState(localStorage.getItem("token"));

  return (
    <authContext.Provider value={{ token, setUserToken }}>
      {children}
    </authContext.Provider>
  );
}
