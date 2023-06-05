import { useContext } from "react";
import { WishlistContext } from "../../../Contexts/WishListContext";
import './SingleItem.css';
import { CartContext } from "../../../Contexts/CartContexts";

const SingleItem = (props) => {
    const {item} = props;
    const {title, author, price, description, rating, imgLink } = item;
    const { userCart, addToCartHandler, deleteCartItemHandler} = useContext(CartContext);
    const {userWishlist, addToWishlistHandler ,removeWishlistHandler } = useContext(WishlistContext)

    const presentInCart = userCart.find(({_id}) => item._id === _id) === undefined ? false : true;

    const presentInWishList = userWishlist.find(({_id}) => item._id === _id) === undefined ? false : true;

    return  <div className="singleItemCard">
        <img src= {imgLink} alt={title} className="singleItemImg" />
        <div className="singleItemRight"> 
            <div className="singleItemDetail">
                <span className="singleItemTitle">{title}</span>
                <span className="singleItemAuthor">{author}</span>
                <span className="singleCatName">{description}</span>
                <span className="singleRating"><span>{rating} ★</span></span>
            </div>
            <div className="singleItemQty">
                {   presentInCart ? 
                        <button className="singleWishlistBtn" onClick={()=>deleteCartItemHandler(item._id)} >Remove From Cart</button>
                    : 
                        <button className="singleWishlistBtn" onClick={()=>addToCartHandler(item)} >Add to Cart</button> }

                    {presentInWishList ? 
                        <button className="singleWishlistBtn" onClick={()=>removeWishlistHandler(item)} >Remove From Wishlist</button> 
                    : 
                        <button className="singleWishlistBtn" onClick={()=>addToWishlistHandler(item)}>Add to Wishlist</button>}
                </div>
            <div className="singleAmount">&#8377; {price}</div>
            
        </div>

</div>
}

export default SingleItem;