import React from 'react';
import TourismAttraction from "./tourismAttractionCard";

const ThreeTourismAttractions = () => {
  const attractions = [
    {
      image:'/assets/images/takht-jamshid.png' ,
      title: 'تخت جمشید',
      description: 'شکوه بی‌همتای امپراتوری هخامنشی را از نزدیک لمس کنید!',
    },
    {
      image: '/assets/images/naghshejahan.png',
      title: 'میدان نقش جهان',
      description: 'جایی که تاریخ، هنر و شکوه صفوی در قلب اصفهان زنده می‌شود!',
    },
    {
      image:'/assets/images/argbam.png',
      title: 'ارگ بم',
      description: 'بزرگ‌ترین سازه‌ی خشتی جهان، شکوه تاریخ در دل کویر!',
    },

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
