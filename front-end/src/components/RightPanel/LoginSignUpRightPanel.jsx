import React from "react";
import styles from "./login-sign-up-right-panel.module.css";



const LoginSignUpRightPanel = () => {
  const backgroundImage = "/assets/images/left-panel-background.jpg";
  const iranMap = './assets/icons/logo.svg';
  return (
    <div className={styles.loginSignUpRightPanel} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <img src={iranMap} alt="Iran Map" className={styles.iranMapLoginSignUp} />
    </div>
  );
};

export default LoginSignUpRightPanel;


