import { createContext, useContext, useState } from "react";
import { ErrorContext } from "./ErrorContexts";

export const ProductContext = createContext();


export const ProductProvider = ({children}) => {
    const { showNotif, setIsLoading } = useContext(ErrorContext);

    let initialFilters = {
        sortPrice: "none",
        minimumPrice: 10000,
        categoryCount: 0
    };

    let initialProductsData = {};

    const [ productList, setProductList ] = useState([]);
    const [ categoryArray, setCategoryArray ] = useState([])
    const [ filterCriteria, setFilterCriteria ] = useState(initialFilters);

    const getProductList = async() => {
        
        setIsLoading(true);
        try{
            const productResponse = await fetch("/api/products",{
                method: "GET"
            });
            
            if(productResponse.status === 200){
                const receivedProducts = await productResponse.json();
                
                initialProductsData = receivedProducts;
                setProductList(initialProductsData);
            }else{
                showNotif(`Issue`, `${productResponse.status}: Issue in fetching product list response.`);
            }

            const categoryArrayResponse = await fetch("/api/categories",{
                method: "GET"
            });
            if(categoryArrayResponse.status === 200){
                const receivedCategory = await categoryArrayResponse.json();
                
                setCategoryArray(receivedCategory.categories.map(({categoryName}) => categoryName));

                const categories = receivedCategory.categories.reduce((acc, {categoryName}) => ({...acc, [categoryName]: false}), {});
                
                initialFilters = {...initialFilters, ...categories};

                setFilterCriteria(initialFilters);
            }
        }catch(error){
            showNotif(`Error`, `${error.status}: Error in fetching cart.`);
        }finally{
            setIsLoading(false);
        }
    }

    return <ProductContext.Provider value={{productList, filterCriteria, setFilterCriteria, categoryArray, initialFilters, getProductList}}>
        {children}
    </ProductContext.Provider>
}

