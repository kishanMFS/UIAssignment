import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/authenticationContext.tsx";
import { useErrorContext } from "../context/ErrorContext.tsx";
import Error from "./Error.tsx";
import LayoutModuleCSS from "../styles/Layout.module.css";

function NavBar() {
  const { logout } = UserAuth();
  const [currentDateTime, setCurrentDateTime] = useState<string>(
    new Date().toLocaleString(),
  );
  const [currentDateTimeRunning, setCurrentDateTimeRunning] =
    useState<boolean>(true);
  const { errorMessage, closeError } = useErrorContext();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (!currentDateTimeRunning) {
      return;
    }

    const currentDatetimeIntervalId = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 900);
    return () => clearInterval(currentDatetimeIntervalId);
  }, [currentDateTimeRunning]);

  function handleStartStopCurrentDateTime(hoverState: boolean) {
    setCurrentDateTimeRunning(hoverState);
  }

  return (
    <div>
      <nav className={LayoutModuleCSS.navBar}>
        <div>
          <NavLink to="/projects" className={LayoutModuleCSS.navItem}>
            Project
          </NavLink>
          <NavLink
            to=""
            className={LayoutModuleCSS.navItem}
            onClick={handleLogout}
          >
            Sign Out
          </NavLink>
        </div>
        <div
          className={LayoutModuleCSS.currentDateTime}
          onMouseEnter={() => handleStartStopCurrentDateTime(false)}
          onMouseLeave={() => handleStartStopCurrentDateTime(true)}
        >
          {currentDateTime}
        </div>
      </nav>
      <div>
        <div>
          <Error message={errorMessage} onClose={closeError} />
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default NavBar;
