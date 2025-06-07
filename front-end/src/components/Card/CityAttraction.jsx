// import React from "react";
import styles from "./city-attraction.module.css";

const CityAttraction = ({ cityName, imageSrc, isHighlighted }) => {
  return (
    <div
      className={`${styles.Citycard} ${isHighlighted ? styles.highlighted : ""}`}
      style={{
        backgroundImage: `url(${imageSrc})`,
      }}
    >
      <div className={styles.Cityoverlay}>
        <h2 className={styles.cityName}>{cityName}</h2>
        <button className={styles.CityAttractionbutton}>مشاهده جاذبه‌ها</button>
      </div>
    </div>
  );
};

export default CityAttraction;
