import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

import logoUrl from "../../assets/icons/logo.svg";
import FormButton from "../FormButton/FormButton";

import "./navbar.css";
import '../../index.css';

const Navbar = () => {
    const token = localStorage.getItem("access_token");

    console.log("listen listen" + token);
    console.log("Access Token:", token);

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        if (!token) return;

        let decoded;
        try {
            decoded = jwtDecode(token);
        } catch (err) {
            console.error("Invalid token");
            return;
        }

        const role = decoded.role;
        const endpoint =
            role === "tour_leader"
                ? "/api/users/tourleaderdashboard/"
                : "/api/homepage/profile/";

        try {
            const response = await axios.get(
                `http://127.0.0.1:8000${endpoint}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response && response.status === 200) {
                console.log("hey you" + response.data);
                console.log(jwtDecode(token).exp, Date.now() / 1000);
                setUser({ ...response.data, role });
                setLoading(false);
                console.log("\\nbla bla bla\\n " + user);
            } else {
                console.error("Failed to fetch data", response);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error during fetch: ", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("State user updated:", user);
    }, [user]);

    return (
        <nav className="navbar">
            <img className="logo" src={logoUrl} alt="logo" />

            <ul>
                <div
                    className='navbar-links text-[1.4rem]'
                    style={{
                        fontFamily: 'Koodak',
                        fontWeight: '700'
                    }}
                >
                    <Link to="/">صفحه‌ی اصلی</Link>
                    <Link to="/tourlistpage">تورها</Link>
                    <Link to="/place">جاذبه‌ها</Link>
                    <Link to="/addtour">اضافه کردن تور</Link>
                    <Link to="/aboutus">درباره‌‌ما</Link>
                </div>
            </ul>

            {token ? (
                <div className="flex flex-col gap-[0.75rem]">
                    <h3>سلام {user.username}</h3>
                    <p>نقش: {user.role === "tour_leader" ? "تورلیدر" : "کاربر عادی"}</p>
                </div>
            ) : (
                <Link
                    to='/LoginSignUp'
                    id="button"
                    className="
                        bg-[var(--color-orange)] 
                        text-black
                        text-2xl
                        text-center
                        font-[499] 
                        rounded-[40px]
                        w-[10.125rem]
                    "
                    style={{ fontFamily: 'Gandom' }}
                >
                    ورود/ثبت‌نام
                </Link>
            )}


            <a
                href="/addtour"
                className="
                    ml-4 
                    w-12 
                    h-12 
                    rounded-full 
                    bg-blue-500 
                    flex 
                    items-center 
                    justify-center 
                    text-white 
                    text-lg 
                    font-bold
                "
                style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                }}
            >
                <span
                    className="text-[1.4rem]"
                    style={{
                        fontFamily: 'Koodak',
                        fontWeight: '700'
                    }}
                >
                    &#x2B;
                </span>
            </a>

            <hr className="border !border-[var(--color-brown)] opacity-100 w-full h-[0.1rem] m-0" />
        </nav>
    );
};

export default Navbar;
