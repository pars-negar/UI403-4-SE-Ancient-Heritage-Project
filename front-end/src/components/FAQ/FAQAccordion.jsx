import React, { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    question: "۱. مکان‌های تاریخی معرفی شده در سایت چگونه انتخاب می‌شوند؟",
    answer: "پاسخ: مکان‌های تاریخی توسط تیم ما و کارشناسان گردشگری انتخاب می‌شوند و براساس منابع معتبر و محبوبیت اضافه می‌شوند."
  },
  {
    question: "۲. چگونه می‌توانم یک تور تاریخی رزرو کنم؟",
    answer: "از طریق صفحه تورها، تور مورد نظرتان را انتخاب و مراحل رزرو را تکمیل کنید."
  },
  {
    question: "۳. آیا امکان تغییر یا لغو رزرو وجود دارد؟",
    answer: "بله، تا ۴۸ ساعت قبل از شروع تور می‌توانید لغو یا تغییر دهید."
  },
  {
    question: "۴. آیا می‌توانم از سایت شما برای نوشتن نظر یا پیشنهادات استفاده کنم؟",
    answer: "بله، در بخش تماس با ما یا پیشنهادات می‌توانید بازخورد خود را ثبت کنید."
  },
  {
    question: "۵. آیا تورها شامل راهنمای حرفه‌ای هستند؟",
    answer: "بله، تمامی تورهای ما همراه با راهنمای مجرب و آشنا به تاریخچه مکان‌ها برگزار می‌شوند."
  },
  {
    question: "۶. چطور می‌تونم اطلاعات بیشتری درباره هر مکان تاریخی پیدا کنم؟",
    answer: "در صفحه مربوط به هر تور، توضیحات کامل، عکس‌ها و اطلاعات تاریخی مکان قرار دارد."
  }
];

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="!p-[1.25rem]">
      <h2 className="!mr-[3rem] relative" style={{fontFamily: 'Vazirmatn', fontWeight: 700}}>سوالات متداول
        <span 
          className='inline-block w-[0.3rem] h-[3rem] bg-[var(--color-dark-blue)] absolute right-[-0.625rem] rounded-2xl'>
        </span>
      </h2>
      <div className="faq-section">
        {faqData.map((item, index) => (
          <div className="faq-item" key={index}>
            <button
              className={`faq-question ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <span>{item.question}</span>
              <span className="icon">{activeIndex === index ? "˄" : "˅"}</span>
            </button>
            {activeIndex === index && (
              <div className="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
