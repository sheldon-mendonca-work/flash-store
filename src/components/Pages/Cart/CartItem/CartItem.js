import { useContext } from "react";
import { CartContext } from "../../../Contexts/CartContexts";
import { WishlistContext } from "../../../Contexts/WishListContext";
import './CartItem.css';
import { CrossIcon } from "../../../Util/Icons";
import { Link } from "react-router-dom";

const CartItem = (props) => {
    const {item, showUpdateQty=true} = props;
    const {productId,title, author, price, imgLink,quantity, categoryName } = item;

    const { changeQtyHandler, deleteCartItemHandler } = useContext(CartContext)
    const { userWishlist, removeWishlistHandler,addToWishlistHandler } = useContext(WishlistContext)

    const presentInWishList = userWishlist.find(({productId}) => item.productId === productId) === undefined ? false : true;

    return  <div className="cartItemCard">
            <img src= {imgLink ?? ""} alt={title ?? ""} className="cartItemImg" />
        <div className="cartItemRight"> 
            <div className="cartItemDetail">
                <span className="cartItemTitle">{title ?? ""}</span>
                <span className="cartItemAuthor">{author ?? ""}</span>
                <span className="cartCatName">{categoryName?.join(',') ?? ""}</span>
            </div>
            <div className="cartItemQty">
                    <div className="cartQtyChange">
                    {showUpdateQty && <button 
                    onClick={()=>changeQtyHandler(productId,"decrement",quantity)} 
                    className="changeQtyBtn">-</button>}
                    <span className="changeQty">{quantity}</span>
                    {showUpdateQty && <button 
                    onClick={()=>changeQtyHandler(productId,"increment",quantity)}
                    className="changeQtyBtn">+</button>}
                </div>
                {presentInWishList ? 
                    <button className="cartWishlistBtn" onClick={()=>removeWishlistHandler(item)} >Remove From Wishlist</button> 
                : 
                    <button className="cartWishlistBtn" onClick={()=>addToWishlistHandler(item)}>Add to Wishlist</button>}
                
            </div>
            <div className="cartAmount">&#8377; {quantity*price}</div>
            
        </div>
        
        {showUpdateQty && <Link onClick={()=>deleteCartItemHandler(productId)}><CrossIcon  className="cartRemove" /></Link>}
    </div>
}

export default CartItem;