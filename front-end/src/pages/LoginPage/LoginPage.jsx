import React from "react";
import styles from "./LoginPage.module.css";
import LeftPanel from "../../components/LeftPanel/LeftPanel";
import RightPanel from "../../components/RightPanel/LoginPageRightpanel";
import img from "../../assets/images/left-panel-login.png"

const Container = () => {
  return (
    <div className={styles.login}>
      <RightPanel />
      <LeftPanel imageUrl={img} imageTitle="پل سی و سه پل" rectanglesColor="--color-orange" />
    </div>
  );
};

export default Container;
