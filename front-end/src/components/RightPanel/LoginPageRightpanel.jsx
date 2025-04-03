import React from "react";
import styles from "./LoginPageRightPanel.module.css";

const RightPanel = () => {
  return (
    <div className={styles.rightPanel}>
      <h2 className={styles.foor}>ورود به حساب کاربری</h2>
      <form>
        <div className={styles.formGroup}>
          <span className={styles.icon}>&#128100;</span>
          <input type="text" placeholder="نام کاربری" />
        </div>
        <div className={styles.formGroup}>
          <span className={styles.icon}>&#128273;</span>
          <input type="password" placeholder="رمز عبور" />
        </div>
        <button className={styles.loginBtn}>ورود</button>
      </form>
      <a href="/" className={styles.linkk}>رمز عبور را فراموش کرده‌اید؟</a>
      <p>حساب کاربری ندارید؟ <a href="sign-up.html" className={styles.linkk}>ثبت‌نام</a></p>
    </div>
  );
};

export default RightPanel;
