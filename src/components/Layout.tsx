import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { UserAuth } from '../context/authenticationContext.tsx';
import { useErrorContext } from '../context/ErrorContext.tsx'
import Error from './Error.tsx'


function NavBar () {
    // const navigate = useNavigate()
    const { logout } = UserAuth();
    const [currentDateTime, setCurrentDateTime] = useState<string>( new Date().toLocaleString() )
    const [currentDateTimeRunning, setCurrentDateTimeRunning ] = useState<boolean>(true)
    const { errorMessage, closeError } = useErrorContext()

    const handleLogout = () => {
        logout()
        // navigate('/login')
    }

    useEffect (()=> {
        if(!currentDateTimeRunning) {
            return
        }
        
        const currentDatetimeIntervalId = setInterval( ()=>{
            setCurrentDateTime((new Date()).toLocaleString())
        }, 900)
        return () => clearInterval(currentDatetimeIntervalId)

    }, [currentDateTimeRunning])

    function handleStartStopCurrentDateTime (hoverState) {
        setCurrentDateTimeRunning(hoverState)
    }

    return (
        <>
            <nav className="nav-bar">
                <div>
                    <NavLink to="/projects" className="nav-item">Project</NavLink>
                    <NavLink to="" className="nav-item" onClick={handleLogout}>Sign Out</NavLink>
                </div>
                <div className="current-date-time" onMouseEnter={() => handleStartStopCurrentDateTime(false)} onMouseLeave={()=> handleStartStopCurrentDateTime(true)}>
                    {currentDateTime}
                </div>
            </nav>
            <div className="container">
                <div>
                    <Error message={errorMessage} onClose={closeError}/>
                </div>
                
                <Outlet />                
            </div>
        </>
    )
}

export default NavBar