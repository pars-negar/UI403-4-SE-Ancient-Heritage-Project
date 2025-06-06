import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "../../index.css";
import styles from "./home.module.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TourCard from "../../components/Card/TourCard";
import CityAttraction from "../../components/Card/CityAttraction";
import Comments from "../../components/Comments/Testimonials";
import FAQAccordion from "../../components/FAQ/FAQAccordion";
import FourCityCards from "../../components/Card/FourCityCards";
import TourismAttractions from "../../components/Card/tourismAttractionCard";
import SearchBox from "../../components/SearchBox/SearchBox";
import tomb from "../../assets/images/tomb.png";
import image from "../../assets/images/1.png";

import ArrowRight from "../../components/Icons/ArrowRight";
import ArrowLeft from "../../components/Icons/ArrowLeft";

import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6"; 

const Home = () => {
  const [tours, setTours] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/homepage/"
      );
      if (response && response.status === 200) {
        console.log(response.data);
        setTours(response.data.tours || []);
        setAttractions(response.data.attractions || []);
        setFaqs(response.data.faqs || []);
        setHeaders(response.data.headers || []);
        setLoading(false);
      } else {
        console.error("Failed to fetch data", response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during fetch: ", error);
      setLoading(false);
    }
  };

  return (
    <div className="home rtl">
      <Navbar />

      {/* Carousel Section */}
      <div className={styles.carousel}>
        <p className={`${styles.paraone}`}>
          <span style={{ fontWeight: "700", fontSize: "4rem" }}>
            سفر به دل تاریخ ایران با پارس نگار، <br />
          </span>
          <span style={{ fontWeight: "300", fontSize: "2.5rem" }}>
            جایی که هر قدم، روایت‌گر شگفتی‌های باستانی <br />و فرهنگ بی‌پایان
            این سرزمین است!
          </span>
        </p>
        <img className={styles.imageOne} src={image} alt="header" />
      </div>

      {/* About Section */}
      <div className={styles.about}>
        <h2>درباره سامانه پارس نگار</h2>
        <div>
          <p
            className="m-[11rem] text-[1.3rem]"
            style={{ fontFamily: "Vazirmatn", fontWeight: 300 }}
          >
            این سیستم یک وب‌سایت گردشگری است که با هدف نمایش و معرفی آثار
            باستانی ایران طراحی شده است. کاربران می‌توانند اطلاعات جامع و دقیقی
            درباره مکان‌های تاریخی کشور، به همراه عکس‌های معتبر، توضیحات، موقعیت
            جغرافیایی و نقد و بررسی‌های سایر کاربران دریافت کنند.
          </p>
        </div>
      </div>

      {/* Four Cities Section */}
      <div className="flex justify-center">
        <div className="flex column gap-[2rem]">
          <div className="h-full mt-[3rem] relative">
            <h2
              className="!mb-[3rem]"
              style={{
                fontFamily: "Vazirmatn",
                fontWeight: 700,
                color: "var(--color-dark-blue)",
              }}
            >
              جاذبه‌های تاریخی ایران
              <span className="inline-block w-[0.3rem] h-[3rem] bg-[var(--color-dark-blue)] absolute right-[-0.625rem] rounded-2xl ml-[0.625rem]"></span>
            </h2>

            <p
              className=""
              style={{
                fontFamily: "Vazirmatn",
                fontWeight: 400,
                fontSize: "1.6rem",
                lineHeight: "1.8",
              }}
            >
              کشف ایران، <br />{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#160;&#160;&#160;لمس تاریخ، <br />{" "}
              &#160;&#160;&#160;تجربه‌ای فراموش‌نشدنی!
            </p>
            <button
              className="w-[5rem] absolute !left-10 whitespace-nowrap flex justify-center !rounded-[0.7rem] !mt-[2rem]"
              style={{
                fontFamily: "Gandom",
                color: "var(--color-dark-blue)",
                border: "2px solid var(--color-dark-blue)",
                padding: "0.5rem 0.1rem",
              }}
            >
              مشاهده بیشتر
            </button>
          </div>
          <div className={styles.fourCity}>
            <FourCityCards />
          </div>
        </div>
      </div>

      {/* SearchBox */}
      <div className={styles.HomeEditSearchBox}>
        <SearchBox />
      </div>

      {/* Tours Section */}
      <div id="home-tour-card">
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' ,marginTop:'90px' }}>
            {loading ? (
              <p>در حال بارگذاری...</p>
            ) : (
              tours && tours.map((tour) => <TourCard key={tour.id} tour={tour} />)
            )}
          </div>
      </div>

      {/* Middle Image */}
      <img className={styles.tomb} src={tomb} alt="tomb" />

      {/* Attractions Section */}
      <div className="flex justify-between items-center !mb-[1rem]">
        <div className="flex items-center !mr-[3rem]">
          <hr className="!w-[5px] !h-[3rem] border-none !bg-[var(--color-dark-blue)] opacity-100 rounded-[8px] !ml-[0.4375rem]" />
          <h3 className="!text-4xl" style={{ fontFamily: 'Vazirmatn', fontWeight: 700 }}>جاذبه‌های برتر</h3>
        </div>
        <div className="flex gap-[1.75rem] ml-[3rem]">
          <button onClick={scrollRight}>
            <ArrowRight defualtColor="black" hoverColor="var(--color-dark-blue)" className="cursor-pointer"/>
          </button>
          <button onClick={scrollLeft}>
            <ArrowLeft defualtColor="black" hoverColor="var(--color-dark-blue)" className="cursor-pointer"/>
          </button>
        </div>
      </div>
      <div className={styles.attractionsSection}>
        <div className="overflow-x-auto scroll-smooth no-scrollbar" ref={scrollRef}>
        <div className="flex gap-4 mt-20 w-max px-6">
            { loading ? (
                <p>در حال بارگذاری...</p>
              ) : (
                attractions &&
                attractions.map((attraction) => (
                  <TourismAttractions 
                    key={attraction.id} 
                    title={attraction.title}
                    image={attraction.image}
                    description={attraction.subtitle}

                    backgroundColor="#FF8C1A"
                  />
                )
              )
              )}
          </div>
        </div>
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
