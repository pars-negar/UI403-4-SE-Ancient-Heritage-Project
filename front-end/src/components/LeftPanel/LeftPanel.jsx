import React from "react";
import styles from './left-panel.module.css';

import logoUrl from '../../assets/icons/logo.svg'

const LeftPanel = ( props ) => {
  const imageUrl = props.imageUrl;
  const imageTitle = props.imageTitle;
  const rectanglesColor = props.rectanglesColor;
  
  return (
    <div className={ styles.leftPanel }>
      <img className={ styles.leftPanelLogo } src={ logoUrl } alt="left-panel-logo" />
      <div className={ styles.leftPanelContent }>
        <img className={ styles.leftPanelImage } src={ imageUrl } alt={ imageTitle } />
        <div className={ styles.rectangles }>
          <div style={{ backgroundColor: `var(${rectanglesColor})` }} className={ styles.leftPanelRectangle }></div>
          <div style={{ backgroundColor: `var(${rectanglesColor})` }} className={ styles.leftPanelRectangle }></div>
          <div style={{ backgroundColor: `var(${rectanglesColor})` }} className={ styles.leftPanelRectangle }></div>
        </div>
      </div>
      
    </div>
  );
};

export default LeftPanel;
