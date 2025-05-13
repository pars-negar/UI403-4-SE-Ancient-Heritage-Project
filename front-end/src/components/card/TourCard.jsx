import React from "react";
import { Link } from "react-router-dom";
import styles from "./tourcard.module.css";

const TourCard = ({ tour }) => {
  const stars = "⭐".repeat(tour.rating) + "☆".repeat(5 - tour.rating);
  const startDate = new Date(tour.start_date);
  const endDate = new Date(tour.end_date);
  const durationInDays = Math.ceil(
    (endDate - startDate) / (1000 * 60 * 60 * 24)
  );
  

  return (
    <div className="tour-card">
      <img src={`http://127.0.0.1:8000${tour.main_image}`} alt={tour.title} />
      <h3>{tour.title}</h3>
      <div className="stars">{stars}</div>
      <p>
        هزینه تور
        <span className={styles.verticalLine}></span>
        {parseInt(tour.price).toLocaleString("fa-IR")} تومان
        {tour.duration}
      </p>
      <p>
        مدت زمان
        <span className={styles.verticalLine}></span>
        {durationInDays} روز
      </p>
      <Link to={`/tour/${tour.id}`}>
        <button>جزئیات بیشتر</button>
      </Link>
    </div>
  );
};

export default TourCard;
