import React from "react";
import "./Places.css";

const PlaceModal = ({ show, onClose, place }) => {
  if (!show) return null;

  return (
    <div className="place-modal-wrapper">
      <div className="place-modal">
        <button onClick={onClose} className="place-modal-close">
          &times;
        </button>

        <div className="place-modal-header">
          <h2 className="place-modal-title" style={{ fontFamily: "vazirmatn", fontWeight: 500 }}>{place.title}</h2>
          <div className="place-modal-title-line"></div>
        </div>

        <div className="place-modal-image">
          <img src={place.image} alt={place.title} />
        </div>

        <div className="place-modal-content" style={{ fontFamily: "vazirmatn", fontWeight: 500 }}>
          <p>{place.details}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;
