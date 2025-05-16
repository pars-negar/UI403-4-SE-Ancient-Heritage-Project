// components/Placescard/HeroAndTitleSection.jsx
import React from 'react';
import '../Placescard/Places.css';
import heroImage from '../../assets/images/HeroSection.png';

const HeroSection = ({ text, showImage = true }) => {
  return (
    <section dir="rtl" className="w-full bg-white px-4 pt-8">
      {/* عنوان بالا سمت راست */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-start">
          <h2 className="text-base md:text-lg font-bold text-gray-800 flex items-center text-right">
            <span className="w-1 h-6 bg-orange-500 mr-4 inline-block rounded-sm"></span>
            {text}
          </h2>
        </div>
      </div>

      {/* تصویر زیر عنوان (اختیاری) */}
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
