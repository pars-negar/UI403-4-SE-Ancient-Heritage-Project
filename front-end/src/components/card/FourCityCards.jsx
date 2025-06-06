import React from "react";
import styles from "./four-city-cards.module.css";
import CityAttraction from "./CityAttraction";

const FourCityCards = () => {
  const imageUrl = './assets/images/HomeBackground.png';
  return (
    <div className={styles.fourcontainer}>
      <img className={styles.backgroundPic} src={imageUrl} alt="iiiii" />
      <div className={styles.leftColumn}>
        <a href="/place/یزد"><CityAttraction cityName="یزد" imageSrc="./assets/images/yazd.png" /></a>
        <a href="/place/تبریز"><CityAttraction cityName="تبریز" imageSrc="./assets/images/tabriz.png" /></a>
      </div>
      <div className={styles.rightColumn}>
        <a href="/place/اصفهان"><CityAttraction cityName="اصفهان" imageSrc="./assets/images/esf.png" /></a>
        <a href="/place/شیراز"><CityAttraction cityName="شیراز" imageSrc="./assets/images/shiraz.png" /></a>
      </div>
    </div>
  );
};

export default FourCityCards;
