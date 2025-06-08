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

  // ✅ گرفتن لیست جاذبه‌ها (پیش‌فرض یا جستجو)
  const getData = async () => {
    setLoading(true); // شروع لودینگ قبل از فراخوانی API
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
      }
    } catch (error) {
      console.error("خطا در هنگام دریافت اطلاعات:", error);
    } finally {
      setLoading(false); // پایان لودینگ چه موفق باشد چه خطا
    }
  };

  // ✅ گرفتن لیست شهرها
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

  // ✅ تابع جدید برای دریافت جزئیات کامل یک مکان و نمایش مدال
  const handleMoreInfo = async (placeSummary) => {
    // placeSummary فقط شامل id, title, subtitle, image است
    // برای نمایش مدال با جزئیات کامل، نیاز به فراخوانی API جدید داریم
    if (!placeSummary || !placeSummary.id) {
      console.warn("خلاصه مکان یا شناسه برای دریافت جزئیات کامل وجود ندارد.");
      return;
    }

    try {
      // ✅ این URL فرضی برای دریافت جزئیات کامل یک مکان خاص است.
      // آن را با URL واقعی API خود جایگزین کنید.
      // مثال: http://127.0.0.1:8000/api/attractions/6/
      const response = await axios.get(`http://127.0.0.1:8000/api/attractions/${placeSummary.id}/`);
      
      if (response.status === 200) {
        setSelectedPlace(response.data); // ✅ داده‌های کامل مکان را تنظیم می‌کنیم
      } else {
        console.error("دریافت جزئیات کامل مکان ناموفق بود. وضعیت:", response.status);
        // اگر جزئیات کامل گرفته نشد، می‌توانید به حالت پیش‌فرض برگردید و همان اطلاعات خلاصه را نمایش دهید
        setSelectedPlace(placeSummary); 
      }
    } catch (error) {
      console.error("خطا در دریافت جزئیات کامل مکان:", error);
      // در صورت بروز خطا، باز هم اطلاعات خلاصه را نمایش دهید
      setSelectedPlace(placeSummary); 
    }
  };


  useEffect(() => {
    getData();
    getCities();
  }, []); // فقط یک بار هنگام mount شدن

  // اگر پارامترهای جستجو تغییر کردند، دوباره داده‌ها را دریافت کن
  useEffect(() => {
    getData();
  }, [search, param.city]); // `param.city` را هم اضافه می‌کنیم چون `search.term` از آن مقدار می‌گیرد


  return (
    <div>
      <Navbar />
      <HeroSection
        text={`جاذبه‌های تاریخی ایران${param.city ? "/" + param.city : ""}`}
        showImage={true}
      />

      <div className={styles.editSearch}>
        <SearchFilter setSearch={setSearch} cities={cities} />
      </div>

      <div className={styles.compJazebe}>
        <PlaceSection
          title="پربازدیدترین مکان‌های تاریخی"
          places={popularPlaces}
          onMoreInfo={handleMoreInfo}
        />
        {hiddenGems.length > 0 && ( /* ✅ شرط برای نمایش فقط در صورت وجود داده */
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