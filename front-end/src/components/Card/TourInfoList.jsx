import React from "react";
import TourInfoCard from "./TourInfoCard";

const TourInfoList = ({ tours }) => {
  if (!tours || tours.length === 0) {
    return <p className="text-center mt-4" style={{ fontFamily: 'Vazirmatn' }}>هیچ توری یافت نشد.</p>;
  }

  return (
    <div className="p-8 text-right">
      <div className="flex flex-col content-center items-center mt-5">
        {tours.map((tour, index) => (
          <TourInfoCard
            key={tour.id || index}
            title={tour.tour_name}
            destination={tour.destination}
            duration={tour.duration}
            price={tour.price}
            imageUrl={tour.image_url}
          />
        ))}
      </div>
    </div>
  );
};

export default TourInfoList;
