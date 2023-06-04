import { useContext } from "react";
import BoilerPlate from "../../Layouts/BoilerPlate";
import { WishlistContext } from "../../Contexts/WishListContext";
import './Wishlist.css';
import { Link } from "react-router-dom";
import ProductItem from "../Product/ProductItem/ProductItem";

const Wishlist = () => {    
    const {userWishlist} = useContext(WishlistContext)
    
    return <BoilerPlate>
        <div className="wishlistPage">
            <h2 className="heading2">Wishlist {userWishlist.length !== 0 && `(${userWishlist.length})`}</h2>
            {userWishlist.length === 0 && <div className="noCart">No items present in wishlist. View our catalogue <Link to="/products">here.</Link></div>}
            {
                userWishlist.length !== 0 && 
                <div className="wishlistContainer">
                    {
                        userWishlist.map(item => <ProductItem key={item._id} item={item}/>)
                    }
                </div>
            }
        </div>
    </BoilerPlate>
}


// {
//     userWishlist === undefined ? <div>No Products in Wishlist</div>: 
//     userWishlist.map(item => <WishListItem key={item._id} item={item}/>)
// }

export default Wishlist;