import { Link,  useNavigate } from "react-router-dom";
import BoilerPlate from "../../Layouts/BoilerPlate";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContexts";

import './SignUp.css';
import { DefaultButton } from "../../Util/DefaultButton/AllButtons";
import { ErrorContext } from "../../Contexts/ErrorContexts";
import { NotViewPasswordIcon, ViewPasswordIcon } from "../../Util/Icons";


const md5 = require('md5');


const SignUp = () => {

    const { setValidateCreateUser, testUserHandler, setUserCreds, setEditAddressType } = useContext(AuthContext);

    const { showNotif } = useContext(ErrorContext);

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState({
        "userPassword": false,
        "userConfirmPassword": false
    })

    const showPasswordHandler = (passwordID) => {
        
        document.getElementById(passwordID).type = showPassword[passwordID] ? "password" : "text";
        setShowPassword(prevState => ({...prevState, [passwordID]: !prevState[passwordID]}))
    }

    useEffect(()=> {
        if(localStorage.getItem("flashToken") !== null){
            navigate("/")
            // showNotif("Error", "Looks like you are logged in already");
            
            
            // return;
        }// eslint-disable-next-line
    }, [])
    
    const formSubmitHandler = (event) => {
        event.preventDefault();
        
        if(document.getElementById("acceptConditions").checked === false){
            showNotif(`Error`, `Terms should be accepted.`);
            return;
        }

        const userEmail = event.target[0].value;
        const userFirstName = event.target[1].value;
        const userLastName = event.target[2].value ?? '';
        const userPassword = event.target[3].value;
        const userConfirmPassword = event.target[4].value;
        
        if(userConfirmPassword !== userPassword){
            showNotif(`Error`, "Password do not match");
        }else{
            setUserCreds(prevState => ({ ...prevState,
                email: userEmail,
                password: md5(userPassword),
                firstName: userFirstName,
                lastName: userLastName,
                addressCount: 1,
            }));
            
            setValidateCreateUser(true);
            setEditAddressType("new");
            navigate("/signUpAddress");
        }
    }

    const tempButtonHandler = () => {
        document.getElementById("userEmail").value = "1@23.com";
        document.getElementById("userFirstName").value = "Temp";
        document.getElementById("userLastName").value = "User";
        document.getElementById("userPassword").value = "123";
        document.getElementById("userConfirmPassword").value = "123";
        document.getElementById("acceptConditions").checked = true;
    }
    

    return <BoilerPlate>
        <div className="formContainer">
            <div className="formContainerLeft">
                <h2 className="formHeading2">Sign Up</h2>
                <p className="formSubText">Enter a world of limitless knowledge.</p>
            </div>
            <div className="formContainerRight">
            <form className="form" onSubmit={formSubmitHandler}>
                
                <div className="formGroup">

                    <input className="formGroupInput" type="email" placeholder="Email Address*" id="userEmail" required autoFocus/>
                    <label className="formGroupLabel" htmlFor="userEmail">Email Address*</label>

                </div>

                <div className="formGroup">
                    
                    <input className="formGroupInput" type="text" placeholder="First Name*" id="userFirstName" required/>
                    <label className="formGroupLabel" htmlFor="userFirstName">First Name*</label>

                </div>

                <div className="formGroup">
                    
                    <input className="formGroupInput" type="text" placeholder="Last Name" id="userLastName" />
                    <label className="formGroupLabel" htmlFor="userLastName">Last Name</label>

                </div>

                <div className="formGroup">
                    
                    <input className="formGroupInput" type="password" placeholder="Your Password*" id="userPassword" required/>
                    <span onClick={()=> showPasswordHandler("userPassword")}>
                        {
                        showPassword["userPassword"] ?
                            <NotViewPasswordIcon className={"viewPasswordIcon"} />
                        :
                            <ViewPasswordIcon className={"viewPasswordIcon"} />
                        }
                    </span>
                    <label className="formGroupLabel" htmlFor="userPassword">Your Password*</label>

                </div>

                <div className="formGroup">
                    
                    <input className="formGroupInput" type="password" placeholder="Confirm Password*" id="userConfirmPassword" required/>
                    <span onClick={()=> showPasswordHandler("userConfirmPassword")}>
                        {
                        showPassword["userConfirmPassword"] ?
                            <NotViewPasswordIcon className={"viewPasswordIcon"} />
                        :
                            <ViewPasswordIcon className={"viewPasswordIcon"} />
                        }
                    </span>
                    <label className="formGroupLabel" htmlFor="userConfirmPassword">Confirm Password*</label>

                </div>

                <div className="termsCheck">
                    <div>
                        <input type="checkbox" id="acceptConditions" defaultChecked={false}/>
                        <label htmlFor="acceptConditions" className="acceptConditionsLabel" required>Do you accept terms and conditions?</label>
                    </div>
                    <Link to="#" className="acceptConditionsLink">Forgot Password?</Link>
                </div>

                <DefaultButton className="btnSubmit" type="submit">Next Step</DefaultButton>
            </form>
            
            <div className="testUserLinks">
                <DefaultButton className="btnLogin" onClick={()=>navigate("/login")}>Log In</DefaultButton>
                
                <DefaultButton className="btnFormHalf" onClick={testUserHandler}>Test User</DefaultButton>
                
                <DefaultButton className="btnFormHalf" onClick={tempButtonHandler}>Temp Data</DefaultButton>
            </div>
        </div>
        </div>
    </BoilerPlate>
}

export default SignUp;