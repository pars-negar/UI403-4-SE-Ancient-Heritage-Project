import React from "react";
import TestimonialCard from "./TestimonialCard";
import "../Comments/testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "نگار شریف",
    role: "کاربر سامانه",
    image: "/prof.png",
    rating: 5,
    text: "بخش معرفی آثار تاریخی واقعاً کامل و آموزنده‌ست. توضیحات نه خیلی خشک بود، نه خیلی ساده. به جزییاتی هم اطلاعات کافی داده شده که لذت بردم.",
    borderColor: "#0d4a79",
  },
  {
    id: 2,
    name: "سما محمدی",
    role: "مسئول تور",
    image: "/prof.png",
    rating:3,
    text: "واقعاً از زمانی که از این سامانه برای مدیریت تورها استفاده می‌کنیم، کارهامون خیلی سریع‌تر و دقیق‌تر پیش میره. ثبت‌نام، بررسی مدارک و مدیریت گروه‌ها همه در یک پنل جمع شده. خیلی راضیم!",
    borderColor: "#f2994a",
  },
  {
    id: 3,
    name: "علی موسوی",
    role: "کاربر سامانه",
    image: "/prof.png",
    rating: 4,
    text: "سامانه خیلی کاربردیه و استفاده از اون آسونه. امکانات خوبی داره برای رزرو و مشاهده تورها. فقط ای کاش اپلیکیشن موبایل هم داشت.",
    borderColor: "#0d4a79",
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials-wrapper">
      <h2 className="section-title">
        نظرات کاربران <span className="section-accent" />
      </h2>
      <div className="testimonials-container">
        {testimonials.map((item) => (
          <TestimonialCard key={item.id} testimonial={item} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
