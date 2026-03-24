
import React, { createContext, useContext, useState } from "react"

type ErrorContextType =
    {
        errorMessage: string | null,
        showErrorMessage: (msg: string) => void,
        closeError: () => void
    }
    | null

type childrenType = {
    children: React.ReactNode
}

const ErrorContext = createContext<ErrorContextType>(null)

export const ErrorContextProvider = ({children}: childrenType) => {
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null)

    const showErrorMessage = (msg: string) => setErrorMessage(msg)
    const closeError = () => setErrorMessage(null)

    return (
        <ErrorContext.Provider value={{ errorMessage, showErrorMessage, closeError }}>
            {children}
        </ErrorContext.Provider>
    )

}

export const useErrorContext = () => {
    return useContext(ErrorContext)
}