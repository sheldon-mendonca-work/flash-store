import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContexts";
import { WishlistContext } from "./WishListContext";
import { AddressContext, url } from "./AddressContexts";
import { ErrorContext } from "./ErrorContexts";
import { ProductContext } from "./ProductContexts";
const md5 = require('md5');

export const AuthContext = createContext();

const initUserCreds = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  addressCount : 1,
}

export const AuthProvider = ({ children }) => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("flashToken") ? true : false
  );
  const [validateCreateUser, setValidateCreateUser] = useState(false);

  const [userCreds, setUserCreds] = useState(initUserCreds);
  const [editAddressType, setEditAddressType] = useState("new");

  const {setUserCart} = useContext(CartContext);
  const {setUserWishlist} = useContext(WishlistContext);
  const {setUserAddressList} = useContext(AddressContext);
  const { showNotif, setIsLoading } = useContext(ErrorContext);
  const { getProductList } = useContext(ProductContext);
  
  let location = useLocation();

  let navigate = useNavigate();
  
  useEffect(()=>{
    
    async function loadProducts(){
      await getProductList();
      if(localStorage.getItem("flashToken")){
          const loginCreds = {
            email: localStorage.getItem("flashEmail"),
            password: localStorage.getItem("flashPassword"),
        } 
        loginUserHandler(loginCreds);
      }  
    }

    loadProducts();
    // eslint-disable-next-line
  },[])

  const loginUserHandler = async (loginCreds) => {
    
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(loginCreds),
        headers: {
          "Content-Type": "application/json",
        }
      });
      
      if (response.status === 200) {
        
        const responseData = await response.json();
        
        const reponseUserData = responseData.foundUser
        
        const {firstName, lastName, email, addressCount} = reponseUserData;
        
        setUserCart(reponseUserData.cart);
        setUserWishlist(reponseUserData.wishlist);
        setUserAddressList(reponseUserData.addressList);
        
        localStorage.setItem("flashToken", responseData.encodedToken);
        localStorage.setItem("flashEmail", email);
        localStorage.setItem("flashPassword", loginCreds.password);
        
        setUserCreds({
          "email": email,
          "firstName": firstName,
          "lastName": lastName,
          "addressCount": addressCount
        })
        setIsLoggedIn(true);

        if(location.state === null){
          navigate('/');
        }else{
          navigate(location.state)
        }
      }else{
        showNotif(`Issue`, `${response.status}: Error in logging user.`);
      }
    } catch (error) {
      showNotif(`Error`, `${error.status}: Unable to login user.`);
    }finally{
      setIsLoading(false);
    }
  };

  const createUserHandler = async (createUserCreds, createUserAddress) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${url}/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify({...createUserCreds, ...createUserAddress}),
        headers: {
          "Content-Type": "application/json",
        }
      });
      
      if(response.status === 201){
        const responseData = await response.json();
        
        localStorage.setItem("flashToken", responseData.encodedToken);
        localStorage.setItem("flashEmail", createUserCreds.email);
        localStorage.setItem("flashPassword", createUserCreds.password);
        setIsLoggedIn(true);
        
        showNotif(`Success`, "Successfully created user.");

        if(location?.state?.from?.pathname === "/login" || location?.state?.from?.pathname === undefined || location?.state?.from?.pathname === "/signup"){
          navigate("/");
        }else{
          navigate(location?.state?.from?.pathname);
        }
        showNotif(`Success`, "Successfully created user.");
      }
      else{
        showNotif(`Issue`, `${response.status}: User already exists. Please refresh page.`);
      }

    } catch (error) {
      showNotif(`Error`, `${error.status}: Unable to create user.`);
    }finally{
        setIsLoading(false);
    }
  };

  const testUserHandler = async () => {
    const tempUserCreds = {
      email: "testUser@123.com",
      password: md5("userPassword"),
      }
    
    loginUserHandler(tempUserCreds);
    
  }


  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, loginUserHandler, createUserHandler, testUserHandler, validateCreateUser, setValidateCreateUser, setUserCreds, userCreds, editAddressType, setEditAddressType }}
    >
      {children}
    </AuthContext.Provider>
  );
};
