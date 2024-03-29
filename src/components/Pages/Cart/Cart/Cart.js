import { useContext, useEffect } from "react";
import { CartContext } from "../../../Contexts/CartContexts";
import { AddressContext } from "../../../Contexts/AddressContexts";
import "./Cart.css";
import '../../UserProfile/UserProfile.css';
import { DefaultButton } from "../../../Util/DefaultButton/AllButtons";
import { ErrorContext } from "../../../Contexts/ErrorContexts";
import { Link, useNavigate } from "react-router-dom";
import BoilerPlate from "../../../Layouts/BoilerPlate";
import CartItem from "../CartItem/CartItem";
import AddressCard from "../Address/AddressCard";
import { AuthContext } from "../../../Contexts/AuthContexts";

const Cart = () => {

    useEffect(()=>{
        window.scroll(0,0);
    },[])
    const { userCart, setUserCart, deleteCartItemHandler } = useContext(CartContext);
    const { setEditAddressType, setValidateCreateUser} = useContext(AuthContext);
    const { userAddressList, userAddressIndex, setUserAddressIndex, setCheckOutContent } = useContext(AddressContext);
    const {showNotif} = useContext(ErrorContext);
    const navigate = useNavigate();
    
    const {cartItemQty, cartItemSubtotal} = userCart.reduce((acc, {quantity, price}) => (
        {
            ...acc, cartItemQty: acc.cartItemQty + quantity, 
            cartItemSubtotal: acc.cartItemSubtotal + (quantity*price)
        }), {cartItemQty: 0, cartItemSubtotal: 0});
    
    
    const checkoutHandler = async() => {
        if(userAddressIndex === undefined || userAddressIndex === -2){
            showNotif("Error", "No Address selected");
            return;
        }

        setCheckOutContent(({
            cart: userCart,
            address: userAddressList.find(({addressIndex})=>(addressIndex === userAddressIndex)),
            lastDelivery: new Date().toLocaleString()
        }))
        
        userCart.map(index => deleteCartItemHandler(index.productId, false));
        setUserCart([])
        setUserAddressIndex(-2);
        showNotif("Success", "Items are ready for delivery.");
        navigate("/checkout");
    }

    const addNewAddressHandler = () => {
        setValidateCreateUser(true);
        setEditAddressType("add");
        navigate("/signUpAddress", {state: '/cart'});
        return;
    }
    
    return <BoilerPlate>
        <div className="cartPage">
        <h2 className="heading2">Cart {cartItemQty !== 0 && `(${cartItemQty})`}</h2>
            {cartItemSubtotal === 0 && <div className="noCart">No items present in cart. View our catalogue <Link to="/products">here.</Link></div>}
            {cartItemSubtotal !== 0 && 
            <div className="cartContainer">
                <div className="cartPageLeft">
                    {
                    userCart.map(item => <CartItem key={item._id} item={item}/>)
                    }
                </div>
                <div className="cartPageRight">
                    
                    <div className="checkoutCard">
                        <DefaultButton onClick={checkoutHandler} className="checkoutButton">Proceed To Checkout</DefaultButton>
                        <div className="checkoutTitleDiv">
                            <span>Your Cart</span>
                            <span>{cartItemQty} {cartItemQty > 1 ? "Items": "Item"}</span>
                        </div>
                        <div>
                            <span>Subtotal</span>
                            <span>&#8377;  {cartItemSubtotal}</span>
                        </div>
                        <div className="checkoutTotalDiv">
                            <span>Total</span>
                            <span>&#8377;  {cartItemSubtotal}</span>
                        </div>
                    </div>
                    <div className="checkoutHeading3Div">
                        <h3 className="checkoutHeading3">Select Address</h3>
                        <button onClick={addNewAddressHandler}>Add Address</button>
                    </div>
                    <div className="addressList checkoutAddressList">
                        {userAddressList.map((address) => (
                            <AddressCard address={address} addressIndex={address.addressIndex} key={address.addressIndex} />
                        ))}
                        
                    </div>
                </div>
            </div>}
        </div>
    </BoilerPlate>
}

export default Cart;