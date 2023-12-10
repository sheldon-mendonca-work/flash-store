import { useContext, useEffect } from "react";
import BoilerPlate from "../../../Layouts/BoilerPlate";
import { AddressContext } from "../../../Contexts/AddressContexts";
import "../Cart/Cart.css";
import "./Checkout.css";
import '../../UserProfile/UserProfile.css';
import CartItem from "../CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import AddressCard from "../Address/AddressCard";

const Checkout = () => {
    
    const { checkOutContent } = useContext(AddressContext);

    const navigate = useNavigate();
    console.log(checkOutContent)
    const {checkoutItemQty, checkoutSubtotal} = checkOutContent.cart.reduce((acc, {quantity, price}) => (
        {
            ...acc, checkoutItemQty: acc.checkoutItemQty + quantity, 
            checkoutSubtotal: acc.checkoutSubtotal + (quantity*price)
        }), {checkoutItemQty: 0, checkoutSubtotal: 0}) ;

    useEffect(()=>{
        if(checkoutSubtotal === 0){
            navigate("/products")
        }// eslint-disable-next-line
    }, [])

    return <BoilerPlate>
        <div className="cartPage">

            {checkoutItemQty !== 0 && <div className="cartContainer">
                
                <div className="cartPageLeft">
                    <h2 className="checkoutHeading2">Checkout - <span className={"success"}>Success</span></h2>
                    {
                    checkOutContent.cart.map(item => <CartItem key={item._id} item={item} showUpdateQty={false}/>)
                    }
                </div>
                <div className="cartPageRight">
                    <div className="checkoutCard">
                        <div className="checkoutTitleDiv">
                            <span>Last Order</span>
                            <span>{checkoutItemQty} {checkoutItemQty > 1 ? "Items": "Item"}</span>
                        </div>
                        <div>
                            <span>Order placed on</span>
                            <span>{checkOutContent.lastDelivery}</span>
                        </div>
                        <div>
                            <span>Subtotal</span>
                            <span>&#8377;  {checkoutSubtotal}</span>
                        </div>
                        <div className="checkoutTotalDiv">
                            <span>Total</span>
                            <span>&#8377;  {checkoutSubtotal}</span>
                        </div>
                    </div>
                    <div>
                    <h3 className="checkoutTitle">Delivery Address</h3>
                    <div className="addressList checkoutAddressList">
                        <AddressCard address={checkOutContent.address} addressIndex={-2} showAddressRadio={false} />
                        
                    </div>
                    </div>
                </div>
            </div>}
        </div>
    </BoilerPlate>
}

export default Checkout;