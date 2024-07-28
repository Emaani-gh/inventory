"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const res = await axios.post("/api/authenticateUser", { token });
          if (res.data.valid) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          setIsAuthenticated(false);
          localStorage.removeItem("token");
        }
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    verifyToken();
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
