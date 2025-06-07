// pages/PlacesPage.jsx
import React, { useEffect, useState } from 'react';
import PlaceSection from '../../components/Placescard/PlaceSection';
import PlaceModal from '../../components/Placescard/PlaceModal';
import "../../components/Placescard/Places.css";
import styles from "./PlacesPage.module.css";
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import SearchFilter from '../../components/SearchBox/SearchFilter';
import HeroSection from '../../components/Placescard/HeroSection';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PlacesPage = () => {
  const param = useParams();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [hiddenGems, setGems] = useState([]);
  const [popularPlaces, setPopular] = useState([]);
  const [search, setSearch] = useState({
  term: param.city || "",
  province: "",
  periods: []
});

  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);  // ✅ استیت برای نگهداری لیست شهرها

  // ✅ گرفتن لیست جاذبه‌ها (پیش‌فرض یا جستجو)
  const getData = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/homepage/attraction-page/",
      {
        params: {
          search: search.term,
          province: search.province,
          periods: search.periods.join(",")
        }
      }
    );

    if (response.status === 200) {
      if (response.data.search_results) {
        setPopular(response.data.search_results);
        setGems([]);
      } else {
        setPopular(response.data.featured);
        setGems(response.data.hidden);
      }
      setLoading(false);
    }
  } catch (error) {
    console.error("Error during fetch: ", error);
    setLoading(false);
  }
};

  
  const getCities = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/homepage/places/cities/");
      if (response.status === 200) {
        setCities(response.data); 
      }
    } catch (error) {
      console.error("خطا در گرفتن لیست شهرها:", error);
    }
  };


  useEffect(() => {
    getData();
    getCities();
  }, []);


useEffect(() => {
  if (search.term || search.province || (search.periods && search.periods.length > 0)) {
    getData();
  }
}, [search]);


  return (
    <div>
      <Navbar />
      <HeroSection
        text={`جاذبه‌های تاریخی ایران${param.city ? "/" + param.city : ""}`}
        showImage={true}
      />

      <div className={styles.editSearch}>
        <SearchFilter setSearch={setSearch} cities={cities} /> {/* ✅ ارسال لیست شهرها */}
      </div>

      <div className={styles.compJazebe}>
        <PlaceSection
          title="پربازدیدترین مکان‌های تاریخی"
          places={popularPlaces}
          onMoreInfo={setSelectedPlace}
        />
        <PlaceSection
          title="کمتر شناخته‌شده اما جذاب"
          places={hiddenGems}
          onMoreInfo={setSelectedPlace}
        />
        
        <PlaceModal
          show={!!selectedPlace}
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      </div>

      <Footer />
    </div>
  );
};

export default PlacesPage;
