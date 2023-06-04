import { useContext } from "react";
import { ProductContext } from "../../../Contexts/ProductContexts";
import styles from './ProductList.module.css';
import BoilerPlate from "../../../Layouts/BoilerPlate";
import ProductItem from "../ProductItem/ProductItem";
import FilterPane from "../FilterPane/FilterPane";

const ProductList = () => {

    const { productList,filterCriteria, categoryArray } = useContext(ProductContext);
        
    const getProducts = () => {

        if(productList === undefined || productList.products === undefined){
            return <h3 className={`${styles.heading3}`}>No Products Found</h3>
        }

        
        let filteredProducts = structuredClone(productList.products);
        
        
        if(filterCriteria.categoryCount !== 0){
            for(let category of categoryArray){
                if(filterCriteria[category] === true) {
                    filteredProducts = filteredProducts.filter(({categoryName}) => categoryName === category);
                }
            }
        }

        switch (filterCriteria.sortPrice) {
            case "sortLowToHigh":
                filteredProducts.sort((a,b) => a.price - b.price);
                break;

            case "sortHighToLow":
                filteredProducts.sort((a,b) => b.price - a.price);
                break;
        
            default:
                break;
        }

        filteredProducts = filteredProducts.filter(({price}) => price <= filterCriteria.minimumPrice);
        
        return <>
            {
                filteredProducts.map((item) => <ProductItem key={item._id} item={item}/>)
            }
        </>;
        
    }

    return <BoilerPlate>
        <section className={`${styles.productPage}`}>
            <FilterPane/>
            
            {<div className={`${styles.productContents}`}>
                
                <h2 className={`${styles.heading2}`}>All Products</h2>
                <div className={`${styles.productList}`}>
                {getProducts()}
                
                </div>
            </div>}
        </section>
    </BoilerPlate>
}

export default ProductList;