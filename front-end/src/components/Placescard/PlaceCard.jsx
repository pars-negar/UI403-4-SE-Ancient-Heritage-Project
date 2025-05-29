// components/Placescard/PlaceCard.jsx
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6"; 

const PlaceCard = ({ image, title, description, onMoreInfo }) => {
  return (
    <div className="places-card" style={{ backgroundImage: `url(${image})` }}>
      <div className="places-overlay">
        <h2 className="places-title">{title}</h2>
        <div className="underline-orange"></div>
        <p className="place-desc-overlay">{description}</p>
      </div>

      <button onClick={onMoreInfo} className="place-button">
        <FaArrowLeftLong style={{zIndex: 20}} className="arrow-icon" />
        
      </button>
    </div>
  );
};

export default PlaceCard;
