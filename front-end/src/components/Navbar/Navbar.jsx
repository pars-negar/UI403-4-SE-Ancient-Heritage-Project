import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

import logoUrl from "../../assets/icons/logo.svg";
import FormButton from "../FormButton/FormButton";

import "./navbar.css";
import '../../index.css';

import loginUserAvatar from '../../assets/icons/login-user-avatar.svg'

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
                    {/* این لینک رو میتونیم بر اساس نقش شبیه سازی شده نمایش بدیم */}
                    {/* {user.role === "tour_leader" && <Link to="/addtour">اضافه کردن تور</Link>} */}
                    <Link to="/aboutus">درباره‌‌ما</Link>
                </div>
            </ul>

            {isLoggedIn ? (
                <div className="flex !items-center justify-center gap-[3rem]">
                    <div>
                            <a
                            href="/profiletourleader"
                            className="
                                w-12
                                h-12
                                rounded-full
                                flex
                                items-center
                                justify-center
                                text-white
                                text-lg
                                font-bold
                                "
                            style={{
                                backgroundImage: `url(${ loginUserAvatar })`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <img src={ loginUserAvatar } alt="" />
                            <span className="
                                text-[1.4rem]
                                "
                                style={{
                                    fontFamily: 'Koodak',
                                    fontWeight: '700'
                                }}>&#x2B;</span>
                        </a>
                    </div>
                    <div className="flex gap-[0.5rem] items-end">
                        <button
                            onClick={handleLogout}
                            className="
                                bg-red-500 // رنگ دکمه خروج
                                text-white
                                text-base
                                font-bold
                                py-2 px-4
                                !w-40
                                rounded-[40px]
                                whitespace-nowrap
                                flex
                                justify-center
                                "
                            style={{
                                fontFamily: 'Gandom',
                                cursor: 'pointer'
                            }}
                        >
                            خروج از حساب کاربری
                        </button>
                    </div>
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

           
            <hr className="border !border-[var(--color-brown)] opacity-100 w-full h-[0.1rem] m-0" />
        </nav>
    );
};

export default Navbar;
