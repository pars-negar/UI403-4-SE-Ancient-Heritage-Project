import React from "react";
import "../Comments/testimonials.css";

const TestimonialCard = ({ testimonial,color }) => {
  const stars = "⭐".repeat(testimonial.rating);

  return (
    <div
      className="testimonial-card"
      style={{ border: `2px solid ${color}` }}
    >
      <div className="testimonial-header">
        <img
  src={
    testimonial.profile_image
      ? `http://localhost:8000${testimonial.profile_image}`
      : "/default-avatar.png"
  }
  alt={testimonial.username}
  className="avatar"
/>

        <div className="info">
          <h3 style={{fontFamily: 'Vazirmatn', fontWeight: 700}}>{testimonial.username}</h3>
          <p className="role" style={{fontFamily: 'Vazirmatn', fontWeight: 400}}>{testimonial.user_role}</p>
        </div>
        <div className="stars">{stars}</div>
      </div>
      <p className="testimonial-text" style={{fontFamily: 'Vazirmatn', fontWeight: 500}}>“{testimonial.comment}”</p>
    </div>
  );
};

export default TestimonialCard;
