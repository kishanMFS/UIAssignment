import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { UserAuth } from '../context/authenticationContext.tsx';

function NavBar () {
    // const navigate = useNavigate()
    const { logout } = UserAuth();
    const [currentDateTime, setCurrentDateTime] = useState<string>( new Date().toLocaleString() )
    const [currentDateTimeRunning, setCurrentDateTimeRunning ] = useState<boolean>(true)

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
                <Outlet />
            </div>
        </>
    )
}

export default NavBar