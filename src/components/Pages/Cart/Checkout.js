import { useContext } from "react";
import BoilerPlate from "../../Layouts/BoilerPlate";
import { AddressContext } from "../../Contexts/AddressContexts";
import "./Cart.css";
import "./Checkout.css";
import '../UserProfile/UserProfile.css';
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import AddressCard from "./AddressCard";

const Checkout = () => {
    
    const { checkOutContent } = useContext(AddressContext);

    const navigate = useNavigate();

    const {checkoutItemQty, checkoutSubtotal} = checkOutContent.cart.reduce((acc, {qty, price}) => (
        {
            ...acc, checkoutItemQty: acc.checkoutItemQty + qty, 
            checkoutSubtotal: acc.checkoutSubtotal + (qty*price)
        }), {checkoutItemQty: 0, checkoutSubtotal: 0}) ;


    return <BoilerPlate>
        <div className="cartPage">
            
            {checkoutSubtotal === 0 && navigate("/products")}
            {checkoutItemQty !== 0 && <div className="cartContainer">
                
                <div className="cartPageLeft">
                    <h2 className="checkoutHeading2">Checkout - <span className={"success"}>Success</span></h2>
                    {/* <div className="cartPageTitles">
                        <div className="cartTitleLeft">Product</div>
                        <div className="cartTitleCenter">Quantity</div>
                        <div className="cartTitleCenter">Price</div>
                    </div> */}
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
                            <span>Delivered On</span>
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