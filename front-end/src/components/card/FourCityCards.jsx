import React from "react";
import styles from "./four-city-cards.module.css";
import CityAttraction from "./CityAttraction";

const FourCityCards = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <CityAttraction cityName="یزد" imageSrc="./assets/images/yazd.png" />
        <CityAttraction cityName="تبریز" imageSrc="./assets/images/tabriz.png" />
      </div>
      <div className={styles.rightColumn}>
        <CityAttraction cityName="اصفهان" imageSrc="./assets/images/esf.png" />
        <CityAttraction cityName="شیراز" imageSrc="./assets/images/shiraz.png" />
      </div>
    </div>
  );
};

export default FourCityCards;
