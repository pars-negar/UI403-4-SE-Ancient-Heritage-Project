import React from "react";
import styles from '../../styles/left-panel.css';

const LeftPanel = (props) => {
  const imageUrl = props.imageUrl;
  const imageTitle = props.imageTitle;
  
  return (
    <div className={ styles.leftPanel }>
      <h1 className={ styles.title }>پارس نگار</h1>
      <div className={ styles.imageWrapper }>
        <div className={ styles.imageBox }>
          <img src={ `${process.env.PUBLIC_URL}${imageUrl}` } alt={imageTitle} />
        </div>
      </div>
      <div className={ styles.rectangles }>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LeftPanel;
