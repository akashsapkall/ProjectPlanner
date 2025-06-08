import { createContext, useContext, useEffect, useState } from "react";
import api from "./api";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const { data } = await api.get("/users/auth/check");
      setUser(data.data);
      setIsAuthenticated(data.success);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    // const interval = setInterval(() => {
    //   if (isAuthenticated) checkAuth();
    // }, 300000); // 5 minutes
    // return () => clearInterval(interval);
  }, []);

  const logout = async () => {
    const res = await api.post("/users/logout");
    if (res.data?.success) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
