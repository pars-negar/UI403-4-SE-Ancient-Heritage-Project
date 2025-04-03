import "./navbar.css";
import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Navbar as ReactNavbar} from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Navbar = () => {
    return ( 
        <Container>
             <ReactNavbar expand="sm" className="navbar bg-body-tertiary" fluid>
                <img className="logo" src={logo} alt="logo" />
                <ul>
                    <div className='navbar-links'>
                    <Link to="/">صفحه‌ی اصلی</Link>
                    <Link to="/">تورها</Link>
                    <Link to="/">جاذبه‌ها</Link>
                    <Link to="/">تماس با ما</Link>
                    <Link to="/">درباره‌ی ما</Link>
                    </div>
                </ul>
                <button>ورود/ثبت‌نام</button>
            </ReactNavbar>
        </Container> 
    );
}
 
export default Navbar;