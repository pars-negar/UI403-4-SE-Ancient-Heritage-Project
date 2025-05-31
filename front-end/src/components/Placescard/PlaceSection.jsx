// components/Placescard/PlaceSection.jsx
import React, { useRef } from "react";
import PlaceCard from "./PlaceCard";
import "../../components/Placescard/Places.css";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6"; 

const PlaceSection = ({ title, places, onMoreInfo }) => {
  const scrollRef = useRef(null);

  const scrollAmount = 350;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="my-8 ps-50 pe-50">
      <div className="place-section-header">
        {" "}

        <h2 className="place-section-title" style={{ fontFamily: "vazirmatn", fontWeight: 700 }}>{title}</h2>
        <div className="scroll-buttons">
          {" "}
          <button onClick={scrollLeft} className="scroll-button">
            {" "}
            <FaArrowLeftLong  fill="orange" style={{zIndex:32}} />
          </button>
          <button onClick={scrollRight} className="scroll-button">
            {" "}
            <FaArrowRightLong />
          </button>
        </div>
      </div>

      <div className="place-section-row-wrapper">
        {" "}
        <div className="scroll-container flex overflow-x-auto no-scrollbar gap-2 px-1 md:px-3" ref={scrollRef}>
          {" "}
          {places.map((place, idx) => (
            <div key={idx} className="min-w-[340px] max-w-[340px] mx-0.5">
              <PlaceCard {...place} onMoreInfo={() => onMoreInfo(place)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceSection;
