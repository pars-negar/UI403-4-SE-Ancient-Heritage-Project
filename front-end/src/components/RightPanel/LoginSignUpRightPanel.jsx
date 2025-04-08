import React from "react";
import styles from "./login-sign-up-right-panel.module.css";

const LoginSignup = () => {
  const imageUrl = './assets/icons/logo.svg'; 

  return (
    <div className={ styles.LSRPanel }>
      <div className={ styles.LSRPanelContent }>
        <img className={ styles.LSRPanelImage } src={`${ process.env.PUBLIC_URL }${ imageUrl }`} alt="our logo" />

      </div>
    </div>
  );
};

export default LoginSignup;



