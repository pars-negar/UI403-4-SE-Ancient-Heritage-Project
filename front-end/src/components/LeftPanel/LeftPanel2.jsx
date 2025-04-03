import React from "react";
import styles from './left-panel.module.css';

const LeftPanel = ( props ) => {
  const imageUrl = props.imageUrl;
  const imageTitle = props.imageTitle;
  const logoUrl = './assets/icons/logo.svg';
  
  return (
    <div className={ styles.leftPanell }>
      <img className={styles.leftPanelLogo} src={ `${process.env.PUBLIC_URL}${logoUrl}` } alt="left-panel-logo" />

      <div className={styles.leftPanelContent}>
        <img className={ styles.leftPanelImage } src={ `${process.env.PUBLIC_URL}${imageUrl}` } alt={imageTitle} />
        <div className={ styles.rectanglesl }>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      
    </div>
  );
};

export default LeftPanel;
