import { useContext } from "react";
import { CartContext } from "../../../Contexts/CartContexts";
import { WishlistContext } from "../../../Contexts/WishListContext";
import { WishListAddIcon } from "../../../Util/Icons";
import './ProductItem.css';
import {DefaultButton} from "../../../Util/DefaultButton/AllButtons";
import { Link, useNavigate } from "react-router-dom";

const defaultImgLink = "./images/STK-20230425-WA0005.jpg";

const ProductItem = (props) => {
    const {item, fromWishList} = props;
    const {_id, title, author, rating, price, imgLink} = item;
    
    const { userCart, updateQtyHandler, addToCartHandler } = useContext(CartContext); 
    
    const { userWishlist, addToWishlistHandler, removeWishlistHandler } = useContext(WishlistContext)

    const navigate = useNavigate();
    const cartPresentItem = userCart.find(({_id}) => item._id === _id);
    const presentInCart =  cartPresentItem === undefined ? false : true;

    const presentInWishList = userWishlist.find(({_id}) => item._id === _id) === undefined ? false : true;
    const getCartButton = (presentInCart, fromWishList) => {
        
        if(fromWishList === true && presentInCart){
            return <DefaultButton className={`addCartItem`} onClick={()=>updateQtyHandler(item._id, "increment")}>
                Increase quantity to {cartPresentItem.qty+1}
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
            <Link onClick={()=>removeWishlistHandler(item)} className={`wishListIcon`}>
                <WishListAddIcon className={`wishListAddIcon presentWishlist`}/>
            </Link>
        : 
            <Link onClick={()=>addToWishlistHandler(item)} className={`wishListIcon`}>
                <WishListAddIcon className={`wishListAddIcon`}/>
            </Link>
    }

    return (<div className={`productCard`} >
        <div className="productCardImgDiv">
            <img src= {imgLink ?? defaultImgLink} alt={title} className={`productCardImg`} onClick={()=>navigate(`/product/${_id}`)}/>
        </div>
        <div className="productCardContent">
            <span onClick={()=>navigate(`/product/${_id}`)}>
                <p className={`productCardTitle`}>{title}</p>
        
                <p className={`productCardAuthor`}>{author}</p>
                <p className={`productCardPrice`}>&#8377; {price}</p>
                <p className={`productCardRating`}><span>{rating} ★</span></p>
            </span>
            { getCartButton(presentInCart, fromWishList) }
            { getWishlistButton(presentInWishList) }
        </div>
            
        
        
        
    </div>)
}

export default ProductItem;