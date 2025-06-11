import React, { useState, useEffect } from 'react';

const CommentModal = ({ isOpen, onClose, onSubmit }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

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

  // ✅ 1. تابع را به async تبدیل می‌کنیم تا بتوانیم از await استفاده کنیم
  const handleSubmit = async () => {
    // ولیدیشن‌های اولیه سر جای خود باقی می‌مانند
    if (rating === 0) {
      alert('لطفاً امتیاز خود را انتخاب کنید.');
      return;
    }
    
    if (!comment.trim()) {
      alert('لطفاً نظر خود را وارد کنید.');
      return;
    }

    // ✅ 2. از try...catch برای مدیریت موفقیت یا شکست عملیات والد استفاده می‌کنیم
    try {
      // ✅ 3. منتظر می‌مانیم تا تابع onSubmit که از والد آمده، با موفقیت انجام شود
      await onSubmit({ comment, rating });

      // ✅ 4. این بخش کد، فقط و فقط در صورت موفقیت کامل اجرا خواهد شد
      alert('نظر و امتیاز شما با موفقیت ثبت شد.');
      setComment('');
      setRating(0);
      onClose();

    } catch (error) {
      // اگر در تابع onSubmit خطایی رخ دهد (مثلا کاربر لاگین نکرده باشد)،
      // اجرای کد به اینجا منتقل می‌شود و پیغام موفقیت نمایش داده نمی‌شود.
      // پیغام خطای اصلی (مثلا "لطفا وارد شوید") در کامپوننت والد نمایش داده شده است.
      console.error("Submission failed in parent component:", error);
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

        <div className="flex items-center mb-5">
          <h3 className="text-gray-700 ml-4" style={{ fontFamily: 'Vazirmatn', fontWeight: 600 }}>امتیاز شما:</h3>
          <div className="flex flex-row-reverse">
            {[5, 4, 3, 2, 1].map((star) => (
              <span
                key={star}
                className="cursor-pointer text-4xl"
                style={{
                  color: (hoverRating || rating) >= star ? '#FFC107' : '#E0E0E0',
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