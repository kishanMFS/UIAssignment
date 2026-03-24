

import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import GlobalErrorBoundary from "./GlobalErrorBoundary"

interface childrenType {
    children: React.ReactNode,
    onError: (err:any) => void
}
const ErrorBoundaryWrapper = ({children}: childrenType) => {

    const navigate = useNavigate()
    const [error, setError] = useState<any>(null);
    const location = useLocation()

    useEffect(() => {
        if (error && location.pathname !== "/error") {
            navigate("/error", {
                state: { error: error?.message || "Render failed" },
                replace: true,
            });
            setError(null)
        }
    }, [error, location.pathname]);

    
    return (
        <GlobalErrorBoundary  onError={(err: any) => {
            setError(err);   // ✅ safe (state update)
            // return null;     // no UI
        }}>
            {children}
        </GlobalErrorBoundary>
    )
}

export default ErrorBoundaryWrapper