import React from 'react';
// import PlaceCard from './PlaceCard';

const PlaceModal = ({ show, onClose, place }) => {
  if (!show) return null;

  return (
    <div className="place-modal-overlay">
      <div className="place-modal">
        <button onClick={onClose} className="place-modal-close"></button>
        <h2>{place.title}</h2>
        <img src={place.image} alt={place.title} />
        <p>{place.details}</p>
      </div>
    </div>
  );
};

export default PlaceModal;