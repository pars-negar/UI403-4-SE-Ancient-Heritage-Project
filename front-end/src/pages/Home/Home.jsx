import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TourCard from "../../components/Card/TourCard";
import CityAttraction from "../../components/Card/CityAttraction";
import Comments from "../../components/Comments/Testimonials";
import FAQAccordion from "../../components/FAQ/FAQAccordion";
import FourCityCards from "../../components/Card/FourCityCards";
import ThreeTourismAttractions from "../../components/Card/threeTorismAttraction";
import SearchBox from "../../components/SearchBox/SearchBox";
import tomb from "../../assets/images/tomb.png";
import image from "../../assets/images/1.png";
import styles from "./home.module.css";

const Home = () => {
  const [tours, setTours] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/homepage/");
      if (response && response.status === 200) {
        console.log(response.data);
        setTours(response.data.tours || []);
        setAttractions(response.data.attractions || []);
        setFaqs(response.data.faqs || []);
        setHeaders(response.data.headers || []);
        setLoading(false); // Change loading state to false when data is loaded
      } else {
        console.error("Failed to fetch data", response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during fetch: ", error);
      setLoading(false); // Even in case of error, set loading to false
    }
  };

  return (
    <div className="home">
      <Navbar />
      {/* Carousel Section */}
      <div className={styles.carousel}>
        <p className={styles.paraone}>
          سفر به دل تاریخ ایران با پارس نگار، <br />
          جایی که هر قدم، روایت‌گر شگفتی‌های باستانی <br />و فرهنگ بی‌پایان این
          سرزمین است!
        </p>
        <img className={styles.imageOne} src={image} alt="header" />
      </div>

      {/* About Section */}
      <div className={styles.about}>
        <h2>درباره سامانه پارس نگار</h2>
        <div className={styles.paragraphContainer}>
          <p>
            این سیستم یک وب‌سایت گردشگری است که با هدف نمایش و معرفی آثار
            باستانی ایران طراحی شده است. کاربران می‌توانند اطلاعات جامع و دقیقی
            درباره مکان‌های تاریخی کشور، به همراه عکس‌های معتبر، توضیحات، موقعیت
            جغرافیایی و نقد و بررسی‌های سایر کاربران دریافت کنند.
          </p>
        </div>
      </div>

      {/* Four Cities Section */}
      <div className={styles.fourCitySection}>
        <div className={styles.fourCity}>
          <FourCityCards />
        </div>
        <div className={styles.fourCityAbout}>
          <h2>جاذبه‌های تاریخی ایران</h2>
          <p className={styles.para}>
            کشف ایران، <br /> لمس تاریخ، <br /> تجربه‌ای فراموش‌نشدنی!
          </p>
          <button className={styles.more}>مشاهده بیشتر</button>
        </div>
      </div>

      {/* SearchBox */}
      <div className={styles.HomeEditSearchBox}>
        <SearchBox />
      </div>

      {/* Tours Section */}
      <div id="home-tour-card">
        {loading ? (
          <p>در حال بارگذاری...</p>
        ) : (
          tours && tours.map((tour) => <TourCard key={tour.id} tour={tour} />)
        )}
      </div>

      {/* Middle Image */}
      <img className={styles.tomb} src={tomb} alt="tomb" />

      {/* Attractions Section */}
      <div className={styles.attractionsSection}>
        {loading ? (
          <p>در حال بارگذاری...</p>
        ) : (
          attractions &&
          attractions.map((attraction) => (
            <CityAttraction key={attraction.id} attraction={attraction} />
          ))
        )}
      </div>

      {/* Highlighted Attractions */}
      <div>
        <ThreeTourismAttractions
          image="/assets/images/takht-jamshid.png"
          title="تخت جمشید"
          description="!شکوه بی‌همتای امپراتوری هخامنشی را از نزدیک لمس کنید"
          backgroundColor="#FF8C1A"
        />
      </div>

      {/* Comments and FAQ */}
      <Comments />
      <FAQAccordion />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
