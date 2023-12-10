import { useNavigate, useParams } from "react-router-dom"
import BoilerPlate from "../../../Layouts/BoilerPlate";
import { useContext, useEffect } from "react";
import { ProductContext } from "../../../Contexts/ProductContexts";
import '../../Wishlist/Wishlist.css';
import SingleItem from "../SingleItem/SingleItem";

export default function ProductLandscape(){

    const navigate = useNavigate();
    const { productList } = useContext(ProductContext);
    const { productId } = useParams();
    
    let item={title: "Not found"};
    
    if(productList && productList){
        item = productList.find(({_id}) => _id === productId) ?? {title: "Not found"}
    }

    useEffect(()=>{
        if(productList.length){
            if(item.title === "Not found"){
                navigate("/error")
            }
        }// eslint-disable-next-line
    }, [productList])

    return <BoilerPlate>
        <div className="wishlistPage">
            <h2 className="heading2">{item?.title}</h2>
            <SingleItem item={item}/>
        </div>
    </BoilerPlate>
}