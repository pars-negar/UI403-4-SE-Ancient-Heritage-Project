import React from 'react';
import PlaceCard from './PlaceCard';
import '../Placescard/Places.css';

const PlaceSection = ({ places, onMoreInfo }) => {
  return (
    <div className="my-8">
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


