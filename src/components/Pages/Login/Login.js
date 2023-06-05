import { Link } from "react-router-dom";
import BoilerPlate from "../../Layouts/BoilerPlate";
import "../SignUp/SignUp.css"

import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContexts";
import { DefaultButton } from "../../Util/DefaultButton/AllButtons";
import { NotViewPasswordIcon, ViewPasswordIcon } from "../../Util/Icons";
const md5 = require('md5');

const Login = () => {

    const {loginUserHandler, testUserHandler} = useContext(AuthContext);
    
    const [showPassword, setShowPassword] = useState({
        "loginPassword": false,
    })

    const showPasswordHandler = (passwordID) => {
        
        console.log("Here");
        document.getElementById(passwordID).type = showPassword[passwordID] ? "password" : "text";
        setShowPassword(prevState => ({...prevState, [passwordID]: !prevState[passwordID]}))
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        
        const userEmail = event.target[0].value;
        const userPassword = event.target[1].value;
        
        const loginCreds = {
            email: userEmail,
            password: md5(userPassword),
        }

        loginUserHandler(loginCreds);
    }
    

    return <BoilerPlate>
        <div className="formContainer">
            <div className="formContainerLeft">
                <h2 className="formHeading2">Log In</h2>
                <p className="formSubText">Get Access to your cart, wishlist and more...</p>
            </div>
            <div className="formContainerRight">
                <form className="form" onSubmit={formSubmitHandler}>
                    
                    <div className="formGroup">

                        <input className="formGroupInput" type="email" placeholder="Email Address*" id="userEmail" required autoFocus/>
                        <label className="formGroupLabel" htmlFor="userEmail">Email Address*</label>
                        
                    </div>

                    <div className="formGroup">

                        <input className="formGroupInput" type="password" placeholder="Password*" id="loginPassword" required/>
                        <span onClick={()=> showPasswordHandler("loginPassword")}>
                            {
                            showPassword["loginPassword"] ?
                                <NotViewPasswordIcon className={"viewPasswordIcon"} />
                            :
                                <ViewPasswordIcon className={"viewPasswordIcon"} />
                            }
                        </span>
                        <label className="formGroupLabel" htmlFor="loginPassword">Password*</label>
                        
                    </div>

                    <DefaultButton type="submit">Log In</DefaultButton>
                    
                </form>
                
                <div className="noAccount">Don't have an account? <Link className="acceptConditionsLink" to="/signup">Sign Up for a free account</Link></div>
                <DefaultButton onClick={testUserHandler}>Test User</DefaultButton>
            </div>
        </div>
    </BoilerPlate>
}

export default Login;