import { useContext } from "react";
import { ProductContext } from "../../../Contexts/ProductContexts";
import './FilterPane.css';
import { DefaultButton } from "../../../Util/DefaultButton/AllButtons";

const FilterPane = (props) => {

    const { filterCriteria, setFilterCriteria, categoryArray, initialFilters } = useContext(ProductContext);


    const minimumValue = props.minimumValue ?? 0, maximumValue = props.maximumValue ?? 10000, steps =props.steps ?? 2000;


    const priceSliderHandler = (minPriceValue) => {
        setFilterCriteria((prevState) => ({...prevState, minimumPrice: Number(minPriceValue)}))
    }

    const categoryChangeHandler = (categoryValue) => {
        setFilterCriteria((prevState) => (
            {...prevState, 
            [categoryValue]: !prevState[categoryValue],
            categoryCount: prevState[categoryValue] ? prevState.categoryCount + 1 : prevState.categoryCount - 1
            }
        ))
    }

    const showMinimizedFilter = (typeName) => {
        
        let toggle = false;
        if(typeName !== "filterBackdrop"){
            toggle = document.querySelectorAll(typeName)[1].style.display === "flex";
        }
        

        document.querySelectorAll(".filterCriteriaActive").forEach(item =>item.style.display = "none");
        document.querySelectorAll(".filterSortActive").forEach(item =>item.style.display = "none");
        
        if(toggle || typeName === "filterBackdrop"){
            document.querySelector(".filterBackdrop").style.display = "none";
            return;
        }

        document.querySelector(".filterBackdrop").style.display = "inline";
        document.querySelectorAll(typeName).forEach(item =>item.style.display = "flex");

    }

    const resetFilterCriteriaHandler = () => {
        
        setFilterCriteria(initialFilters);
    }

    return <><div className={`filterPane`}>

        <div className={`filterSet filterCriteriaActive filterSortActive`}>
            <div className={`filterTitle`}>Filters</div>
            <button onClick={()=>resetFilterCriteriaHandler()} className={`filterClear`}>Clear All</button>
        </div>
        
        <div className={`filterContainer filterCriteriaActive`}>
            
            <label htmlFor="fader" className={`filterLabel`}>Maximum Price</label>

            <div className={`filterSlider`}>
                
                <input type="range" min={minimumValue} max={maximumValue} id="fader" step={steps} list="volsettings" value={filterCriteria.minimumPrice} onChange={event => priceSliderHandler(event.target.value)} className={`filterSliderInput`}/>

                <div className={`filterSliderTags`}>
                    <span>{minimumValue}</span>
                    <span>{maximumValue}</span>
                </div>
                <datalist id="volsettings">  
                    <option value={0}>0</option>          
                    <option value={2000}>2000</option>
                    <option value={4000}>4000</option>
                    <option value={6000}>6000</option>
                    <option value={8000}>8000</option>
                    <option value={10000}>10000</option>
                </datalist>
            </div>

            
        </div>

        <div className={`filterContainer filterSortActive`}>
            <div className={`filterLabel`}>Sort by price</div>
            <ul>
                
                <li>
                    <input 
                    type="radio" 
                    name="sortPrice" 
                    id="sortLowToHigh" 
                    className={`filterRadio`}
                    checked={filterCriteria.sortPrice === "sortLowToHigh" }
                    onChange={()=>setFilterCriteria(prevState => ({...prevState, sortPrice: "sortLowToHigh"}))}/>
                    <label htmlFor="sortLowToHigh">Sort Low To High</label>
                </li>
                <li>
                    <input 
                    type="radio" 
                    name="sortPrice" 
                    id="sortHighToLow" 
                    className={`filterRadio`}
                    checked={filterCriteria.sortPrice === "sortHighToLow"} 
                    onChange={()=>setFilterCriteria(prevState => ({...prevState, sortPrice: "sortHighToLow"}))}/>
                    <label htmlFor="sortHighToLow">Sort Low To High</label>
                </li>
                
            </ul>
        </div>

        <div className={`filterContainer  filterCriteriaActive`}>
            <div className={`filterLabel`}>Category</div>
            <ul>{
                    categoryArray.map(item => <li key={item}>
                        <input type="checkbox" 
                            id={item} 
                            value={item} 
                            checked={filterCriteria[item] || false} 
                            onChange={()=>
                                categoryChangeHandler(item)
                            }
                            />
                        <label htmlFor={item}>{item}</label>
                    </li>)
                }
            </ul>
        </div>

        <div className={`filterButtonLower`}>
            <DefaultButton onClick={()=>showMinimizedFilter(".filterCriteriaActive")}>Filter</DefaultButton>
            <DefaultButton onClick={()=>showMinimizedFilter(".filterSortActive")}>Sort</DefaultButton>
        </div>
    </div>
    <div className="filterBackdrop" onClick={()=>showMinimizedFilter("filterBackdrop")} />
    </>
}

export default FilterPane;