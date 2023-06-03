import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContexts";
import BoilerPlate from "../../Layouts/BoilerPlate";
import { AddressContext } from "../../Contexts/AddressContexts";
import './SignUp.css';
import { DefaultButton } from "../../Util/DefaultButton/AllButtons";

const AddAddress = () => {
    const {createUserHandler, setValidateCreateUser, userCreds, editAddressType} = useContext(AuthContext);
    const {userAddressList, setUserAddressList, updateAddressHandler, userAddressIndex, addAddressHandler} = useContext(AddressContext);
    
    const [radioValue, setRadioValue] = useState("Home");

    
    let addressEdit={}, pageTitleName = "Create New Account", pageTitleSub="Enter a world of limitless knowledge.";

    if(userAddressIndex !== -2){
        console.log(userAddressIndex);
        addressEdit = userAddressList.find(({addressIndex}) => addressIndex === userAddressIndex).address;
        
    }
        
    const formSubmitHandler = (event, userCreds) => {
        event.preventDefault();

        const addressName = event.target[0].value;
        const address1 = event.target[1].value;
        const address2 = event.target[2].value;
        const address3 = event.target[3].value;
        const addressTel = event.target[4].value;
        const addressType = radioValue; 

        const updatedAddress = {
            address: {
                addressName: addressName,
                address1: address1,
                address2: address2,
                address3: address3,
                addressType: addressType,
                addressTel: addressTel
            }
        }
        if(editAddressType === "update"){
            updateAddressHandler(userAddressIndex, updatedAddress)
            return;
        }

        if(editAddressType === "add"){
            addAddressHandler(updatedAddress);
            return;
        }
           
        const createUserAddress = {
            addressList: [{
                ...updatedAddress,                
                addressIndex: userCreds.addressCount
            }
        ]};

        
        setUserAddressList(createUserAddress.addressList);
        
        setValidateCreateUser(false);
        
        createUserHandler(userCreds, createUserAddress);
            
    }

    
    const tempAddressCreator = () => {
        document.getElementById("AddressName").value="Lorem Ipsum";
        document.getElementById("AddressLine1").value="Lorem Ipsum is simply dummy text";
        document.getElementById("AddressLine2").value="Lorem Ipsum has been the industry's standard since the 1500s";
        document.getElementById("AddressLine3").value="Contrary to popular belief, Lorem Ipsum is not simply random text.";
        document.getElementById("AddressTelephone").value="1234567890";
    }

    switch (editAddressType) {
        case "update":
            pageTitleName = "Update Address";
            pageTitleSub = "Update the address fields.";
            break;
        
        case "add":
            pageTitleName = "Add New Address";
            pageTitleSub = "A new destination? Let's go.";
            break;
    
        default:
            pageTitleName = "Create Account";
            pageTitleSub = "Enter a world of limitless knowledge.";
            break;
    }
    
    return <BoilerPlate>
        <div className="formContainer">
            <div className="formContainerLeft">
                <h2 className="formHeading2">{pageTitleName}</h2>
                <p className="formSubText">{pageTitleSub}</p>
            </div>
            <div className="formContainerRight">
                <form className="form" onSubmit={(event)=>formSubmitHandler(event, userCreds, "new")}>
                    <div className="formGroup">

                        <input 
                        className="formGroupInput" 
                        type="text" 
                        placeholder="Address Name*" 
                        id="AddressName" 
                        defaultValue={addressEdit.addressName ?? ""}
                        required autoFocus/>
                        <label className="formGroupLabel" htmlFor="AddressName">Address Name*</label>
                        
                    </div>
                    <div className="formGroup">
                        <input 
                        className="formGroupInput" 
                        type="text" 
                        placeholder="Address Line 1*" 
                        id="AddressLine1" 
                        defaultValue={addressEdit.address1 ?? ""}
                        required />
                        <label className="formGroupLabel" htmlFor="AddressLine1">Address Line 1*</label>
                        
                    </div>

                    <div className="formGroup">
                        <input 
                        className="formGroupInput" 
                        type="text" 
                        placeholder="Address Line 2*" 
                        id="AddressLine2" 
                        defaultValue={addressEdit.address2 ?? ""}
                        required />
                        <label className="formGroupLabel" htmlFor="AddressLine2">Address Line 2*</label>
                        
                    </div>

                    <div className="formGroup">
                        <input 
                        className="formGroupInput" 
                        type="text" 
                        placeholder="Address Line 3*" 
                        id="AddressLine3" 
                        defaultValue={addressEdit.address3 ?? ""}
                        required />
                        <label className="formGroupLabel" htmlFor="AddressLine3">Address Line 3*</label>
                        
                    </div>

                    <div className="formGroup">
                        
                        <input 
                        className="formGroupInput" 
                        type="tel" 
                        placeholder="Phone Number*" 
                        id="AddressTelephone" pattern="[0-9]{10}" 
                        defaultValue={addressEdit.addressTel ?? ""}
                        required />
                        <label className="formGroupLabel" htmlFor="AddressTelephone">Phone Number*</label>
                        
                    </div>

                    <div className="formGroupRadio">
                        Select type of address
                        <div className="formRadioList" onChange={(event)=>setRadioValue(event.target.value)}>
                            <div className="formRadio">
                            <input type="radio" name="addressType" id="home" value="Home" defaultChecked/>
                            <label htmlFor="sortLowToHigh">Home</label>
                            </div>
                            <div className="formRadio"><input type="radio" name="addressType" id="office" value="Office"/>
                            <label htmlFor="sortHighToLow">Office</label>
                            </div>
                            <div className="formRadio"><input type="radio" name="addressType" id="other" value="Other"/>
                            <label htmlFor="sortHighToLow">Other</label>
                            </div>
                        </div>
                    </div>

                    <DefaultButton type="submit">{pageTitleName}</DefaultButton>
                </form>
                <DefaultButton onClick={tempAddressCreator}>Temp Address</DefaultButton>
                
            </div>
        </div>
    </BoilerPlate>
}

export default AddAddress;