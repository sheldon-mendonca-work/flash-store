
import styles from './Footer.module.css';
import { GitHubIcon, LinkedInIcon, MailIcon } from '../Util/Icons';
import { useContext } from 'react';
import { ErrorContext } from '../Contexts/ErrorContexts';

const Footer = () => {
    const {showNotif} = useContext(ErrorContext);

    const copyClipboardClickHandler = async () => {
        try {
            await navigator.clipboard.writeText("sheldonmendoncawork123@gmail.com");
            showNotif('Success', 'Content copied to clipboard');
        } catch (err) {
            showNotif('Error', ''`Failed to copy: ${err}`);
        }
    }

    return <footer className={`${styles.footer}`}>
        <ul className={`${styles.footerLinks}`}>
            <div className={`${styles.footerContact}`}>Contact</div>
        
            <li >
                <a href="https://github.com/sheldon-mendonca-work" 
                target="_blank" rel="noreferrer noopener">
                    <GitHubIcon className={`${styles.footerNavIcon}`} />
                </a>
            </li>
            <li >
                <div onClick={copyClipboardClickHandler}>
                    <MailIcon className={`${styles.footerNavIcon}`}/>
                </div>
            </li>
            <li >
                <a href="https://in.linkedin.com/in/sheldon-mendonca" target="_blank" rel="noreferrer noopener">
                    <LinkedInIcon className={`${styles.footerNavIcon}`}/>
                </a>
            </li>
        </ul>
        <p  className={`${styles.footerCopyright}`}>Done by Sheldon. For any suggestions, do contact me by the links on the left.</p>
    </footer>
}

export default Footer;