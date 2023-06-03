import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "./ErrorContexts";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    
  const [userAddressList, setUserAddressList] = useState([]);
  const [userAddressIndex, setUserAddressIndex] = useState(-2);
  const {showNotif, setLoading} = useContext(ErrorContext);
  const [checkOutContent, setCheckOutContent] = useState({cart:[], address:[]});
  
  const navigate = useNavigate();

//   const getAddress = async () => {
//     try{
//         const response = await fetch("/api/user/address",{
//             method: "GET",
//             headers: {"authorization": localStorage.getItem("flashToken")}
//         });

        
//         if(response.status === 200){
//           setUserAddressList(JSON.parse(response._bodyText).addressList);
//           showNotif(`Success`, "Successfully received addresses.");
//         }else{
//           showNotif(`Issue`, `${response.status}: Issue in fetching address.`);
//         }
//     }catch(error){
//         showNotif(`Error`, `${error.status}: Error in fetching addresses.`);
//     }
// }

  const addAddressHandler = async (newAddress) => {
    
    setLoading(true);
    
    try{
      const response = await fetch("/api/user/address", {
        method: "POST",
        headers: {"authorization": localStorage.getItem("flashToken")},
        body: JSON.stringify({...newAddress})
      })
      if(response.status === 201){
        setUserAddressList(JSON.parse(response._bodyText).addressList.sort((a, b) => (a.addressIndex - b.addressIndex)));
        navigate("/userProfile");
        showNotif(`Success`, "Successfully added address.");
        
      }else{
        showNotif(`Issue`, `${response.status}: Issue in adding address.`);
      }
    }catch(error){
        showNotif(`Error`, `${error.status}: Error in adding address.`);
    }finally{
      setLoading(false);
    }
  }

  const deleteAddressHandler = async (id) => {
    try{
        const response = await fetch(`/api/user/address/${id}`,{
            method: "DELETE",
            headers: {"authorization": localStorage.getItem("flashToken")}
        });
        
        
        if(response.status === 200){
            setUserAddressList(JSON.parse(response._bodyText).addressList.sort((a, b) => (a.addressIndex - b.addressIndex) ));
            showNotif(`Success`, "Successfully deleted address.");
            navigate("/userProfile");
        }else{
          showNotif(`Issue`, `${response.status}: Issue in deleting address.`);
        }
    }catch(error){
        showNotif(`Error`, `${error.status}: Error in deleting address.`);
    }
}

  const updateAddressHandler = async(id, updatedAddress) => {
      try{
          const response = await fetch(`/api/user/address/${id}`,{
              method: "POST",
              headers: {authorization: localStorage.getItem("flashToken")},
              body: JSON.stringify({ address: updatedAddress})
          });
    
          if(response.status === 200){
            setUserAddressList(JSON.parse(response._bodyText).addressList.sort((a, b) => (a.addressIndex - b.addressIndex) ));
            showNotif(`Success`, "Successfully updated address.");
            navigate("/userProfile");
          }else{
            showNotif(`Issue`, `${response.status}: Issue in updating address.`);
          }
      }catch(error){
        showNotif(`Error`, `${error.status}: Error in updating address.`);
      }
  }

  // useEffect(()=>{
  //     getAddress();// eslint-disable-next-line
  // },[])

  return <AddressContext.Provider value={{userAddressList, setUserAddressList, deleteAddressHandler, updateAddressHandler, addAddressHandler, userAddressIndex, setUserAddressIndex, checkOutContent, setCheckOutContent}}>
      {children}
  </AddressContext.Provider>
}