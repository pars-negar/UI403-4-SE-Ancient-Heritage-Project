// pages/PlacesPage.jsx
import React, { useState } from 'react';
import PlaceSection from '../../components/Card/Placescard/PlaceSection';
import PlaceModal from '../../components/Card/Placescard/PlaceModal';
import "../../components/Card/Placescard/Places.css"
const popularPlaces = [
  {
    title: 'تخت جمشید',
    description: 'شکوه معماری ایران باستان',
    image: '/images/takht.jpg',
    details: 'در استان فارس و شهر مرودشت قرار دارد...'
  },
  {
    title: 'آرامگاه کوروش',
    description: 'محل دفن پادشاه بزرگ',
    image: '/images/cyrus.jpg',
    details: 'مکانی مقدس برای ایرانیان...'
  },
  {
    title: 'بیستون',
    description: 'کتیبه‌ای با داستانی تاریخی',
    image: '/bisoton.png',
    details: 'در کرمانشاه قرار دارد و قدمتی چند هزار ساله دارد...'
  }
];

const hiddenGems = [
  {
    title: 'قلعه رودخان',
    description: 'در دل جنگل گیلان',
    image: '/images/rudkhan.jpg',
    details: 'قلعه‌ای نظامی با چشم‌انداز فوق‌العاده...'
  },
  {
    title: 'آتشکده یزد',
    description: 'محل عبادت زرتشتیان',
    image: '/images/atashkade.jpg',
    details: 'در یزد واقع شده و هنوز فعال است...'
  },
  {
    title: 'قلعه بابک',
    description: 'دژ تاریخی بر بلندای کوه',
    image: '/images/babak.jpg',
    details: 'یادگاری از دوران بابک خرمدین...'
  }
];

const PlacesPage = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <div className="px-6 py-10">
      <PlaceSection title="پربازدیدترین مکان‌های تاریخی" places={popularPlaces} onMoreInfo={setSelectedPlace} />
      <PlaceSection title="کمتر شناخته‌شده اما جذاب" places={hiddenGems} onMoreInfo={setSelectedPlace} />
      <PlaceModal show={!!selectedPlace} place={selectedPlace} onClose={() => setSelectedPlace(null)} />
    </div>
  );
};

export default PlacesPage;
