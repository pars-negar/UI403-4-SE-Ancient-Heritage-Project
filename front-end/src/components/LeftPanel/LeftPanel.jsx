import React from "react";
import styles from './left-panel.module.css';

const LeftPanel = ( props ) => {
  const imageUrl = props.imageUrl;
  const imageTitle = props.imageTitle;
  const logoUrl = './assets/icons/logo.svg';
  const rectanglesColor = props.rectanglesColor;
  
  return (
    <div className={ styles.leftPanel }>
      <img className={ styles.leftPanelLogo } src={`${ process.env.PUBLIC_URL }${ logoUrl }`} alt="left-panel-logo" />
      <div className={ styles.leftPanelContent }>
        <img className={ styles.leftPanelImage } src={`${ process.env.PUBLIC_URL }${ imageUrl }`} alt={ imageTitle } />
        <div className={ styles.rectangles }>
          <div style={{ backgroundColor: rectanglesColor }} className={ styles.leftPanelRectangle }></div>
          <div style={{ backgroundColor: rectanglesColor }} className={ styles.leftPanelRectangle }></div>
          <div style={{ backgroundColor: rectanglesColor }} className={ styles.leftPanelRectangle }></div>
        </div>
      </div>
      
    </div>
  );
};

export default LeftPanel;
