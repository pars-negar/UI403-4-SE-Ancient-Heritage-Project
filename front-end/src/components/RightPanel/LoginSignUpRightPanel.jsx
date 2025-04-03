
import React from "react";
import styles from'./login-sign-up-right-panel.module.css';


const LoginSignUpRightPanel = () => {
  return (
    <div className={styles.rightPanel}>
      <div className={styles.backgroundImage}></div>
      <img src="./assets/icons/logo.svg" alt="پرچم ایران" className={styles.centerImage} />
    </div>
  );
};

export default LoginSignUpRightPanel;
