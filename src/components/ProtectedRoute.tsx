import { Navigate } from "react-router-dom"
import { UserAuth } from '../context/authenticationContext.tsx';

type childrenType = {
    children : React.ReactNode
}

function ProtectedRoute({ children}: childrenType){
    const token = localStorage.getItem("jwtToken")
    const { logout } = UserAuth();

    if(!token){
        logout()
        // return <Navigate to="/login" replace />

    }
    
        return children
}

export default ProtectedRoute