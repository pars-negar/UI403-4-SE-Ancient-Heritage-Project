import styles from './footer.module.css';
import logoUrl from '../../assets/icons/logo.svg'
import { Link } from 'react-router-dom';
import footerRectangle from '../../assets/images/footerRectangle.svg'
import samandehi from '../../assets/icons/samandehi.ir.svg'
import electronicTrustSymbol from '../../assets/icons/electronicTrustSymbol.svg'

const Footer = () => {
    return (  
        <div className={ styles.footer }>
            <img className={ styles.footerRectangle } src={ footerRectangle } alt="footer-rectangle" />
            <div className={ styles.footerLogoContainer }>
                <div className={ styles.circle }></div>
                <img className={ styles.footerLogo } src={ logoUrl } alt="footer logo" />
            </div>

            <ul className={ styles.footerUrl }>
                <div className={ styles.footerLinks }>
                <Link to="/">موردی اگر خواستید</Link>
                <Link to="/">تماس با ما</Link>
                <Link to="/">درباره ما</Link>
                </div>
            </ul>

            <p className={ styles.rights}>همه‌ی حقوق این سایت متعلق به سامانه پارس نگار است.</p>
            <div className={ styles.footerSymbols}>
                <img src={samandehi} alt="samandehi.ir" />
                <img src={ electronicTrustSymbol } alt="electronic-trust-symbol" />
            </div>
        </div>
    );
}
 
export default Footer;