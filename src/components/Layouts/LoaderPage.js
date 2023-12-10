import './Loader.css';

export default function LoaderPage(){

    return <div className="loaderPage">
        <div className='loader'>
            <div className="loaderRing"></div>
            <span className='loaderContent'>Loading...</span>
        </div>
    </div>
}