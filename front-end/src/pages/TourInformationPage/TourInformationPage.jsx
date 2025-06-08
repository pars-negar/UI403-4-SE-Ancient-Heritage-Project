import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TourInformation from "../../components/TourInformation/TourInformation";


import TourReviews from "../../components/comment-tourinf/TourReviews";
import TourBookingCard from "../../components/Card/TourBookingCard";

const TourInformationPage = () => { 

  const[reviewsData , settest] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/comment/tour-comments"
      );
      if (response && response.status === 200) {
        // console.log(response.data.tours);
        settest(response.data);
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
        <>
            <Navbar />
                <div className="flex justify-center">
                  <TourInformation />
                </div>
                    <hr className="!mr-[10%] !ml-[10%] bg-[#FB8101] w-[80%] !mt-[2rem]"/>
                    <div className="!mr-[10%] flex justify-start items-center w-full"> 
                      <h1 className="!text-[25px] !mb-5" style={{fontFamily: 'Vazirmatn', fontWeight: 700}}>اطلاعات مسئول تور</h1>
                    </div>



                <TourBookingCard/>
                <TourReviews reviewsData={reviewsData} />
            <Footer />
        </>
     );
}
 
export default TourInformationPage;