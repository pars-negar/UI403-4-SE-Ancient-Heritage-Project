import React, { useState, useEffect } from 'react';

const CommentModal = ({ isOpen, onClose, onSubmit }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0); // --- State برای نگهداری امتیاز نهایی
  const [hoverRating, setHoverRating] = useState(0); // --- State برای افکت hover روی ستاره‌ها

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = () => {
    // --- ولیدیشن برای امتیاز اضافه شد ---
    if (rating === 0) {
      alert('لطفاً امتیاز خود را انتخاب کنید.');
      return; // جلوگیری از ادامه تابع
    }
    
    if (comment.trim()) {
      // --- ارسال امتیاز به همراه نظر در یک آبجکت ---
      onSubmit({ comment, rating }); 
      alert('نظر و امتیاز شما با موفقیت ثبت شد.');
      setComment('');
      setRating(0); // --- ریست کردن امتیاز پس از ثبت ---
      onClose();
    } else {
      alert('لطفاً نظر خود را وارد کنید.');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-lg relative border-4 border-[#205781]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl mb-4 text-gray-800" style={{ fontFamily: 'Vazirmatn', fontWeight: 700 }}>ثبت نظر جدید</h2>

        {/* --- بخش جدید: فیلد امتیازدهی ستاره‌ای --- */}
        <div className="flex items-center mb-5">
          <h3 className="text-gray-700 ml-4" style={{ fontFamily: 'Vazirmatn', fontWeight: 600 }}>امتیاز شما:</h3>
          <div className="flex flex-row-reverse"> {/* flex-row-reverse برای چیدمان راست‌چین ستاره‌ها */}
            {[5, 4, 3, 2, 1].map((star) => (
              <span
                key={star}
                className="cursor-pointer text-4xl"
                style={{
                  color: (hoverRating || rating) >= star ? '#FFC107' : '#E0E0E0', // رنگ ستاره بر اساس امتیاز یا هاور
                  transition: 'color 0.2s'
                }}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        {/* --- پایان بخش امتیازدهی --- */}

        <textarea
          className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 !focus:ring-[#009688] !focus:border-[#009688] transition duration-200 resize-none shadow-lg shadow-[#009688]/50"
          style={{ fontFamily: 'Vazirmatn', fontWeight: 500 }}
          placeholder="نظر خود را وارد کنید"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleSubmit}
            className="bg-[#205781] text-white py-2 !px-3 rounded-lg hover:bg-[#184567] transition duration-200 !text-[20px] !ml-1 !w-[25%]"
            style={{ fontFamily: 'Gandom', fontWeight: 400 }}
          >
            ثبت نظر
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;