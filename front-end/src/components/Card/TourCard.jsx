import React from "react";
import { Link } from "react-router-dom";
import styles from "./tourcard.module.css";

const TourCard = ( {tour} ) => {
  if (!tour) return null;
  
    console.log(tour)
    const stars = "⭐".repeat(tour.rating) + "☆".repeat(5 - tour.rating);
    const startDate = new Date(tour.start_date);
    const endDate = new Date(tour.end_date);
    const durationInDays = Math.ceil(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    );

  
  return (
    (tour && (
      <div>
        <div className={styles.cardContainer}>
          <div key={tour.id} className={styles.tourCard}>
            <div className={styles.first_container}>
              <img
              className={`${styles.tourImage} bg-cover`}
              src={tour.image}
              alt={tour.title}
              />
              <div className={styles.second_container}>
                <h3 className={styles.tourTitle} style={{fontFamily:"Koodak",fontWeight:"bold"}}>تور {tour.destination}</h3>
                <div className={styles.stars}>{stars}</div>
              </div>
            </div>
            
            <p className={styles.tourInfoo} style={{fontFamily:"Koodak",fontWeight:"bold"}}>
              هزینه تور
              <span className={styles.verticalLine}></span>
              {parseInt(tour.price).toLocaleString("fa-IR")} تومان
            </p>
            <p className={styles.tourInfo} style={{fontFamily:"Koodak",fontWeight:"bold"}}>
              مدت
              <span className={styles.verticalLine}></span>
              {tour.duration} روز
            </p>

            <button className={styles.more_info_button}>جزئیات بیشتر</button>
            
          </div>
        </div>
      </div>

    ))
  );
};

export default TourCard;
