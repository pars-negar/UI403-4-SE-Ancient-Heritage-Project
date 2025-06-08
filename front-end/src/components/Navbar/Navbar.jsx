import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

import logoUrl from "../../assets/icons/logo.svg";
import "./navbar.css";
import '../../index.css';

const Navbar = () => {
    const token = localStorage.getItem("access_token");
    const [user, setUser] = useState(null);
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
            console.error("توکن نامعتبر است");
            return;
        }

        if (decoded.exp < Date.now() / 1000) {
            console.error("توکن منقضی شده");
            return;
        }

        const role = decoded.role;
        const endpoint =
            role === "tour_manager"
                ? "/api/users/tourleaderdashboard/"
                : "/api/homepage/profile/";

        try {
            const response = await axios.get(`http://127.0.0.1:8000${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setUser({ ...response.data, role });
            } else {
                console.error("خطا در دریافت اطلاعات کاربر");
            }
        } catch (error) {
            console.error("خطا در ارتباط با سرور:", error.response?.status || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <nav className="navbar">
            <img className="logo" src={logoUrl} alt="logo" />
            <ul>
                <div className='navbar-links text-[1.4rem]' style={{ fontFamily: 'Koodak', fontWeight: '700' }}>
                    <Link to="/">صفحه‌ی اصلی</Link>
                    <Link to="/tourlistpage">تورها</Link>
                    <Link to="/place">جاذبه‌ها</Link>
                    <Link to="/aboutus">درباره‌‌ما</Link>
                </div>
            </ul>

            {token && user ? (
                <div className="flex flex-col gap-[0.75rem]">
                    <h3>سلام {user.username}</h3>
                    <p>نقش: {user.role === "tour_manager" ? "تورلیدر" : "کاربر عادی"}</p>
                </div>
            ) : (
                <Link to='/LoginSignUp' id="button"
                    className="bg-[var(--color-orange)] text-black text-2xl text-center font-[499] rounded-[40px] w-[10.125rem]"
                    style={{ fontFamily: 'Gandom' }}
                >
                    ورود/ثبت‌نام
                </Link>
            )}

            <hr className="border !border-[var(--color-brown)] opacity-100 w-full h-[0.1rem] m-0" />
        </nav>
    );
};

export default Navbar;
