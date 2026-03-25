import { useLocation, useNavigate } from "react-router-dom";
import GlobalModuleCSS from "../styles/Global.module.css";
function RenderError() {
  const location = useLocation();
  const navigate = useNavigate();

  const error = location.state?.error;

  function handleButtonClick() {
    navigate("/");
  }
  return (
    <div>
      <h3>Something went wrong</h3>
      <p>{error || "unexpected error occured"}</p>
      <button className={GlobalModuleCSS.btn} onClick={handleButtonClick}>
        Go Home
      </button>
    </div>
  );
}

export default RenderError;
