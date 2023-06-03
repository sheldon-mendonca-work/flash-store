import { useNavigate, useParams } from "react-router-dom"
import BoilerPlate from "../../Layouts/BoilerPlate";
import { useContext } from "react";
import { ProductContext } from "../../Contexts/ProductContexts";
import '../Wishlist/Wishlist.css';
import SingleProduct from "./SingleProduct";

export default function ProductLandscape(){

    const navigate = useNavigate();
    const { productList } = useContext(ProductContext);
    const {productId} = useParams();
    
    let item={title: "Not found"};
    
    if(productList && productList.products){
        item = productList.products.find(({_id}) => _id === productId) ?? {title: "Not found"}
    }

    return <BoilerPlate>
        <div className="wishlistPage">
            <h2 className="heading2">{item.title}</h2>
            {item.title === "Not found" ? navigate("/error") : <SingleProduct item={item}/>}
        </div>
    </BoilerPlate>
}