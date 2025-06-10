import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "../../index.css";
import styles from "./home.module.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Comments from "../../components/Comments/Testimonials";
import FAQAccordion from "../../components/FAQ/FAQAccordion";
import FourCityCards from "../../components/Card/FourCityCards";
import TourismAttractions from "../../components/Card/tourismAttractionCard";
import SearchBox from "../../components/SearchBox/SearchBox";
import TourTab from "../../components/TourTab/TourTab";
import PlaceModal from "../../components/Placescard/PlaceModal";
import CommentModal from '../../components/Comments/CommentModal';

import tomb from "../../assets/images/tomb.png";
import image from "../../assets/images/1.png";
import ArrowRight from "../../components/Icons/ArrowRight";
import ArrowLeft from "../../components/Icons/ArrowLeft";

const Home = () => {
  const [tours, setTours] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  // تعریف ref ها و توابع اسکرول بر اساس کد صحیح شما
  const attractionsScrollRef = useRef(null);
  const commentsScrollRef = useRef(null);
  const scrollAmount = 350;

  const scrollAttractionsLeft = () => {
    if (attractionsScrollRef.current) {
      attractionsScrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollAttractionsRight = () => {
    if (attractionsScrollRef.current) {
      attractionsScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollCommentsLeft = () => {
    if (commentsScrollRef.current) {
      commentsScrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollCommentsRight = () => {
    if (commentsScrollRef.current) {
      commentsScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/homepage/");
      if (response && response.status === 200) {
        setTours(response.data.tours || []);
        setAttractions(response.data.attractions || []);
      } else {
        console.error("Failed to fetch data", response);
      }
    } catch (error) {
      console.error("Error during fetch: ", error);
    } finally {
        setLoading(false);
    }
  };

  const handleAttractionClick = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/homepage/attraction/${id}/`);
      if (response && response.status === 200) {
        setSelectedAttraction(response.data);
        setShowModal(true);
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

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // این تابع با منطق کامل ارسال به API جایگزین شده است
  const handleCommentSubmit = async (data) => { // data همان آبجکت { comment, rating } است
    const token = localStorage.getItem('authToken'); // کلید توکن خود را که هنگام لاگین ذخیره کرده‌اید وارد کنید

    if (!token) {
        alert('برای ثبت نظر، ابتدا باید وارد شوید.');
        return;
    }

    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/api/comment/site_comments/', // اندپوینت بک‌اند برای ساخت کامنت جدید
            {
                comment: data.comment,
                rating: data.rating
            },
            {
                headers: {
                    // فرمت هدر Authorization را مطابق با بک‌اند خود تنظیم کنید ('Token ...' یا 'Bearer ...')
                    'Authorization': `Token ${token}`
                }
            }
        );

        // اگر درخواست موفقیت آمیز باشد
        alert('نظر شما با موفقیت ثبت شد.');
        handleCloseModal(); // بستن مودال

        // نکته: برای دیدن نظر جدید، باید لیست کامنت‌ها را مجددا بارگذاری کنید
        // این کار معمولا با فراخوانی دوباره تابعی که کامنت‌ها را از سرور می‌گیرد، انجام می‌شود.
        console.log('کامنت جدید اضافه شد:', response.data);
        
    } catch (error) {
        // مدیریت خطا
        console.error("خطا در ارسال نظر:", error.response ? error.response.data : error.message);
        alert("متاسفانه در ثبت نظر شما مشکلی پیش آمد. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <div className="home rtl">
      <Navbar />

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

      <div className={styles.HomeEditSearchBox}>
        <SearchBox />
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
            {loading ? (
              <p>در حال بارگذاری...</p>
            ) : (
              attractions &&
              attractions.map((attraction, index) => {
                const backgroundColor = index % 2 === 0 ? "#FF8C1A" : "#DDA853";
                return <TourismAttractions
                  key={attraction.id}
                  id={attraction.id}
                  title={attraction.title}
                  image={attraction.image}
                  description={attraction.subtitle}
                  onClick={handleAttractionClick}
                  backgroundColor={backgroundColor}
                />
              })
            )}
          </div>
        </div>
      </div>

      {/* Comments Section */}
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
          <button onClick={scrollCommentsRight}>
            <ArrowRight defualtColor="black" hoverColor="var(--color-dark-blue)" className="cursor-pointer"/>
          </button>
          <button onClick={scrollCommentsLeft}>
            <ArrowLeft defualtColor="black" hoverColor="var(--color-dark-blue)" className="cursor-pointer"/>
          </button>
        </div>
      </div>
      
      <FAQAccordion />
      <PlaceModal show={showModal} onClose={closeModal} place={selectedAttraction} />

      <Footer />
    </div>
  );
};

export default Home;