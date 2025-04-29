import TourCard from "../../components/Card/TourCard";
import React, { cloneElement, useState, useEffect } from "react";
import axios from "axios"
import Navbar from '../../components/Navbar/Navbar'
import image from '../../assets/images/1.png'
import imageTwo from '../../assets/images/2.png'
import styles from './home.module.css'
import SearchBox from '../../components/SearchBox/SearchBox'
import CityAttraction from "../../components/Card/CityAttraction";
import im from '../../assets/images/1.png'
import data from '../../assets/data.json'
import TourismAttractionCard from "../../components/Card/tourismAttractionCard";
import Comments from '../../components/Comments/Testimonials'
import FAQAccordian from '../../components/FAQ/FAQAccordion'
import Footer from '../../components/Footer/Footer'
import FourCityCards from "../../components/Card/FourCityCards";
import tomb from '../../assets/images/tom.jpg'
import ThreeTourismAttractions from "../../components/Card/threeTorismAttraction";


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
      <div className={styles.carousel}>
      <p className={styles.paraone}>
        سفر به دل تاریخ ایران با پارس نگار، <br />
        جایی که هر قدم، روایت‌گر شگفتی‌های باستانی <br />
        و فرهنگ بی‌پایان این سرزمین است!
      </p>
      <img className={styles.imageOne} src={image} alt="image" />
    </div>

      <div className={ styles.about } >
        <h2>درباره سامانه پارس نگار</h2>
        <div className={ styles.paragraphContainer }>
          <p>این سیستم یک وب‌سایت گردشگری است که با هدف نمایش و معرفی آثار باستانی ایران طراحی شده است. کاربران می‌توانند اطلاعات جامع و دقیقی درباره مکان‌های تاریخی کشور، به همراه عکس‌های معتبر، توضیحات، موقعیت جغرافیایی و نقد و بررسی‌های سایر کاربران دریافت کنند.</p>
        </div>
      </div>

      <div className={ styles.fourCitySection }>
        <div className={styles.fourCity}>
        <FourCityCards />
        </div>
        <div className={ styles.fourCityAbout}>
            <h2>جاذبه‌های تاریخی ایران</h2>
            <p className={styles.para}>
              کشف ایران، <br /> لمس تاریخ، <br /> تجربه‌ای فراموش‌نشدنی!
            </p>
            <button className={ styles.more }>مشاهده بیشتر</button>
        </div>
      </div>
      <div className={styles.HomeEditSearchBox}><SearchBox /></div>
      <div id="home-tour-card">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      
      
    ))}
    </div>

     <img className={styles.tomb} src={tomb} alt="tomb" />

      
    <div>
    <ThreeTourismAttractions
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








// {/* {tours.map((tour) => (
//   <TourCard key={tour.id} tour={tour} />
// ))} */}