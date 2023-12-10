import { Link } from "react-router-dom";
import { CrossIcon, SearchIcon } from "../Icons";
import './SearchBar.css';
import { useContext, useState } from "react";
import { ProductContext } from "../../Contexts/ProductContexts";

const SearchBar = (props) => {

    const {productList} = useContext(ProductContext);
    const [ datalist, setDataList] = useState([])

    const inputArea = document.querySelector(".searchInput");
    const inputChangeHandler = (event) => {
        const searchText = event.target.value.trim().toLowerCase();
        
        if(searchText.length === 0){
            setDataList([]);
            return;
        }

        setDataList(productList.filter(({title, author}) => (
            title.toLowerCase().indexOf(searchText) !== -1 || author.toLowerCase().indexOf(searchText) !== -1 
            )))
        
    }

    const clearHandler = () => {
        setDataList([]);
        document.querySelector(".searchInput").value="";
    }

    const {placeholder } = props;
    return <div className="searchBar">
        <div className="searchInputs">
            <input type="text" className="searchInput" placeholder={placeholder} onChange={inputChangeHandler}/>

            {datalist.length === 0 && <SearchIcon className={"searchIcon"} />}
            {datalist.length > 0 && <Link onClick={clearHandler}><CrossIcon className={"searchIcon"} /></Link>}

        </div>
        {datalist.length > 0 && <div className="backdrop" onClick={()=>setDataList([])}/>}
        {datalist.length > 0 && inputArea.focus && <div className="dataResult">
            {
                datalist.map((value, index) => {
                    return <Link to={`/product/${value._id}`} className="searchItem" key={index}>
                        <p>{value.title} - {value.author}</p>
                    </Link> 
                })
            }
        </div>}

    </div>
}

export default SearchBar;
