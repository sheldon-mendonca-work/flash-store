import { createContext, useContext, useState } from "react";
import { ErrorContext } from "./ErrorContexts";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({children}) => {

    const [ userCart, setUserCart ] = useState([]);
    const { showNotif, setIsLoading } = useContext(ErrorContext);
    const navigate = useNavigate();

    const getCart = async () => {
        setIsLoading(true);

        try{
            const response = await fetch("/api/user/cart",{
                method: "GET",
                headers: {"authorization": localStorage.getItem("flashToken")}
            });

            if(response.status === 200){
                setUserCart(JSON.parse(response._bodyText).cart);
            }else{
            showNotif(`Issue`, `${response.status}: Issue in fetching cart.`);
            }
        }catch(error){
            console.log("Error in fetching cart: ", error);
        }finally{
            setIsLoading(false);
        }
    }

    const addToCartHandler = async(item) => {
        
        if(localStorage.getItem("flashToken") === null){
            navigate('/login');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch("/api/user/cart", {
                method: "POST",
                headers: { "authorization": localStorage.getItem("flashToken")},
                body: JSON.stringify({product: item})
            })
            
            if(response.status === 201){
                showNotif("Success", "Successfully added to cart");
                await getCart();
            }else if(response.status === 500 && !localStorage.getItem("flashToken")){
                showNotif(`Issue`, `${response.status}: Looks like you are not logged in.`);
            }else{
                showNotif(`Issue`, `${response.status}: Issue in adding item to cart.`);
              }
        } catch (error) {
            showNotif(`Error`, `${error.status}: Error in adding item to cart.`);
        } finally{
            setIsLoading(false);
        }
    }

    const changeQtyHandler = (id, type,qty) => {
        if(type === "decrement" &&  qty === 1){
            deleteCartItemHandler(id);
            
        }else{
            updateQtyHandler(id,type);
        } 
    }

    const deleteCartItemHandler = async (id, displayNotif) => {
        setIsLoading(true); 
        try{
            const response = await fetch(`/api/user/cart/${id}`,{
                method: "DELETE",
                headers: {"authorization": localStorage.getItem("flashToken")}
            });

            if(response.status === 200){
                setUserCart(JSON.parse(response._bodyText).cart);
                await getCart();
                if(displayNotif !== false){
                showNotif(`Success`, "Successfully deleted item from cart.");
                }
            }else{
                showNotif(`Issue`, `${response.status}: Issue in deleting item from cart.`);
            }
        }catch(error){
            showNotif(`Error`, `${error.status}: Error in deleting item from cart.`);
        }finally{
            setIsLoading(false);
        }
    }

    const updateQtyHandler = async(id, typeName) => {
        
        setIsLoading(true);
        try{
            const response = await fetch(`/api/user/cart/${id}`,{
                method: "POST",
                headers: {authorization: localStorage.getItem("flashToken")},
                body: JSON.stringify({
                    action: {
                      type: typeName
                    }
                  })
            });

            if(response.status === 200){
                setUserCart(JSON.parse(response._bodyText).cart);
                showNotif(`Success`, "Successfully updated item qty.");
            }else{
                showNotif(`Issue`, `${response.status}: Issue in updating item qty.`);
            }
        }catch(error){
            showNotif(`Error`, `${error.status}: Error in updating item qty.`);
        }finally{
            setIsLoading(false);
        }
    }

    return <CartContext.Provider value={{userCart, setUserCart, addToCartHandler, getCart, changeQtyHandler, deleteCartItemHandler, updateQtyHandler}}>
        {children}
    </CartContext.Provider>
}