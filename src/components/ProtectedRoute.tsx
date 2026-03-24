import { useEffect } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/authenticationContext.tsx';
import { useErrorContext } from "../context/ErrorContext.tsx";

type childrenType = {
    children : React.ReactNode
}

function ProtectedRoute({ children}: childrenType){
    const { showErrorMessage } = useErrorContext();
    const { logout } = UserAuth();
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        try{
            const token = localStorage.getItem("jwtToken")
            const isLoginPage = location.pathname === '/login'
            if(token){
                if(isLoginPage) navigate('projects', {replace: true})
            }
            else{
                logout()           
            }
        }
        catch(e){
            showErrorMessage(e.message);
        }
    }, [location.pathname])
    
    return children
}

export default ProtectedRoute