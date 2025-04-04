import React from "react";
import styles from "./login-sign-up-left-panel.module.css";

const LoginSignupLeftPanel = () => {
  return (
    <div className={styles.LSLPanel}>
      <div className={styles.LSLPanelContent}>
        <h2 className={styles.welcomeText}>به سامانه پارس نگار خوش آمدید</h2>
        <img className={styles.sloganImage} src="./assets/images/text.png" alt="به تاریخ سفر کنید و شکوه ایران را لمس کنید!" />
        <div className={styles.buttonsContainer}>
          <button className={styles.button}>ورود به حساب کاربری</button>
          <button className={styles.button}>ثبت‌نام کاربر</button>
          <button className={styles.button}>ثبت‌نام مسئول تور</button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupLeftPanel;
