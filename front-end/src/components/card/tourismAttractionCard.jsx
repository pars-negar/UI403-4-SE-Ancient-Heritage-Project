// tourismAttractionCard.jsx
import React from 'react';
import styles from './tourism-attraction-card.module.css';

const TourismAttractionCard = ({ image, title, description, backgroundColor }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.cardImage} />
      </div>
      <div className={styles.cardContent} style={{ backgroundColor }}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </div>
  );
};

export default TourismAttractionCard;

