import { Link } from "react-router-dom";
import BoilerPlate from "../../Layouts/BoilerPlate";
import styles from './HomePage.module.css';

const HomePage = () => {
    return <BoilerPlate>
        
        <section className={`${styles.homeMain}`}>
            <div className={`${styles.homeIntro}`}>
                <h2 className={`${styles.homeIntroMain}`}>Flash</h2>
                <p className={`${styles.homeIntroSub}`}>Book deliveries done fast</p>
            </div>
        </section>

        <section className={`${styles.homeDetails}`}>
            <div className={`${styles.productDetailsLeft}`}>
                <div className={`${styles.detailBox}`}>
                    <p className={`${styles.productDetailsTitle}`}>The Best Books</p>
                    {/* <p className={`${styles.productDetailDesc}`}>Over 1000 books from various best sellers delivered right at your <span>doorstep</span></p> */}
                    <Link to="/products">
                        <button className={`${styles.productDetailButton}`}>
                            Collection &rarr;
                        </button>
                    </Link>
                </div>
            </div>
            <div className={`${styles.productDetailsRight}`}>
                <div className={`${styles.wishlistCard}`}>
                <div className={`${styles.detailBox}`}>
                    <p className={`${styles.productDetailsTitle}`}>Love it? Add it.</p>
                    {/* <p className={`${styles.productDetailDesc}`}>Over 1000 books from various best sellers delivered right at your <span>doorstep</span></p> */}
                    <Link to="/wishlist">
                        <button className={`${styles.productDetailButton}`}>
                            Wishlist &rarr;
                        </button>
                    </Link>
                    </div>
                </div>
                <div className={`${styles.userLoginCard}`}>
                    <div className={`${styles.detailBox}`}>
                        <p className={`${styles.productDetailsTitle}`}>Interested?</p>
                        {/* <p className={`${styles.productDetailDesc}`}>Over 1000 books from various best sellers delivered right at your <span>doorstep</span></p> */}
                        <Link to="/login">
                            <button className={`${styles.productDetailButton}`}>
                                Login &rarr;
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

        </section>
    </BoilerPlate>
}

export default HomePage;