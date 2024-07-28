"use client";

import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./authContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
