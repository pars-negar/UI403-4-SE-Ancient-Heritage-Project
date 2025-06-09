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
  const [cities, setCities] = useState([]);

 console.log("filtering with search:", search);
const getData = async () => {
  setLoading(true);
  const token = localStorage.getItem('accessToken');

  console.log("🟢 sending request with:", {
    term: search.term,
    province: search.province,
    periods: search.periods
  });

  try {
    const response = await axios.get(
      
      "http://127.0.0.1:8000/api/homepage/attraction-page/",
      {
          headers: {
    Authorization: `Bearer ${token}`,  // حتماً 'Bearer' باشد
  },
params: {
  search: search.term,
  city: search.province,  // چون بک‌اند انتظار city داره نه province
  historical_period: search.periods.join(",")  // چون بک‌اند انتظار historical_period داره
}

      }
    );

    console.log("🟩 پاسخ از سرور:", response.data);

    if (response.status === 200) {
      if (response.data.search_results) {
        setPopular(response.data.search_results);
        setGems([]);
      } else {
        setPopular(response.data.featured);
        setGems(response.data.hidden);
      }
    }
  } catch (error) {
    console.error("خطا در هنگام دریافت اطلاعات:", error);
  } finally {
    setLoading(false);
  }
};


const getCities = async () => {
  const token = localStorage.getItem('accessToken'); 
  try {
      const response = await axios.get("http://127.0.0.1:8000/api/homepage/places/cities/", {
        headers: {
          Authorization: `Bearer ${token}`,  // حتماً 'Bearer' باشد
        }
      });

    if (response.status === 200) {
      console.log("🔍 response.data:", response.data);
      if (Array.isArray(response.data.cities) && response.data.cities.length > 0) {
        setCities(response.data.cities); // ✅ درست شد
        console.log("✅ لیست شهرها:", response.data.cities);
      }
    }
  } catch (error) {
    console.error("خطا در گرفتن لیست شهرها:", error);
  }
};



  const handleMoreInfo = async (placeSummary) => {

    if (!placeSummary || !placeSummary.id) {
      console.warn("خلاصه مکان یا شناسه برای دریافت جزئیات کامل وجود ندارد.");
      return;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/attractions/${placeSummary.id}/`);
      
      if (response.status === 200) {
        setSelectedPlace(response.data); 
      } else {
        console.error("دریافت جزئیات کامل مکان ناموفق بود. وضعیت:", response.status);
  
        setSelectedPlace(placeSummary); 
      }
    } catch (error) {
      console.error("خطا در دریافت جزئیات کامل مکان:", error);
      setSelectedPlace(placeSummary); 
    }
  };

useEffect(() => {
  getCities();
}, []);


useEffect(() => {
  getData();
}, [JSON.stringify(search)]);


  return (
    <div>
      <Navbar />
      <HeroSection
        text={`جاذبه‌های تاریخی ایران${param.city ? "/" + param.city : ""}`}
        showImage={true}
      />

      <div className={styles.editSearch}>
        <SearchFilter search={search} setSearch={setSearch} cities={cities} />
      </div>

      <div className={styles.compJazebe}>
        <PlaceSection
          title="پربازدیدترین مکان‌های تاریخی"
          places={popularPlaces}
          onMoreInfo={handleMoreInfo}
        />
        {hiddenGems.length > 0 && ( 
            <PlaceSection
                title="کمتر شناخته‌شده اما جذاب"
                places={hiddenGems}
                onMoreInfo={handleMoreInfo}
            />
        )}
        
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