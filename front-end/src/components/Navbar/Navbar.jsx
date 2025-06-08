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
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      let decoded;
      try {
        decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          console.error("توکن منقضی شده است");
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("توکن نامعتبر است");
        setLoading(false);
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
            headers: { Authorization: `JWT ${token}` }
          }
        );
        if (response.status === 200) {
          setUser({ ...response.data, role });
        } else {
          console.error("دریافت داده‌ها با خطا مواجه شد", response);
        }
      } catch (error) {
        console.error("خطا در دریافت داده‌ها: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <nav className="navbar">
      <img className="logo" src={logoUrl} alt="logo" />
      <ul>
        <div className="navbar-links text-[1.4rem]" style={{ fontFamily: 'Koodak', fontWeight: '700' }}>
          <Link to="/">صفحه‌ی اصلی</Link>
          <Link to="/tourlistpage">تورها</Link>
          <Link to="/place">جاذبه‌ها</Link>
          <Link to="/aboutus">درباره‌‌ما</Link>
        </div>
      </ul>

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : token ? (
        <div className="flex flex-col gap-[0.75rem]">
          <h3>سلام {user.username}</h3>
          <p>نقش: {user.role === "tour_leader" ? "تورلیدر" : "کاربر عادی"}</p>
        </div>
      ) : (
        <Link to='/LoginSignUp' id="button" className="bg-[var(--color-orange)] text-black text-2xl text-center font-[499] rounded-[40px] w-[10.125rem]" style={{ fontFamily: 'Gandom' }}>
          ورود/ثبت‌نام
        </Link>
      )}

      <hr className="border !border-[var(--color-brown)] opacity-100 w-full h-[0.1rem] m-0" />
    </nav>
  );
};

export default Navbar;
