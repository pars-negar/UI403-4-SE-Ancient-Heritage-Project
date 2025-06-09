import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

import logoUrl from "../../assets/icons/logo.svg";
import "./navbar.css";
import '../../index.css';

import loginUserAvatar from '../../assets/icons/login-user-avatar.svg'

const Navbar = () => {
    const navigate = useNavigate();

    // یک State جدید برای نگهداری وضعیت ورود کاربر (شبیه‌سازی)
    // مقدار اولیه رو از localStorage میگیریم تا بعد از رفرش صفحه وضعیت حفظ بشه.
    // 'true' اگر 'loggedIn' در localStorage برابر 'true' باشه، در غیر این صورت 'false'.
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("loggedIn") === "true"
    );

    // اطلاعات کاربر شبیه‌سازی شده
    const [user, setUser] = useState({ username: "کاربر گرامی", role: "کاربر عادی" });

    // تابعی که هنگام ورود کاربر فراخوانی می‌شود (شبیه‌سازی)
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        localStorage.setItem("loggedIn", "true"); // وضعیت رو در localStorage ذخیره کن
        // setUser({ username: "نام کاربری شما", role: "کاربر عادی" }); // میتونید اینجا نام کاربری رو هم تنظیم کنید
        // navigate('/'); // میتونید به صفحه اصلی ریدایرکت کنید بعد از "ورود"
    };

    // تابع برای خروج از حساب کاربری
    const handleLogout = () => {
        setIsLoggedIn(false); // وضعیت ورود رو به false تغییر بده
        localStorage.removeItem("loggedIn"); // وضعیت رو از localStorage حذف کن
        setUser({ username: "کاربر گرامی", role: "کاربر عادی" }); // اطلاعات کاربر رو به حالت پیش‌فرض برگردون

        navigate('/'); // ریدایرکت به صفحه اصلی
        window.location.reload(); // رفرش کامل صفحه برای اطمینان از اعمال تغییرات UI
    };

    // اگر بخواهید دکمه ورود/ثبت‌نام، کاربر را وارد کند:
    // می‌توانید یک تابع برای SimulateLogin در LoginSignUp صفحه خود ایجاد کنید
    // و هنگام ورود موفق، handleLoginSuccess را فراخوانی کنید.
    // فعلا برای دمو، فرض میکنیم با کلیک روی دکمه ورود/ثبت‌نام، وارد میشویم.
    // (این بخش در کامپوننت Navbar نیست، فقط جهت توضیح است.)
    // <Link to='/LoginSignUp' onClick={handleLoginSuccess}>ورود/ثبت‌نام</Link>
    // اما در Navbar این کار رو انجام نمیدیم چون Link مستقیماً به صفحه LoginSignUp میره.

    return (
        <nav className="navbar">
            <img className="logo" src={logoUrl} alt="لوگو" />
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
                // اگر کاربر وارد نشده بود (isLoggedIn = false):
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
                    // با کلیک روی دکمه ورود/ثبت‌نام، وضعیت isLoggedIn رو به true تغییر میدیم (شبیه‌سازی ورود)
                    onClick={handleLoginSuccess}
                >
                    ورود/ثبت‌نام
                </Link>
            )}

           
            <hr className="border !border-[var(--color-brown)] opacity-100 w-full h-[0.1rem] m-0" />
        </nav>
    );
}

export default Navbar;