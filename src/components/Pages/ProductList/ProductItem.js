import { useContext } from "react";
import { CartContext } from "../../Contexts/CartContexts";
import { WishlistContext } from "../../Contexts/WishListContext";
import { WishListAddIcon } from "../../Util/Icons";
import styles from './ProductItem.module.css';
import {DefaultButton} from "../../Util/DefaultButton/AllButtons";
import { Link, useNavigate } from "react-router-dom";

const defaultImgLink = "./images/STK-20230425-WA0005.jpg";

const ProductItem = (props) => {
    const {item} = props;
    const {_id, title, author, price, imgLink} = item;
    
    const { userCart, addToCartHandler, deleteCartItemHandler} = useContext(CartContext); 
    
    const { userWishlist, addToWishlistHandler, removeWishlistHandler } = useContext(WishlistContext)

    const navigate = useNavigate();

    const presentInCart = userCart.find(({_id}) => item._id === _id) === undefined ? false : true;

    const presentInWishList = userWishlist.find(({_id}) => item._id === _id) === undefined ? false : true;

    const getCartButton = (presentInCart) => {
        return presentInCart ? 
                    <DefaultButton className={`${styles.removeCartItem}`} onClick={()=>deleteCartItemHandler(item._id)}>
                        Remove From Cart
                    </DefaultButton>
            : 
                    <DefaultButton className={`${styles.addCartItem}`} onClick={()=>addToCartHandler(item)}>
                        Add to Cart
                    </DefaultButton>
    }

    const getWishlistButton = (presentInWishList) => {
        return presentInWishList ? 
            <Link onClick={()=>removeWishlistHandler(item)} className={`${styles.wishListIcon}`}>
                <WishListAddIcon className={`${styles.wishListAddIcon} ${styles.presentWishlist}`}/>
            </Link>
        : 
            <Link onClick={()=>addToWishlistHandler(item)} className={`${styles.wishListIcon}`}>
                <WishListAddIcon className={`${styles.wishListAddIcon}`}/>
            </Link>
    }

    return (<div className={`${styles.productCard}`} >
        
        <img src= {imgLink ?? defaultImgLink} alt={title} className={`${styles.productCardImg}`} onClick={()=>navigate(`/product/${_id}`)}/>
        <div>
            <span onClick={()=>navigate(`/product/${_id}`)}>
                <p className={`${styles.productCardTitle}`}>{title}</p>
        
                <p className={`${styles.productCardAuthor}`}>{author}</p>
                <p className={`${styles.productCardPrice}`}>&#8377; {price}</p>
            </span>
            { getCartButton(presentInCart) }
            { getWishlistButton(presentInWishList) }
        </div>
            
        
        
        
    </div>)
}

export default ProductItem;