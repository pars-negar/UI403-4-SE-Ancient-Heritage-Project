import React, { cloneElement, useEffect, useState } from "react";
import TourCard from "../../components/Card/TourCard";
import TourPage from "../TourPage/TourPage";
import axios from "axios";
import Navbar from '../../components/Navbar/Navbar';
import image from '../../assets/images/1.png';
import imageTwo from '../../assets/images/2.png';
import styles from './home.module.css';
// import SearchBox from "../../components/SearchBox";
import CityAttraction from "../../components/Card/CityAttraction";
import im from '../../assets/images/1.png';
import data from '../../assets/data.json';
import TourismAttractionCard from "../../components/Card/tourismAttractionCard";
import Comments from '../../components/Comments/Testimonials';
import FAQAccordian from '../../components/FAQ/FAQAccordion';
import Footer from '../../components/Footer/Footer';

const Home = () => {

  const [tours, setTours] = useState([])

  useEffect(() => {
    get_data()
    
     }, []);

  async function get_data(event) {
    try {
        const response = await axios.get("http://localhost:8001/tours");
        if (response.status === 200) {
          console.log(response)
          setTours(response.data)
        }
      }
      catch (e) {
      console.log(e)}
  }

  
  return (
    <div className="home">
      <Navbar />
      <div className={ styles.carousel }>
        <img className={styles.imageOne} src={ image } alt="image" />
      </div>

      <div className={ styles.about } >
        <img className={styles.imageTwo} src={ imageTwo } alt="image2" />
      <div className={ styles.aboutText } >
        <h2>درباره سامانه پارس نگار</h2>
        <div className={ styles.paragraphContainer }>
          <p>این سیستم یک وب‌سایت گردشگری است که با هدف نمایش و معرفی آثار باستانی ایران طراحی شده است. کاربران می‌توانند اطلاعات جامع و دقیقی درباره مکان‌های تاریخی کشور، به همراه عکس‌های معتبر، توضیحات، موقعیت جغرافیایی و نقد و بررسی‌های سایر کاربران دریافت کنند.</p>
        </div>
      </div>
      </div>

      {/* <SearchBox /> */}

      <CityAttraction
        cityName="اصفهان"
        imageSrc="./assets/images/esf.png"
      />

      <div className={styles.tourCardContainer}>
       {tours.map((tour) => (
       <TourCard key={tour.id} tour={tour} />
       ))}
      </div>



    <div>
    <TourismAttractionCard
        image="/assets/images/takht-jamshid.png"
        title="تخت جمشید"
        description="!شکوه بی‌همتای امپراتوری هخامنشی را از نزدیک لمس کنید"
        backgroundColor="#FF8C1A"/>
    </div>
    
    <Comments />
    <FAQAccordian />
    <Footer />
    </div>
  );
};

export default Home;








{/* {tours.map((tour) => (
  <TourCard key={tour.id} tour={tour} />
))} */}