import { createContext, useContext, useState } from "react";
import { ErrorContext } from "./ErrorContexts";
import { url } from "./AddressContexts";

export const ProductContext = createContext();


export const ProductProvider = ({children}) => {
    const { showNotif, setIsLoading } = useContext(ErrorContext);

    let initialFilters = {
        sortPrice: "none",
        minimumPrice: 10000,
        categoryCount: 0,
        ratingFilter: 0
    };

    let initialProductsData = {};

    const [ productList, setProductList ] = useState([]);
    const [ categoryArray, setCategoryArray ] = useState([])
    const [ filterCriteria, setFilterCriteria ] = useState(initialFilters);

    const getProductList = async() => {
        
        setIsLoading(true);
        try{
            
            const productResponse = await fetch(`${url}/api/products`,{
                method: "GET"
            });

            
            if(productResponse.status === 200){
                const receivedProducts = await productResponse.json();
                initialProductsData = receivedProducts.products;   
                
                setProductList(initialProductsData);
            }else{
                showNotif(`Issue`, `${productResponse.status}: Issue in fetching product list response.`);
            }

            const categoryArrayResponse = await fetch(`${url}/api/categories`,{
                method: "GET"
            });

            if(categoryArrayResponse.status === 200){
                const receivedCategory = await categoryArrayResponse.json();
                
                setCategoryArray(receivedCategory.categories);

                const categories = receivedCategory.categories.reduce((acc, category) => ({...acc, [category.categoryTitle]: false}), {});

                initialFilters = {...initialFilters, ...categories};

                setFilterCriteria(initialFilters);
            }
        }catch(error){
            showNotif(`Error`, `${error.status}: Error in fetching cart.`);
        }finally{
            setIsLoading(false);
        }
    }

    const priceSliderHandler = (minPriceValue) => {
        setFilterCriteria((prevState) => ({...prevState, minimumPrice: Number(minPriceValue)}))
    }

    const categoryChangeHandler = (categoryValue) => {
        setFilterCriteria((prevState) => (
            {...prevState, 
            [categoryValue]: !prevState[categoryValue],
            categoryCount: prevState[categoryValue] ? prevState.categoryCount - 1 : prevState.categoryCount + 1
            }
        ))
    }

    return <ProductContext.Provider value={{productList, filterCriteria, setFilterCriteria, categoryArray, initialFilters, getProductList, priceSliderHandler, categoryChangeHandler}}>
        {children}
    </ProductContext.Provider>
}