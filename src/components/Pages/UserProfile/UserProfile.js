import { useContext } from "react";
import BoilerPlate from "../../Layouts/BoilerPlate";
import { AuthContext } from "../../Contexts/AuthContexts";
import { AddressContext } from "../../Contexts/AddressContexts";
import { useNavigate } from "react-router-dom";
import '../SignUp/SignUp.css';
import './UserProfile.css'
import { DefaultButton } from "../../Util/DefaultButton/AllButtons";

const UserProfile = () => {
    const {userCreds, setEditAddressType, setValidateCreateUser} = useContext(AuthContext);
    const {email, firstName, lastName} = userCreds;
    const {userAddressList, deleteAddressHandler, setUserAddressIndex} = useContext(AddressContext);
    console.log(userAddressList)
    const navigate = useNavigate();

    const editAddressHandler = (addressIndex) => {
        setValidateCreateUser(true);
        setEditAddressType("update");
        setUserAddressIndex(addressIndex);
        navigate("/signUpAddress");
    }

    const addNewAddressHandler = () => {
        setValidateCreateUser(true);
        setEditAddressType("add");
        navigate("/signUpAddress");
    }

    return <BoilerPlate>
        <div className="userProfile">
        <h2 className="heading2">Hello, {firstName} {lastName}!</h2>
        <h3 className="heading3">Primary Details</h3>
        <div className="profilePrivateDetails">
            
            <div className="profileDetailContainer">
                <label htmlFor="userEmail">Your email</label>
                <input className="formGroupInput" type="email" placeholder="Email" id="userEmail" autoFocus defaultValue={email} readOnly={true}/>
            </div>

            <div className="profileDetailContainer">
                <label htmlFor="userFirstName">First Name</label>
                <input className="formGroupInput" type="text" placeholder="First Name" id="userFirstName"  defaultValue={firstName} readOnly={true}/>
            </div>

            <div className="profileDetailContainer">
                <label htmlFor="userLastName">Last Name</label>
                <input className="formGroupInput" type="text" placeholder="Last Name" id="userLastName" defaultValue={lastName} readOnly={true}/>
            </div>
        </div>
        
        <div >
            <DefaultButton onClick={addNewAddressHandler} className="addressAddButton">Add Address</DefaultButton>
            <div className="addressList">
                {userAddressList.length > 0 && userAddressList.map((address) => (
                    <div key={address.addressIndex} className="addressCard">
                        <p className="addressCardTitle">{address.addressName}</p>
                        <p className="addressCardBold">Address:</p>
                        <div>{address.address1}</div>
                        <div>{address.address2}</div>
                        <div>{address.address3}</div>
                        <div ><span className="addressCardBold">Type: </span>{address.addressType}</div>
                        <div ><span className="addressCardBold">Type: </span>{address.addressTel}</div>
                        <div className="addressEditButton">
                            <button onClick={()=>editAddressHandler(address.addressIndex)}>Edit</button>
                            <button onClick={()=>deleteAddressHandler(address.addressIndex)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    </BoilerPlate>
}

export default UserProfile;