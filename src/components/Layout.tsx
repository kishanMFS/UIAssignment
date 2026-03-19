import { Outlet, NavLink, useNavigate } from "react-router-dom"



function NavBar () {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('jwtToken')
        navigate('/logout')
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