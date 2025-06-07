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
                <TourBookingCard/>
                <TourReviews reviewsData={reviewsData} />

            <Footer />
        </>
     );
}
 
export default TourInformationPage;