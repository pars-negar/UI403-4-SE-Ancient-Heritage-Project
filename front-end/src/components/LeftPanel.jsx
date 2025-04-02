import React from "react";
import styles from '../styles/code.module.css';
import kakh from "../asset/images/code.png";

const LeftPanel = () => {
  return (
    <div className={styles.leftPanel}>
      <h1 className={styles.title}>پارس نگار</h1>
      <div className={styles.imageWrapper}>
        <div className={styles.imageBox}>
          <img src={kakh} alt="کاخ" />
        </div>
      </div>
      <div className={styles.rectangles}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LeftPanel;
