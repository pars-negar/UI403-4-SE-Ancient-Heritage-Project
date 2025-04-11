import React from "react";
import axios from 'axios';
import { useState } from 'react';
import styles from "./LoginPageRightPanel.module.css";
import FormButton from "../FormButton/FormButton";
const RightPanel = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password
      });
  
      console.log("✅ Response:", response.data);
  
      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
  
      alert("ورود با موفقیت انجام شد! توکن دریافت شد ✅");
    } catch (error) {
      console.error("❌ Error:", error);
      alert("ورود ناموفق بود ❌");
    }
  };
  
  return (
    <div className={styles.rightPanel}>
      <h2 className={styles.foor}>ورود به حساب کاربری</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
  <span className={styles.icon}>&#128100;</span>
  <input
    type="text"
    placeholder="نام کاربری"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
</div>
<div className={styles.formGroup}>
  <span className={styles.icon}>&#128273;</span>
  <input
    type="password"
    placeholder="رمز عبور"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
</div>

        <FormButton buttonText="تائید" buttonColor='#FB8101' buttonTextColor='black' buttonColorHovered="#D96F00"/>
      </form>
      <a href="/" className={styles.linkk}>رمز عبور را فراموش کرده‌اید؟</a>
      <p>حساب کاربری ندارید؟ <a href="sign-up.html" className={styles.linkk}>ثبت‌نام</a></p>
    </div>
  );
};

export default RightPanel;
