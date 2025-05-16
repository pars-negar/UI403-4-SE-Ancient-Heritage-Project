import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import '../Placescard/Places.css';
import './Places.css';


const PlaceCard = ({ image, title, description, onMoreInfo }) => {
  return (
    <div className="place-card">
      <img src={image} alt={title} />

      <div className="place-overlay">
        <h2 className="place-title">{title}</h2>
        <div className="underline-orange"></div>
        <p className="place-desc-overlay">{description}</p>
      </div>



      <button onClick={onMoreInfo} className="place-button">
        <FaArrowLeft />
      </button>
    </div>
  );
};

export default PlaceCard;
