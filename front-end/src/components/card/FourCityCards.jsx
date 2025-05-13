import React from "react";
import styles from "./four-city-cards.module.css";
import CityAttraction from "./CityAttraction";

const FourCityCards = () => {
  const imageUrl = './assets/images/HomeBackground.png';
  return (
    <div className={styles.fourcontainer}>
      <img className={styles.backgroundPic} src={imageUrl} alt="iiiii" />
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
