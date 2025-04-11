import React, { useState, useEffect } from "react";
import styles from "./city-attraction.module.css";

const CityAttraction = ({ cityName, imageSrc }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [imageSrc]);

  return (
    <div
      className={styles.Citycard}
      style={{
        backgroundImage: `url(${imageSrc})`,
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
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
