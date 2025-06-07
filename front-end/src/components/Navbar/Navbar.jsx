import "./navbar.css";
import { Link } from 'react-router-dom';
import logoUrl from "../../assets/icons/logo.svg"
import FormButton from "../FormButton/FormButton";
import '../../index.css'


const Navbar = () => {

    const token = localStorage.getItem("access_token");
    console.log("listen listen" + token)

    return ( 
            <nav className="navbar">
                <img className="logo" src={ logoUrl }  alt="logo" />
                <ul>
                    <div className='
                        navbar-links 
                        text-[1.4rem]
                        '
                        style={{
                            fontFamily: 'Koodak',
                            fontWeight: '700'
                        }}
                    >
                        <Link to="/">صفحه‌ی اصلی</Link>
                        <Link to="/">تورها</Link>
                        <Link to="/">جاذبه‌ها</Link>
                        <Link to="/">تماس با ما</Link>
                        <Link to="/">درباره‌‌ما</Link>
                    </div>
                </ul>

                {token ? (
                    
                    <h1>you are logged in!!! Yay!!!!</h1>
                ) : (
                    <Link to='/LoginSignUp' id="button" 
                        className="
                            bg-[var(--color-orange)] 
                            text-black
                            text-2xl
                            text-center
                            font-[499] 
                            rounded-[40px]
                            w-[10.125rem]

                            "

                        style={{
                            fontFamily: 'Gandom'
                        }}
                        >
                    ورود/ثبت‌نام</Link>
                )
            }

                        
                <hr className="border !border-[var(--color-brown)] opacity-100 w-full h-[0.1rem] m-0" />
            </nav>
      
    );
}
 
export default Navbar;