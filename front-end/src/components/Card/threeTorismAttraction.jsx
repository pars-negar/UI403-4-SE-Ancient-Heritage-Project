import React from 'react';
import TourismAttraction from "./tourismAttractionCard";

const ThreeTourismAttractions = () => {
  const attractions = [
    

  ];

  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' ,marginTop:'90px' }}>
      {attractions.map((item, index) => (
        <TourismAttraction
          key={index}
          image={item.image}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default ThreeTourismAttractions;
