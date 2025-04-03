import React from "react";
import styles from "./LoginPage.module.css";
import LeftPanel from "../../components/LeftPanel/LeftPanel2";
import RightPanel from "../../components/RightPanel/LoginPageRightpanel";
import img from "../../assets/images/ax-login-page.png"
const Container = () => {
  return (
    <div className={styles.container}>
      <LeftPanel imageUrl={img} imageTitle="پل سی و سه پل" rectanglesColor="#623528" />
      <RightPanel />
    </div>
  );
};

export default Container;
