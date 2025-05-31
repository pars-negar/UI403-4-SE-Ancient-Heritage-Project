import React from "react";
import { Link } from "react-router-dom";
import styles from "./tourcard.module.css";

const TourCards = ({ tours }) => {
  return (
    <div>
      {/* عنوان بالا */}
      <div className={styles.sectionHeader}>
        <h2>
          تورهای برتر
          <span className={styles.verticalLine}></span>
          <span style={{ color: "#999", fontWeight: "normal" }}>تورهای اخیر</span>
        </h2>
        <Link to="/tours" className={styles.moreLink}>
          مشاهده بیشتر
        </Link>
      </div>

      {/* کارت‌ها */}
      <div className={styles.cardContainer}>
        {tours.map((tour) => {
          const stars = "⭐".repeat(tour.rating) + "☆".repeat(5 - tour.rating);
          const startDate = new Date(tour.start_date);
          const endDate = new Date(tour.end_date);
          const durationInDays = Math.ceil(
            (endDate - startDate) / (1000 * 60 * 60 * 24)
          );

          return (
            <div key={tour.id} className={styles.tourCard}>
              <img
                className={styles.tourImage}
                src={`http://parsnegarback.liara.run${tour.main_image}`}
                alt={tour.title}
              />
              <h3 className={styles.tourTitle}>{tour.title}</h3>
              <div className={styles.stars}>{stars}</div>
              <p className={styles.tourInfo}>
                هزینه تور
                <span className={styles.verticalLine}></span>
                {parseInt(tour.price).toLocaleString("fa-IR")} تومان
              </p>
              <p className={styles.tourInfo}>
                مدت زمان
                <span className={styles.verticalLine}></span>
                {durationInDays} روز
              </p>
              <Link to={`/tour/${tour.id}`}>
                <button className={styles.button}>جزئیات بیشتر</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TourCards;

