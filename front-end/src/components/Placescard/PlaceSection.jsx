import React from 'react';
import PlaceCard from './PlaceCard';
import '../../components/Placescard/Places.css';

const PlaceSection = ({ title, places, onMoreInfo }) => {
  return (
    <div className="my-8 ps-50 pe-50">
      <h2 className="place-section-title">{title}</h2>

      <div className="flex flex-wrap justify-center gap-6 place-section-row">
        {places.map((place, idx) => (
          <div key={idx} className="w-full sm:w-[45%] md:w-[30%]">
            <PlaceCard {...place} onMoreInfo={() => onMoreInfo(place)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceSection;
