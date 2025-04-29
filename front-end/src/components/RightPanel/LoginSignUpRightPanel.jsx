import React from "react";
import styles from "./login-sign-up-right-panel.module.css";
import logo from '../../assets/icons/logo.svg';

const LoginSignup = () => {


  return (
    <div className={ styles.LSRPanel }>
      <div className={ styles.LSRPanelContent }>
        <img className={ styles.LSRPanelImage } src={ logo } alt="our logo" />

      </div>
    </div>
  );
};

export default LoginSignup;



