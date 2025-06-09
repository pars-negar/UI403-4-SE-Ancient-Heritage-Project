import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import TestimonialCard from "./TestimonialCard";
import "../Comments/testimonials.css";

const Testimonials = () => {
    const[testimonials , settest] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/comment/site-comments"
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
    <div className="testimonials-wrapper overflow-x-auto scroll-smooth no-scrollbar">
      <div className="flex testimonials-container overflow-x-auto scroll-smooth no-scrollbar">
        {/* {testimonials.map((item) => (
          <TestimonialCard key={item.id} testimonial={item} />
        ))} */}
          
          {testimonials.map((item, index) => {
            let color = ""
          if (index % 2 === 0) {
              color="#205781";
          }

          if (index % 2 !== 0) {
              color="#FB8101";

          }

          return <TestimonialCard key={item.id} testimonial={item} color={color}/>;
        })}
      </div>
    </div>
  );
};

export default Testimonials;
