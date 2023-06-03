import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContexts";
import { Navigate, useLocation } from "react-router-dom";

const RequiresAuth = (props) => {
    const {isLoggedIn} = useContext(AuthContext);
    const location = useLocation();
    const {children} = props;

    return <>
    {isLoggedIn ? children : <Navigate to="/login" state={{from: location}}/>}
    </>
}

export default RequiresAuth;