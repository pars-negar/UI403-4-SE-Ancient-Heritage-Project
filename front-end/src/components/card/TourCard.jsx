import React from "react";
import { Link } from "react-router-dom";



const TourCard = ({ tour }) => {
  const stars = "⭐".repeat(tour.rating) + "☆".repeat(5 - tour.rating);



  return (
    <div className="tour-card">
      <img src={tour.image} alt={tour.title} className="tour-image" />
      <h3>{tour.title}</h3>
      <div className="stars">{stars}</div>
      <p>هزینه تور: {tour.price} | مدت: {tour.duration}</p>
      <Link to={`/tour/${tour.id}`}>
        <button>جزئیات بیشتر</button>
      </Link>
    </div>
  );
};

export default TourCard;