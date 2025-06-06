import styles from './tourism-attraction-card.module.css';

const TourismAttractionCard = ({ image, title, description, backgroundColor = '#FF9800' }) => {
  return (
    <div className={styles.cardWrapper}>
      <div
        className={styles.imageWrapper}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className={styles.cardContent} style={{ backgroundColor: backgroundColor }}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardDescription} style={{ fontFamily: 'Vazirmatn', fontWeight: 500 }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default TourismAttractionCard;
