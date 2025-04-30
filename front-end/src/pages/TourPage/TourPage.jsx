import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import tours from "../TourPage/TourPage";
// import TourCard from "../../components/Card/TourCard";

const TourPage = () => {
  const { id } = useParams();
  const tour = tours.find((t) => t.id === parseInt(id));
  const navigate = useNavigate();

  if (!tour) return <p>تور یافت نشد</p>;

  return (
    <div className="tour-details">
      <button onClick={() => navigate(-1)}>بازگشت</button>
      <img src={tour.image} alt={tour.title} className="tour-image-large" />
      <h2>{tour.title}</h2>
      <p>
        <strong>هزینه:</strong> {tour.price}
      </p>
      <p>
        <strong>مدت:</strong> {tour.duration}
      </p>
      <p>
        <strong>توضیحات:</strong> {tour.description}
      </p>
    </div>
  );
};

export default TourPage;
