import { useContext } from "react";
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

const Cart = () => {
    const { userCart, setUserCart, deleteCartItemHandler } = useContext(CartContext);
    const { userAddressList, userAddressIndex, setUserAddressIndex, setCheckOutContent } = useContext(AddressContext);
    const {showNotif} = useContext(ErrorContext);
    const navigate = useNavigate();

    const {cartItemQty, cartItemSubtotal} = userCart.reduce((acc, {qty, price}) => (
        {
            ...acc, cartItemQty: acc.cartItemQty + qty, 
            cartItemSubtotal: acc.cartItemSubtotal + (qty*price)
        }), {cartItemQty: 0, cartItemSubtotal: 0});
    
    
    const checkoutHandler = async() => {
        if(userAddressIndex === undefined || userAddressIndex === -2){
            showNotif("Error", "No Address selected");
            return;
        }

        setCheckOutContent(({
            cart: userCart,
            address: userAddressList.find(({addressIndex})=>(addressIndex === userAddressIndex)).address,
            lastDelivery: new Date().toLocaleString()
        }))

        userCart.map(index => deleteCartItemHandler(index._id, false));
        setUserCart([])
        setUserAddressIndex(-2);
        showNotif("Success", "Items are ready for delivery.");
        navigate("/checkout");
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
                    <h3 className="checkoutHeading3">Select Address</h3>

                    <div className="addressList checkoutAddressList">
                        {userAddressList.map(({address, addressIndex}) => (
                            <AddressCard address={address} addressIndex={addressIndex} key={addressIndex} />
                        ))}
                        
                    </div>
                </div>
            </div>}
        </div>
    </BoilerPlate>
}

export default Cart;