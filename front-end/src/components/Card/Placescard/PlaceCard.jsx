import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import '../Placescard/Places.css';

const PlaceCard = ({ image, title, description, onMoreInfo }) => {
  return (
    <div className="place-card">
      <img src={image} alt={title} />
      <div className="place-overlay">
        <h2 className="place-title">{title}</h2>
        <p className="place-desc">{description}</p>
      </div>
      <button onClick={onMoreInfo} className="place-button">
        <FaArrowLeft size={10} />
      </button>
    </div>
  );
};

export default PlaceCard;