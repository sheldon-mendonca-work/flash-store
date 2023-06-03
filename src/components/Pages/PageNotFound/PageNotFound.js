import { Link } from "react-router-dom";
import BoilerPlate from "../../Layouts/BoilerPlate";
import './PageNotFound.css'

const PageNotFound = () => {
    return <BoilerPlate>
        <div className="notFoundContainer">
            <div className="containerLeft">
                <img src={"images/2456052.jpg"} alt={"Page Not Found"} className="containerLeftImg" />
            </div>
            <div className="containerRight">
                <h2>Error 404 : Page Not Found</h2>
                <p>Looks like the page/item you are looking for was not found. Go to <Link to="/" className="notFoundLink">Home Page instead?</Link></p>
            </div>
        </div>
    </BoilerPlate>
}

export default PageNotFound;