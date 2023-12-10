import { useContext } from "react";
import { CartContext } from "../../../Contexts/CartContexts";
import { WishlistContext } from "../../../Contexts/WishListContext";
import { WishListAddIcon } from "../../../Util/Icons";
import './ProductItem.css';
import {DefaultButton} from "../../../Util/DefaultButton/AllButtons";
import { useNavigate } from "react-router-dom";

const defaultImgLink = "./images/STK-20230425-WA0005.jpg";

const ProductItem = (props) => {
    const {item, fromWishList} = props;
    const {productId, title, author, rating, price, imgLink} = item;
    
    const { userCart, updateQtyHandler, addToCartHandler } = useContext(CartContext); 
    
    const { userWishlist, addToWishlistHandler, removeWishlistHandler } = useContext(WishlistContext)

    const navigate = useNavigate();
    
    const cartPresentItem = userCart?.find(({productId}) => item._id === productId || item.productId === productId);
    
    const presentInCart =  cartPresentItem === undefined ? false : true;

    const presentInWishList = userWishlist?.find(({productId}) => item.productId === productId || item._id === productId) === undefined ? false : true;

    const getCartButton = (presentInCart, fromWishList) => {
        
        if(fromWishList === true && presentInCart){
            return <DefaultButton className={`addCartItem`} onClick={()=>updateQtyHandler(item.productId, "increment")}>
                Increase quantity to {cartPresentItem.quantity+1}
            </DefaultButton>
            
        }
        
        return presentInCart ? 
                    <DefaultButton className={`removeCartItem`} onClick={()=>navigate("/cart")}>
                        Go to Cart
                    </DefaultButton>
            : 
                    <DefaultButton className={`addCartItem`} onClick={()=>addToCartHandler(item)}>
                        Add to Cart
                    </DefaultButton>
    }

    const getWishlistButton = (presentInWishList) => {
        return presentInWishList ? 
            <span onClick={()=>removeWishlistHandler(item)} className={`wishListIcon`}>
                <WishListAddIcon className={`wishListAddIcon presentWishlist`}/>
            </span>
        : 
            <span onClick={()=>addToWishlistHandler(item)} className={`wishListIcon`}>
                <WishListAddIcon className={`wishListAddIcon`}/>
            </span>
    }

    return (<div className={`productCard`} >
        <div className="productCardImgDiv">
            <img src= {imgLink ?? defaultImgLink} alt={title} className={`productCardImg`} onClick={()=>navigate(`/product/${productId}`)}/>
        </div>
        <div className="productCardContent">
            <span onClick={()=>navigate(`/product/${productId}`)}>
                <p className={`productCardTitle`}>{title}</p>
        
                <p className={`productCardAuthor`}>{author}</p>
                <p className={`productCardPrice`}>&#8377; {price}</p>
                <p className={`productCardRating`}><span>{rating.toFixed(2) ?? ""} ★</span></p>
            </span>
            { getCartButton(presentInCart, fromWishList) }
            { getWishlistButton(presentInWishList) }
        </div>
            
        
        
        
    </div>)
}

export default ProductItem;