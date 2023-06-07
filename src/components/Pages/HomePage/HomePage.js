import { Link, useNavigate } from "react-router-dom";
import BoilerPlate from "../../Layouts/BoilerPlate";
import './HomePage.css';
import { ProductContext } from "../../Contexts/ProductContexts";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContexts";

const HomePage = () => {
    
    const { categoryChangeHandler, categoryArray, setFilterCriteria, initialFilters } = useContext(ProductContext);
    const {isLoggedIn} = useContext(AuthContext);
    useEffect(()=>{
        window.scrollTo(0, 0);
        setFilterCriteria(initialFilters);// eslint-disable-next-line
    }, [])

    const navigate = useNavigate();

    const homeCategoryHandler = (categoryTitle) => {
        categoryChangeHandler(categoryTitle);
        navigate('/products');
        return;
    }

    return <BoilerPlate>
        
        <section className={`homeMain`}>
            <div className={`homeIntro`}>
                <h2 className={`homeIntroMain`}>Flash</h2>
                <p className={`homeIntroSub`}>Book deliveries done fast</p>
            </div>
        </section>

        <section className={`homeDetails`}>
            <div className={`productDetailsLeft`}>
                <div className={`detailBox`}>
                    <p className={`productDetailsTitle`}>The Best Books</p>
                    <p className={`productDetailDesc`}>Over 1000 books from various best sellers delivered right at your <span>doorstep</span></p>
                    <Link to="/products">
                        <button className={`productDetailButton`}>
                            Collection &rarr;
                        </button>
                    </Link>
                </div>
            </div>
            <div className={`productDetailsRight`}>
                <div className={`wishlistCard`}>
                <div className={`detailBox`}>
                    <p className={`productDetailsTitle`}>Love it? Add it.</p>
                    <p className={`productDetailDesc`}>Over 1000 books from various best sellers delivered right at your <span>doorstep</span></p>
                    <Link to="/wishlist">
                        <button className={`productDetailButton`}>
                            Wishlist &rarr;
                        </button>
                    </Link>
                    </div>
                </div>
                <div className={`userLoginCard`}>
                    <div className={`detailBox`}>
                        <p className={`productDetailsTitle`}>Interested?</p>
                        <p className={`productDetailDesc`}>Over 1000 books from various best sellers delivered right at your <span>doorstep</span></p>
                        { isLoggedIn ?
                            <Link to="/cart">
                                <button className={`productDetailButton`}>
                                    Cart &rarr;
                                </button>
                            </Link>
                        
                        :
                            <Link to="/login">
                                <button className={`productDetailButton`}>
                                    Login &rarr;
                                </button>
                            </Link>
                        }
                    </div>
                </div>
            </div>

        </section>

        <section className={`homeCategorySection`}>
            <h3 className={`homeCategoryTitle`}>Categories</h3>
            <ul className={`homeCategoryList`}>
                { categoryArray.map(({categoryTitle, description, _id})=>{
                    return <li key={_id} className="homeCategoryItem">
                        <div className={`categoryDetailBox`}>
                            <div className={`categoryDetailDesc`}>{description}</div>
                            <button className={`productDetailButton`} value={categoryTitle} onClick={()=>homeCategoryHandler(categoryTitle)}>{categoryTitle}</button>
                        </div>
                    </li>
                })}
            </ul>
        </section>
    </BoilerPlate>
}

export default HomePage;