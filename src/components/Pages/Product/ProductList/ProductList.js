import { useContext, useEffect } from "react";
import { ProductContext } from "../../../Contexts/ProductContexts";
import styles from './ProductList.module.css';
import BoilerPlate from "../../../Layouts/BoilerPlate";
import ProductItem from "../ProductItem/ProductItem";
import FilterPane from "../FilterPane/FilterPane";

const ProductList = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])

    const { productList,filterCriteria } = useContext(ProductContext);
    // const { categoryArray } = useContext(ProductContext);
        
    const getProducts = () => {

        if(productList === undefined || productList.products === undefined){
            return <h3 className={`${styles.heading3}`}>No Products Found</h3>
        }

        
        let filteredProducts = structuredClone(productList.products);
        
        //AND filtering
        // if(filterCriteria.categoryCount !== 0){
        //     for(let {categoryTitle} of categoryArray){
        //         if(filterCriteria[categoryTitle] === true) {
        //             filteredProducts = filteredProducts.filter(({categoryName}) => categoryName.indexOf(categoryTitle) !== -1);
        //         }
        //     }
        // }

        //OR filtering
        if(filterCriteria.categoryCount !== 0){
            const newFilterProducts = [];
            for(let product of filteredProducts){
                for(let cat of product.categoryName){
                    if(filterCriteria[cat] === true)
                    newFilterProducts.push(product);
                    break;
                }
            }
            filteredProducts = structuredClone(newFilterProducts);
        }

        filteredProducts = filteredProducts.filter(({rating}) => (rating >= filterCriteria.ratingFilter))

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
                
                <h2 className={`${styles.heading2}`}  autoFocus>All Products</h2>
                <div className={`${styles.productList}`}>
                {getProducts()}
                
                </div>
            </div>}
        </section>
    </BoilerPlate>
}

export default ProductList;