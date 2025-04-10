import React from "react";

const TourCard = ({ tour, onDetailsClick }) => {
  const stars = "⭐".repeat(tour.rating) + "☆".repeat(5 - tour.rating);

  return (
    <div className="tour-card">
      <img src={tour.image} alt={tour.title} className="tour-image" />
      <h3>{tour.title}</h3>
      <div className="stars">{stars}</div>
      <p>هزینه تور: {tour.price} | مدت: {tour.duration}</p>
      <button onClick={() => onDetailsClick(tour)}>جزئیات بیشتر</button>
    </div>
  );
};

export default TourCard;
