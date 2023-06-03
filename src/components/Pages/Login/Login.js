import { Link } from "react-router-dom";
import BoilerPlate from "../../Layouts/BoilerPlate";
import "../SignUp/SignUp.css"

import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContexts";
import { DefaultButton } from "../../Util/DefaultButton/AllButtons";
const md5 = require('md5');

const Login = () => {

    const {loginUserHandler, testUserHandler} = useContext(AuthContext);
    
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

                        <input className="formGroupInput" type="password" placeholder="Password*" id="userPassword" required/>
                        <label className="formGroupLabel" htmlFor="userPassword">Password*</label>
                        
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