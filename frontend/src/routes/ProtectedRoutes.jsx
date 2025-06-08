import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

export const ProtectedRoutes = ({ children }) => {
  const { checkAuth, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      await checkAuth(); // check token/session
      setLoading(false); // done checking
    };
    verify();
  }, []);

  if (loading) return <p>Checking authentication...</p>; // or a spinner

  return isAuthenticated ? children : <Navigate to="/auth?type=login" />;
};
