import { createContext, useContext, useState } from "react";
import { ErrorContext } from "./ErrorContexts";
import { useNavigate } from "react-router-dom";

export const WishlistContext = createContext();


export const WishlistProvider = ({children}) => {
    const { showNotif, setIsLoading } = useContext(ErrorContext);
    
    const [ userWishlist, setUserWishlist ] = useState([]);

    const navigate = useNavigate();

    const addToWishlistHandler = async (item) => {
        
        if(localStorage.getItem("flashToken") === null){
            navigate('/login');
            navigate(0);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch("/api/user/wishlist", {
                method: "POST",
                headers: { "authorization": localStorage.getItem("flashToken")},
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
            navigate('/login');
            navigate(0);
            return;
        }
        
        setIsLoading(true);
        try {
            const response = await fetch(`/api/user/wishlist/${item._id}`,{
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
            const response = await fetch("/api/user/wishlist",{
                method: "GET",
                headers: {"authorization": localStorage.getItem("flashToken")}
            });

            if(response.status === 200){
                setUserWishlist(JSON.parse(response._bodyText).wishlist);
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