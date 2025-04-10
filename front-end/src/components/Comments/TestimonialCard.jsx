import React from "react";
import "../Comments/testimonials.css";

const TestimonialCard = ({ testimonial }) => {
  const stars = "⭐".repeat(testimonial.rating);

  return (
    <div
      className="testimonial-card"
      style={{ border: `2px solid ${testimonial.borderColor}` }}
    >
      <div className="testimonial-header">
        <img src={testimonial.image} alt={testimonial.name} className="avatar" />
        <div className="info">
          <h3>{testimonial.name}</h3>
          <p className="role">{testimonial.role}</p>
        </div>
        <div className="stars">{stars}</div>
      </div>
      <p className="testimonial-text">“{testimonial.text}”</p>
    </div>
  );
};

export default TestimonialCard;
