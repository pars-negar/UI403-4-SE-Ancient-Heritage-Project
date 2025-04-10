import "./navbar.css";
import { Link } from 'react-router-dom';
import logoUrl from "../../assets/icons/logo.svg"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Navbar as ReactNavbar} from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import FormButton from "../FormButton/FormButton";
import styles from './navbar.css';


const Navbar = () => {
    return ( 
        <Container>
             <ReactNavbar expand="sm" className="navbar bg-body-tertiary" fluid>
                <img className="logo" src={ logoUrl }  alt="logo" />
                <ul className="ul">
                    <div className='navbar-links'>
                    <Link to="/">صفحه‌ی اصلی</Link>
                    <Link to="/">تورها</Link>
                    <Link to="/">جاذبه‌ها</Link>
                    <Link to="/">تماس با ما</Link>
                    <Link to="/">درباره‌ی ما</Link>
                    </div>
                </ul>
                <FormButton className={ styles.navbarButton } buttonText='ورود/ثبت‌نام' buttonColor='#205781' buttonTextColor='white' buttonColorHovered="#D96F00"/>
                </ReactNavbar>
        </Container> 
    );
}
 
export default Navbar;