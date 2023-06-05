import { useContext } from "react";
import { ProductContext } from "../../../Contexts/ProductContexts";
import './FilterPane.css';
import { DefaultButton } from "../../../Util/DefaultButton/AllButtons";

const FilterPane = (props) => {

    const { filterCriteria, setFilterCriteria, categoryArray, initialFilters, priceSliderHandler, categoryChangeHandler } = useContext(ProductContext);


    const minimumValue = props.minimumValue ?? 0, maximumValue = props.maximumValue ?? 10000, steps =props.steps ?? 2000;


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
                    <label htmlFor="sortHighToLow">Sort High To Low</label>
                </li>
                
            </ul>
        </div>

        <div className={`filterContainer  filterCriteriaActive`}>
            <div className={`filterLabel`}>Category</div>
            <ul>{
                    categoryArray.map(({categoryTitle}) => <li key={categoryTitle}>
                        <input type="checkbox" 
                            id={categoryTitle} 
                            value={categoryTitle} 
                            checked={filterCriteria[categoryTitle] || false} 
                            onChange={()=>
                                categoryChangeHandler(categoryTitle)
                            }
                            />
                        <label htmlFor={categoryTitle}>{categoryTitle}</label>
                    </li>)
                }
            </ul>
        </div>

        <div className={`filterContainer filterSortActive`}>
            <div className={`filterLabel`}>Filter by rating</div>
            <ul>
                
                <li>
                    <input 
                    type="radio" 
                    name="ratingFilter" 
                    id="FourAbove" 
                    className={`filterRadio`}
                    checked={filterCriteria.ratingFilter === 4 }
                    onChange={()=>setFilterCriteria(prevState => ({...prevState, ratingFilter: 4}))}/>
                    <label htmlFor="FourAbove">Four Stars and Above</label>
                </li>
                <li>
                    <input 
                    type="radio" 
                    name="ratingFilter" 
                    id="ThreeAbove" 
                    className={`filterRadio`}
                    checked={filterCriteria.ratingFilter === 3} 
                    onChange={()=>setFilterCriteria(prevState => ({...prevState, ratingFilter: 3}))}/>
                    <label htmlFor="ThreeAbove">Three Stars and Above</label>
                </li>
                <li>
                    <input 
                    type="radio" 
                    name="ratingFilter" 
                    id="TwoAbove" 
                    className={`filterRadio`}
                    checked={filterCriteria.ratingFilter === 2 }
                    onChange={()=>setFilterCriteria(prevState => ({...prevState, ratingFilter: 2}))}/>
                    <label htmlFor="TwoAbove">Two Stars and Above</label>
                </li>
                <li>
                    <input 
                    type="radio" 
                    name="ratingFilter" 
                    id="OneAbove" 
                    className={`filterRadio`}
                    checked={filterCriteria.ratingFilter === 1} 
                    onChange={()=>setFilterCriteria(prevState => ({...prevState, ratingFilter: 1}))}/>
                    <label htmlFor="OneAbove">One Star and Above</label>
                </li>
                
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