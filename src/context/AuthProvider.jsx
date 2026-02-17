import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);


export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  useEffect(() => {
    function syncToken() {
      setToken(localStorage.getItem("token"));
    }
    window.addEventListener("storage", syncToken);
    return () => window.removeEventListener("storage", syncToken);
  }, []);

  function login(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

