import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import '../Placescard/Places.css';

const PlaceCard = ({ image, title, description, onMoreInfo }) => {
  return (
    <div className="places-card" style={{backgroundImage: `url(${image})`}}>
      

      <div className="places-overlay">
        <h2 className="places-title">{title}</h2>
        <div className="underline-orange"></div>
        <p className="place-desc-overlay">{description}</p>
      </div>

      <button onClick={onMoreInfo} className="place-button">
        <FaArrowLeft style={{ marginLeft: '1px' }} />
      </button>
    </div>
  );
};

export default PlaceCard;
