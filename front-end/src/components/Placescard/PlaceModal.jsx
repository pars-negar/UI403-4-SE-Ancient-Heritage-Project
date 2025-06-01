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
        <div className="row">
          <div className="col-7 bg-amber-200">
              <h2 className="" style={{ fontFamily: "vazirmatn", fontWeight: 500 }}>{place.title}</h2>
          </div>
          <div className="col-5 bg-amber-500 h-5"></div>
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
