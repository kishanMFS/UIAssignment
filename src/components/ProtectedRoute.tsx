import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth.ts";
import { useErrorContext } from "../context/ErrorContext.tsx";
import { useNavigate } from "react-router-dom";

type childrenType = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: childrenType) {
  const { showErrorMessage } = useErrorContext();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const isLoginPage = location.pathname === "/login";
      if (isLoggedIn) {
        if (isLoginPage) navigate("projects", { replace: true });
      } else {
        navigate("/login");
      }
    } catch (e: unknown) {
      showErrorMessage(e.message);
    }
  }, [isLoggedIn, navigate, showErrorMessage]);

  return children;
}

export default ProtectedRoute;
