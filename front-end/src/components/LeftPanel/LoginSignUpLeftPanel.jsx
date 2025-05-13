import React from "react";
import { Link } from 'react-router-dom';
import styles from "./login-sign-up-left-panel.module.css";

const LoginSignupLeftPanel = () => {
  return (
    <div className={styles.LSLPanel}>
      <div className={styles.LSLPanelContent}>
        <h2 className={styles.welcomeText}>به سامانه پارس نگار خوش آمدید</h2>
        <img className={styles.LSLImage} src="./assets/images/text.png" alt="به تاریخ سفر کنید و شکوه ایران را لمس کنید!" />
        <div className={styles.buttonsContainer}>
          <Link to="login">
            <button className={styles.darkBlue}>ورود به حساب کاربری</button>
          </Link>
          <Link to='usersignup'>
            <button className={styles.midblue}>ثبت‌نام کاربر</button>
          </Link>
          <Link to="tourleadersignup">
            <button className={styles.lightblue}>ثبت‌نام مسئول تور</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupLeftPanel;
