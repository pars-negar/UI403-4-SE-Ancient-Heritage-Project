import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

import logoUrl from "../../assets/icons/logo.svg";
import userAvatar from '../../assets/icons/login-user-avatar.svg';

import "./navbar.css";
import '../../index.css';

const Navbar = () => {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    if (!token) return;
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/users/oneuser`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };

  const handleLogin = () => {
    user.role === 'tour_manager'
      ? navigate('/profiletourleader')
      : navigate('/userpanel');
  };

  return (
    <nav className="navbar">
      <img className="logo" src={logoUrl} alt="logo" />

      <ul>
        <div className="navbar-links text-[1.4rem]" style={{ fontFamily: 'Koodak', fontWeight: '700' }}>
          <Link to="/">صفحه‌ی اصلی</Link>
          <Link to="/tourlistpage">تورها</Link>
          <Link to="/place">جاذبه‌ها</Link>
          <Link to="/addtour">اضافه کردن تور</Link>
          <Link to="/aboutus">درباره‌‌ما</Link>
        </div>
      </ul>

      {token ? (
        <div className="flex items-start gap-4">
          {!loading && (
            <div className="flex flex-col">
              <button
                style={{ backgroundImage: `url("${userAvatar}")` }}
                className="ml-4 !w-12 h-12 rounded-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
                onClick={e => {
                  e.preventDefault();
                  handleLogin();
                }}
              />
              <div className="flex flex-col gap-[0.75rem]">
                <h3 className="!text-black">سلام {user.username}</h3>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-[12rem] h-[3rem] text-black"
          >
            خروج
          </button>
        </div>
      ) : (
        <Link
          to='/LoginSignUp'
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
