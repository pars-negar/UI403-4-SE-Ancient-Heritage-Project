import styles from './footer.module.css';
import logoUrl from '../../assets/icons/logo.svg'
import { Link } from 'react-router-dom';

import footerRectangle from '../../assets/images/footerRectangle.svg'
import samandehi from '../../assets/icons/samandehi.ir.svg'
import electronicTrustSymbol from '../../assets/icons/electronicTrustSymbol.svg'
import telegram from '../../assets/icons/telegram.svg'
import instagram from '../../assets/icons/instagram.svg'

const Footer = () => {
    return (  
        <div className={ styles.footer }>
            <img className={ styles.footerRectangle } src={ footerRectangle } alt="footer-rectangle" />
            <div className='bg-[var(--color-dark-blue)]'>
                <div className='flex justify-between ml-[2rem] items-center'> 
                    <div className={ styles.footerLogoContainer }>
                        <div className={ styles.circle }></div>
                        <img className={ styles.footerLogo } src={ logoUrl } alt="footer logo" />
                    </div>
                    <div className='flex'>
                        <img src={ instagram } alt="instagram-icon" className='w-[5rem] h-[5rem]' />
                        <img src={ telegram } alt="telegram-icon" className='w-[4rem] h-[5rem]'/>
                    </div>
                    <div className='flex flex-col text-white' style={{fontFamily: 'Koodak', fontWeight: 700, fontSize: '1.5rem'}}>
                        <p className='relative'>parsnegar@email.com
                            <span 
                                className='inline-block w-[0.15rem] h-[2rem] bg-[var(--color-orange)] absolute left-[-0.625rem]'>
                            </span>
                        </p>
                        <p className='relative left-0 flex justify-end'>031-12345678
                            <span 
                                className='inline-block w-[0.15rem] h-[2rem] bg-[var(--color-orange)] absolute left-[-0.625rem]'>
                            </span>
                        </p>
                    </div>
                </div>

                <ul className={ styles.footerUrl }>
                    <div className={ styles.footerLinks }>
                        <Link to="/" className='relative ml-[0.625rem]'>جاذبه‌ها
                            <span 
                                className='inline-block w-[0.15rem] h-[2rem] bg-[var(--color-orange)] absolute left-[-0.625rem]'>
                            </span>
                        
                        </Link>
                        <Link to="/" className='relative ml-[0.625rem]'>تماس با ما
                            <span 
                                className='inline-block w-[0.15rem] h-[2rem] bg-[var(--color-orange)] absolute left-[-0.625rem]'>
                            </span>
                        </Link>
                        <Link to="/">درباره ما</Link>
                    </div>
                </ul>
                <div className='flex justify-between pb-[2rem]'>
                    <p className={ styles.rights}>همه‌ی حقوق این سایت متعلق به سامانه پارس نگار است.</p>
                    <div className={ styles.footerSymbols}>
                        <img src={samandehi} alt="samandehi.ir" />
                        <img src={ electronicTrustSymbol } alt="electronic-trust-symbol" />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Footer;