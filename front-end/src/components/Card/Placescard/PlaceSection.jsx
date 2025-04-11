import React from 'react';
import PlaceCard from './PlaceCard';
import '../Placescard/Places.css';

const PlaceSection = ({ title, places, onMoreInfo }) => {
  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4 border-r-4 border-orange-500 pr-2">{title}</h2>
      
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


