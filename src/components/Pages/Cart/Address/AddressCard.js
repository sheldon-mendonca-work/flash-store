import { useContext } from "react";
import "../Cart/Cart.css";
import { AddressContext } from "../../../Contexts/AddressContexts";

const AddressCard = (props) => {
    const {address, addressIndex, showAddressRadio = true} = props;
    
    const {addressName, address1, address2, address3, addressType, addressTel } = address;

    const { setUserAddressIndex } = useContext(AddressContext);
    
    return  <label className="addressCard" htmlFor={`${addressIndex}${addressTel}`}>
            <div className="addressTitle">
                <h4 className="addressHeading4">{addressName}</h4>
                {showAddressRadio && <span>
                    <input type="radio" name="addressSelect" onChange={()=>setUserAddressIndex(addressIndex)} id={`${addressIndex}${addressTel}`}/>
                </span>}
            </div>
            <div>{address1}</div>
            <div>{address2}</div>
            <div>{address3}</div>
            <div><span className="highlightType">Type:  </span>{addressType}</div>
            <div><span className="highlightType">Phone:  </span>{addressTel}</div>
    </label>
}

export default AddressCard;