import React, { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import TestimonialCard from "./TestimonialCard";
import "./testimonials.css"; 

const Testimonials = forwardRef((props, ref) => {
  const [testimonials, setTestimonials] = useState([]);
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
        setTestimonials(response.data);
      } else {
        console.error("Failed to fetch data", response);
      }
    } catch (error) {
      console.error("Error during fetch: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>در حال بارگذاری نظرات...</p>;
  }

  return (
    <div className="testimonials-container" ref={ref}>
      {testimonials.map((item, index) => {
        const color = index % 2 === 0 ? "#205781" : "#FB8101";
        return <TestimonialCard key={item.id} testimonial={item} color={color} />;
      })}
    </div>
  );
});

export default Testimonials;