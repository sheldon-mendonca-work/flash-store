import { Navigate, Route, Routes } from "react-router-dom";
import Mockman from "mockman-js";
import RequiresAuth from "./RequiresAuth";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContexts";
import HomePage from "../Pages/HomePage/HomePage";
import ProductList from "../Pages/Product/ProductList/ProductList";
import ProductLandscape from "../Pages/Product/ProductLandscape/ProductLandscape";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import Cart from "../Pages/Cart/Cart/Cart";
import Wishlist from "../Pages/Wishlist/Wishlist";
import UserProfile from "../Pages/UserProfile/UserProfile";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Checkout from "../Pages/Cart/Checkout/Checkout";
import AddAddress from "../Pages/SignUp/AddAddress";


const AllRoutes = () => {

    const {validateCreateUser} = useContext(AuthContext);

    return <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:productId" element={<ProductLandscape />} />
        <Route path="/product/*" element={<PageNotFound />} />
        <Route path="/cart" element={<RequiresAuth><Cart /></RequiresAuth>} />
        <Route path="/wishlist" element={<RequiresAuth><Wishlist /></RequiresAuth>} />
        <Route path="/userProfile" element={<RequiresAuth><UserProfile /></RequiresAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/checkout" element={<RequiresAuth><Checkout /></RequiresAuth>} />
        <Route path="/signUpAddress" 
            element={validateCreateUser ? <AddAddress /> : <Navigate to="/signup" />} />
        
        <Route path="/mockman" element={<Mockman />} />
        <Route path="*" element={<PageNotFound />} />
    </Routes>
}

export default AllRoutes;