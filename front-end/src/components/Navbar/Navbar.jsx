import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

import logoUrl from "../../assets/icons/logo.svg"
import FormButton from "../FormButton/FormButton";
import "./navbar.css";
import '../../index.css'

const Navbar = () => {

    const token = localStorage.getItem("access_token");
    console.log("listen listen" + token)

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
      }, []);
    
      const fetchUser = async () => {
        if (!token) return;

        let decoded;
        try {
            decoded = jwtDecode(token)
        } catch (err) {
            console.error("Invalid token");
            return;
        }

        const role = decoded.role;
        const endpoint =
            role === "tour_leader"
            ? "/api/users/tourleaderdashboard/"
            : "/api/homepage/profile";

        try {
        //   const token = localStorage.getItem("access_token");
          const response = await axios.get(
            `http://127.0.0.1:8000/${endpoint}`,
            {
                headers: {
                    ...(token && {Authorization: `Bearer ${token}`}),
                },
            }
          );
          if (response && response.status === 200) {
            // console.log(response.data);
            setUser({ ...response.data, role });
            setLoading(false);
          } else {
            console.error("Failed to fetch data", response);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error during fetch: ", error);
          setLoading(false);
        }
      };

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
                        <Link to="/tourlistpage">تورها</Link>
                        <Link to="/place">جاذبه‌ها</Link>
                        {/* <Link to="/">تماس با ما</Link> */}
                        <Link to="/aboutus">درباره‌‌ما</Link>
                    </div>
                </ul>

                {token ? (
                    <div className="flex flex-col gap-[0.75rem]">
                        <h3>سلام {user.username}</h3>
                        <p>نقش: {user.role === "tour_leader" ? "تورلیدر" : "کاربر عادی"}</p>
                    </div>
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