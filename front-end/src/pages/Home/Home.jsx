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
import TourTab from "../../components/TourTab/TourTab";

import tomb from "../../assets/images/tomb.png";
import image from "../../assets/images/1.png";
import ArrowRight from "../../components/Icons/ArrowRight";
import ArrowLeft from "../../components/Icons/ArrowLeft";
import PlaceModal from "../../components/Placescard/PlaceModal";
import CommentModal from '../../components/Comments/CommentModal';

const Home = () => {
  const [tours, setTours] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const attractionsScrollRef = useRef(null);
  const commentsScrollRef = useRef(null);
  const scrollAmount = 350;

  const scrollAttractionsLeft = () => {
    if (attractionsScrollRef.current) {
      attractionsScrollRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollAttractionsRight = () => {
    if (attractionsScrollRef.current) {
      attractionsScrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollCommentsLeft = () => {
    if (commentsScrollRef.current) {
      commentsScrollRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollCommentsRight = () => {
    if (commentsScrollRef.current) {
      commentsScrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  // --- END: تغییرات ---

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/homepage/"
      );
      if (response && response.status === 200) {
        setTours(response.data.tours || []);
        setAttractions(response.data.attractions || []);
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
const handleAttractionClick = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/homepage/attraction/${id}/`);
      if (response && response.status === 200) {
        setSelectedAttraction(response.data);
        setShowModal(true);
        console.log(response.data)
      } else {
        alert("مشکل در دریافت اطلاعات جاذبه");
      }
    } catch (error) {
      console.error(error);
      alert("خطا در دریافت اطلاعات جاذبه");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAttraction(null);
  };

    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleCommentSubmit = (comment) => {
      console.log("نظر ثبت شده:", comment);
    };
  return (
    <div className="home rtl">
      <Navbar />

      <div className={styles.carousel}>
        {/* ... */}
      </div>
      <div className={styles.about}>
        {/* ... */}
      </div>
      <div className="flex justify-center">
        {/* ... */}
      </div>
      <div className={styles.HomeEditSearchBox}>
        {/* ... */}
      </div>
      <TourTab />
      <img className={styles.tomb} src={tomb} alt="tomb" />

      {/* Attractions Section */}
      <div className="flex justify-between items-center !mb-[1rem]">
        <div className="flex items-center !mr-[3rem]">
          <hr className="!w-[5px] !h-[3rem] border-none !bg-[var(--color-dark-blue)] opacity-100 rounded-[8px] !ml-[0.4375rem]" />
          <h3 className="!text-4xl" style={{ fontFamily: 'Vazirmatn', fontWeight: 700 }}>جاذبه‌های برتر</h3>
        </div>
        <div className="flex gap-[1.75rem] ml-[3rem]">
          <button onClick={scrollAttractionsRight}>
            <ArrowRight defualtColor="black" hoverColor="var(--color-dark-blue)" className="cursor-pointer"/>
          </button>
          <button onClick={scrollAttractionsLeft}>
            <ArrowLeft defualtColor="black" hoverColor="var(--color-dark-blue)" className="cursor-pointer"/>
          </button>
        </div>
      </div>
      <div className={styles.attractionsSection}>
        <div className="overflow-x-auto scroll-smooth no-scrollbar" ref={attractionsScrollRef}>
        <div className="flex gap-4 mt-20 w-max px-6">
            { loading ? (
                <p>در حال بارگذاری...</p>
              ) : (
                attractions &&
                attractions.map((attraction , index) => {
                  let backgroundColor="";
                  if (index % 2 === 0) {
                    backgroundColor="#FF8C1A"
                  }

                  if (index % 2 !== 0) {
                    backgroundColor="#DDA853"

                  }
                  return <TourismAttractions
                    key={attraction.id}
                    id={attraction.id}
                    title={attraction.title}
                    image={attraction.image}
                    description={attraction.subtitle}
                    onClick={handleAttractionClick}
                    backgroundColor ={backgroundColor}
                  />
                }
              )
              )}
          </div>
        </div>
      </div>

      {/* Comments and FAQ */}
      <div className="mt-5 flex gap-[1.75rem] ml-[3rem]">
        <h2 className="section-title">
            نظرات کاربران <span className="section-accent" />
        </h2>
          <button
            className="!w-[9rem] absolute !left-10 whitespace-nowrap flex justify-center !rounded-[0.7rem] !mt-[1rem]"
            style={{
              fontFamily: "Gandom",
              color: "var(--color-dark-blue)",
              border: "2px solid var(--color-dark-blue)",
              padding: "0.5rem 0.1rem",
            }}
            onClick={handleOpenModal}
            aria-label="افزودن نظر جدید"
          >
            افزودن نظر
          </button>
          <CommentModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleCommentSubmit}
          />
      </div>
      <div className="overflow-x-auto scroll-smooth no-scrollbar" ref={commentsScrollRef}>
        <Comments />
      </div>
      <div className="flex justify-center !mb-[1rem]">
        <div className="flex gap-[1.75rem]">
          {/* --- START: تغییرات --- */}
          <button onClick={scrollCommentsRight}>
            <ArrowRight defualtColor="black" hoverColor="var(--color-dark-blue)" className="cursor-pointer"/>
          </button>
          <button onClick={scrollCommentsLeft}>
            <ArrowLeft defualtColor="black" hoverColor="var(--color-dark-blue)" className="cursor-pointer"/>
          </button>
          {/* --- END: تغییرات --- */}
        </div>
      </div>
      <FAQAccordion />
      <PlaceModal show={showModal} onClose={closeModal} place={selectedAttraction} />

      <Footer />
    </div>
  );
};

export default Home;