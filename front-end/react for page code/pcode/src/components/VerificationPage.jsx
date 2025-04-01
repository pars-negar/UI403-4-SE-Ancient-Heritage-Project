import React from "react";
import styles from '../styles/code.module.css';
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";


const VerificationPage = () => {
  return (
    <div className={styles.container}>
      <LeftPanel />
      <RightPanel />
    </div>
  );
};

export default VerificationPage;
