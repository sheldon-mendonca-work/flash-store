import Header from './Header';
import Footer from './Footer';
import styles from './BoilerPlate.module.css';
import Notifications from '../Util/Notifications/Notfications';
import { useContext } from 'react';
import { ErrorContext } from '../Contexts/ErrorContexts';
import LoaderPage from './LoaderPage';

const BoilerPlate = ({children}) => {
    const { isLoading } = useContext(ErrorContext);

    return <div className={`${styles.boilerPlate}`}>
        <Header />
            <Notifications />
            {isLoading && <LoaderPage />}
            
            <main className={`${styles.mainContent}`}>
            {children}
            </main>
        <Footer />
    </div>
};

export default BoilerPlate;