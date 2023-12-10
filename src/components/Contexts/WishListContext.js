import { createContext, useContext, useState } from "react";
import { ErrorContext } from "./ErrorContexts";
import { useLocation, useNavigate } from "react-router-dom";
import { url } from "./AddressContexts";

export const WishlistContext = createContext();


export const WishlistProvider = ({children}) => {
    const { showNotif, setIsLoading } = useContext(ErrorContext);
    
    const [ userWishlist, setUserWishlist ] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const addToWishlistHandler = async (item) => {
        
        if(localStorage.getItem("flashToken") === null){
            navigate('/login', {state: location?.pathname});
            return;
        }
        setIsLoading(true);
        try {
            if(item.productId){
                item._id = item.productId
            }

            const response = await fetch(`${url}/api/user/wishlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("flashToken")
                  },
                body: JSON.stringify({product: item})
            })
            
            if(response.status === 201){
                showNotif(`Success`, "Successfully added to wishlist.");
                await getWishlist();
            }else{
                showNotif(`Issue`, `${response.status}: Issue in adding to wishlist.`);
            }
        } catch (error) {
            showNotif(`Error`, `${error.status}: Error in adding to wishlist.`);
        }finally{
            setIsLoading(false);
        }
    }

    const removeWishlistHandler = async (item) => {

        if(localStorage.getItem("flashToken") === null){
            navigate('/login', {state: location?.pathname});
            return;
        }
        
        setIsLoading(true);
        try {
            if(item.productId){
                item._id = item.productId
            }
            const response = await fetch(`${url}/api/user/wishlist/${item._id}`,{
                method: "DELETE",
                headers: {"authorization": localStorage.getItem("flashToken")}
            });

            if(response.status === 200){
                showNotif(`Success`, "Successfully removed from wishlist.");
                await getWishlist();
            }else{
                showNotif(`Issue`, `${response.status}: Issue in removing item from wishlist.`);
            }
        }catch(error){
            showNotif(`Error`, `${error.status}: Error in removing item from wishlist.`);
        }finally{
            setIsLoading(false);
        }
    }
    
    const getWishlist = async () => {

        setIsLoading(true);
        try{
            const response = await fetch(`${url}/api/user/wishlist`,{
                method: "GET",
                headers: {"authorization": localStorage.getItem("flashToken")}
            });

            if(response.status === 200){
                const responseData = await response.json();
                setUserWishlist(responseData.wishlist);
            }else{
                showNotif(`Issue`, `${response.status}: Issue in fetching wishlist.`);
            }
        }catch(error){
            showNotif(`Error`, `${error.status}: Error in fetching wishlist.`);
        }finally{
            setIsLoading(false);
        }
    }

    return <WishlistContext.Provider value={{ getWishlist, userWishlist, setUserWishlist, addToWishlistHandler, removeWishlistHandler}}>
        {children}
    </WishlistContext.Provider>
}