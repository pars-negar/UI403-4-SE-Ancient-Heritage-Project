// components/Placescard/HeroAndTitleSection.jsx
import React from "react";
import "./Places.css";
import heroImage from "../../assets/images/HeroSection.png";

const HeroSection = ({ text, showImage = true }) => {
  return (
    <section dir="rtl" className="w-full bg-white pt-8">
      <div className="w-full">
        <div className="flex justify-start">
          <h2
            className="text-base md:text-lg font-bold !mt-[3.5rem] text-gray-800 flex items-center text-right pr-0 mr-0"
            style={{ fontFamily: "vazirmatn", fontWeight: 700 }}
          >
            <span className="w-1 h-9 bg-orange-500 mr-4 ml-2 inline-block rounded-sm"></span>
            {text}
          </h2>
        </div>
      </div>
      {showImage && (
        <div className="mt-8 flex justify-center">
          <img
            src={heroImage}
            alt="جاذبه‌های تاریخی ایران"
            className="w-full max-w-6xl h-auto ml-10"
          />
        </div>
      )}
    </section>
  );
};

export default HeroSection;
