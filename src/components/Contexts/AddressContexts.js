import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorContext } from "./ErrorContexts";

export const AddressContext = createContext();

// export const url = "http://localhost:5000";
export const url = process.env.BACKEND_URL;
console.log(process.env)

export const AddressProvider = ({ children }) => {
    
  const [userAddressList, setUserAddressList] = useState([]);
  const [userAddressIndex, setUserAddressIndex] = useState(-2);
  const {showNotif, setIsLoading} = useContext(ErrorContext);
  const [checkOutContent, setCheckOutContent] = useState({cart:[], address:[]});
  
  const navigate = useNavigate();
  const location = useLocation();

  const addAddressHandler = async (newAddress) => {
    setIsLoading(true);
    
    try{

      const response = await fetch(`${url}/api/user/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("flashToken")
        },
        body: JSON.stringify({...newAddress})
      })

      if(response.status === 201){
        const newUserList = await response.json();
        setUserAddressList(newUserList.addressList.sort((a, b) => (a.addressIndex - b.addressIndex)));
        navigate(location?.state ?? "/userProfile");
        showNotif(`Success`, "Successfully added address.");
      }else{
        showNotif(`Issue`, `${response.status}: Issue in adding address.`);
      }
    }catch(error){
        showNotif(`Error`, `${error.status}: Error in adding address.`);
    }finally{
      setIsLoading(false);
    }
  }

  const deleteAddressHandler = async (id) => {

    if(userAddressList.length === 1){
      navigate("/userProfile");
      showNotif("Error", "Need one address minimum");
      return;
    }

    try{
      setIsLoading(true);
      const response = await fetch(`${url}/api/user/address/${id}`,{
          method: "DELETE",
          headers: {"authorization": localStorage.getItem("flashToken")}
      });
      
      if(response.status === 200){
          const newUserList = await response.json();
          setUserAddressList(newUserList.addressList.sort((a, b) => (a.addressIndex - b.addressIndex) ));
          showNotif(`Success`, "Successfully deleted address.");
          navigate("/userProfile");
      }else{
        showNotif(`Issue`, `${response.status}: Issue in deleting address.`);
      }
    }catch(error){
        showNotif(`Error`, `${error.status}: Error in deleting address.`);
    }finally{
      setIsLoading(false);
    }
}

  const updateAddressHandler = async(id, updatedAddress) => {
      
    try{
      setIsLoading(true);
      const response = await fetch(`${url}/api/user/address/${id}`,{
          method: "POST",
          headers: {authorization: localStorage.getItem("flashToken")},
          body: JSON.stringify({ address: updatedAddress})
      });

      if(response.status === 200){
        const newUserList = await response.json();
        setUserAddressList(newUserList.addressList.sort((a, b) => (a.addressIndex - b.addressIndex) ));
        showNotif(`Success`, "Successfully updated address.");
        navigate("/userProfile");
      }else{
        showNotif(`Issue`, `${response.status}: Issue in updating address.`);
      }
    }catch(error){
      showNotif(`Error`, `${error.status}: Error in updating address.`);
    }finally{
      setIsLoading(false);
    }
  }

  return <AddressContext.Provider value={{userAddressList, setUserAddressList, deleteAddressHandler, updateAddressHandler, addAddressHandler, userAddressIndex, setUserAddressIndex, checkOutContent, setCheckOutContent}}>
      {children}
  </AddressContext.Provider>
}