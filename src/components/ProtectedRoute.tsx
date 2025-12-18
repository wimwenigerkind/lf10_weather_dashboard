import {useAuth} from "../hooks/useAuth.ts";
import {Navigate} from "react-router-dom";
import * as React from "react";

export default function ProtectedRoute({children}: {children: React.ReactNode}) {
  const {isAuthenticated, initialized} = useAuth();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login"/>;
  }

  return <>{children}</>;
}