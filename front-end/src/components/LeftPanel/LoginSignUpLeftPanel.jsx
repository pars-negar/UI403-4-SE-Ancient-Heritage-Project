import React from "react";
import styles from "./login-sign-up-left-panel.module.css";

const LoginSignupLeftPanel = () => {
  return (
    <div className={styles.LSLPanel}>
      <div className={styles.LSLPanelContent}>
        <h2 className={styles.welcomeText}>به سامانه پارس نگار خوش آمدید</h2>
        <img className={styles.LSLImage} src="./assets/images/text.png" alt="به تاریخ سفر کنید و شکوه ایران را لمس کنید!" />
        <div className={styles.buttonsContainer}>
          <button className={styles.darkBlue}>ورود به حساب کاربری</button>
          <button className={styles.midblue}>ثبت‌نام کاربر</button>
          <button className={styles.lightblue}>ثبت‌نام مسئول تور</button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupLeftPanel;
