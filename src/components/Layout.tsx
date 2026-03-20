import { Outlet, NavLink, useNavigate } from "react-router-dom"

import { UserAuth } from '../context/authenticationContext.tsx';

function NavBar () {
    // const navigate = useNavigate()
    const { logout } = UserAuth();

    const handleLogout = () => {
        logout()
        // navigate('/login')
    }
    return (
        <>
            <nav className="nav-bar">
                <NavLink to="/projects" className="nav-item">Project</NavLink>
                <NavLink to="" className="nav-item" onClick={handleLogout}>Sign Out</NavLink>
            </nav>
            <div className="container">
                <Outlet />
            </div>
        </>
    )
}

export default NavBar