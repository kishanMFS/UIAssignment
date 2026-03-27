import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GlobalErrorBoundary from "./GlobalErrorBoundary";

interface childrenType {
  children: React.ReactNode;
  onError: (err: unknown) => void;
}
const ErrorBoundaryWrapper = ({ children }: childrenType) => {
  const navigate = useNavigate();
  const [error, setError] = useState<unknown>(null);
  const location = useLocation();

  useEffect(() => {
    if (error && location.pathname !== "/error") {
      navigate("/error", {
        state: { error: error?.message || "Render failed" },
        replace: true,
      });
      // setError(null)
    }
  }, [error, location.pathname, navigate]);

  return (
    <GlobalErrorBoundary
      onError={(err: unknown) => {
        setError(err);
      }}
    >
      {children}
    </GlobalErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
