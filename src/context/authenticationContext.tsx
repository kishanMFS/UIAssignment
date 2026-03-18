import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserAuthContextType = {
    isLoggedIn: boolean,
    login: (jwtToken: string) => void,
    logout: () => void,
};
type childrenType = {
    children: React.ReactNode,
}

const UserAuthContext = createContext<UserAuthContextType | null>(null);

export const UserAuthContextProvider = ({children}: childrenType) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const login = (jwtToken: string) => {
        localStorage.setItem('jwtToken', jwtToken);
        setIsLoggedIn(true);
        navigate('/projects');
    }
    const logout = () => {
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
        navigate('/login');
    }

    // validate token on load
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            setIsLoggedIn(true);
            navigate('/projects');
        } else {
            // setIsLoggedIn(false);
            logout();
        }
    }, [])

    return (
        <UserAuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </UserAuthContext.Provider>
    )
};

export const UserAuth = () => {
    return useContext(UserAuthContext)!; // ! ensure that the value returned by useContext is not null at any point in time. It tells TypeScript that we are confident that the context will always have a value when accessed.
}