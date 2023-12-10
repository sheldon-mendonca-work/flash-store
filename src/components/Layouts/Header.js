import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContexts";

import './Header.css';

import { CartIcon, FlashIcon, LoginIcon, LogoutIcon, ProductListIcon, UserProfileIcon, WishlistIcon } from "../Util/Icons";
import SearchBar from "../Util/SearchBar/SearchBar";
import { CartContext } from "../Contexts/CartContexts";
import { WishlistContext } from "../Contexts/WishListContext";

const Header = () => {

    const {isLoggedIn, setIsLoggedIn, setValidateCreateUser} = useContext(AuthContext);

    const {userCart, setUserCart} = useContext(CartContext);
    const {userWishlist, setUserWishlist} = useContext(WishlistContext);
    
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("flashToken");
        localStorage.removeItem("flashEmail");
        localStorage.removeItem("flashPassword");
        setIsLoggedIn(false);
        setValidateCreateUser(false);
        setUserCart([]);
        setUserWishlist([]);
        navigate("/");
    }

    return <header className="header">
            <Link to="/" className="flash">
                <h1 className="flashHeading1">
                    <span className="flashText">Flash</span>
                    <FlashIcon className="flashIcon"/>
                </h1>
            </Link>

            <SearchBar placeholder={"Search for a book or an author..."} />

            <nav className="headerNav">
                <Link to="/products">
                    <ProductListIcon className={'headerNavProduct headerNavIcons'} />
                </Link>

                <Link to="/cart">
                    <div className="headerNavQty">
                        <CartIcon className={'headerNavCart headerNavIcons'} />
                        {userCart && userCart.length > 0 && <span className="headerQtyIcon">{userCart.length}</span>}
                    </div>
                </Link>

                <Link to="/wishlist">
                    <div className="headerNavQty">
                        <WishlistIcon className={`headerNavWishlist headerNavIcons`} />
                        {userWishlist && userWishlist.length > 0 && <span className="headerQtyIcon">{userWishlist.length}</span>}
                    </div>
                </Link>

                {isLoggedIn && 
                    <>
                        <Link to="/userProfile" >
                            <UserProfileIcon className={`userProfileIcon headerNavIcons`} />
                        </Link>
                        <Link onClick={logoutHandler}>
                            <LogoutIcon className={`headerNavLogout headerNavIcons`} />
                        </Link>
                    </>}

                {!isLoggedIn && 
                    <Link to="/login">
                        <LoginIcon className={`headerNavLogin headerNavIcons`} />
                    </Link>}
            </nav>
    </header>
}

export default Header;