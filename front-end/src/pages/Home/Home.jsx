import React, { useEffect, useState } from "react";
import { fetchTours } from "../services/api";
import TourCard from "../components/TourCard";

const HomePage = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const tourData = await fetchTours();
      setTours(tourData);
    };
    getData();
  }, []);

  const handleDetailsClick = (tour) => {
    // اگر مدال یا صفحه جدید داری می‌تونی اینجا هندل کنی
    console.log("نمایش جزئیات:", tour);
  };

  return (
    <div className="tours-wrapper">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} onDetailsClick={handleDetailsClick} />
      ))}
    </div>
  );
};

export default HomePage;
