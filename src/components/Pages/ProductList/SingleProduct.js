import { useContext } from "react";
import { WishlistContext } from "../../Contexts/WishListContext";
import '../Cart/CartItem.css';
import { CartContext } from "../../Contexts/CartContexts";

const SingleProduct = (props) => {
    const {item} = props;
    const {title, author, price, imgLink, categoryName } = item;
    const { userCart, addToCartHandler, deleteCartItemHandler} = useContext(CartContext);
    const {userWishlist, addToWishlistHandler ,removeWishlistHandler } = useContext(WishlistContext)

    const presentInCart = userCart.find(({_id}) => item._id === _id) === undefined ? false : true;

    const presentInWishList = userWishlist.find(({_id}) => item._id === _id) === undefined ? false : true;

    return  <div className="cartItemCard">
        <img src= {imgLink} alt={title} className="cartItemImg" />
        <div className="cartItemRight"> 
            <div className="cartItemDetail">
                <span className="cartItemTitle">{title}</span>
                <span className="cartItemAuthor">{author}</span>
                <span className="cartCatName">{categoryName}</span>
            </div>
            <div className="cartItemQty">
                {   presentInCart ? 
                        <button className="cartWishlistBtn" onClick={()=>deleteCartItemHandler(item._id)} >Remove From Cart</button>
                    : 
                        <button className="cartWishlistBtn" onClick={()=>addToCartHandler(item)} >Add to Cart</button> }

                    {presentInWishList ? 
                        <button className="cartWishlistBtn" onClick={()=>removeWishlistHandler(item)} >Remove From Wishlist</button> 
                    : 
                        <button className="cartWishlistBtn" onClick={()=>addToWishlistHandler(item)}>Add to Wishlist</button>}
                </div>
            <div className="cartAmount">&#8377; {price}</div>
            
        </div>

</div>
}

export default SingleProduct;