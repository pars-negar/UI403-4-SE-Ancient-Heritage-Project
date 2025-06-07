import React, { useState, useEffect } from 'react';

const CommentModal = ({ isOpen, onClose, onSubmit }) => {
  const [comment, setComment] = useState('');

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
    // validation
    if (comment.trim()) {
      onSubmit(comment);
      alert('نظر شما با موفقیت ثبت شد.'); // --- Alert برای ثبت موفق اضافه شد ---
      setComment(''); 
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
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative border-4 border-[#205781]"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="text-xl mb-4 text-gray-800" style={{ fontFamily: 'Vazirmatn', fontWeight: 700 }}>ثبت نظر جدید</h2>

        {/* --- تغییر در این خط: سایه با رنگ دلخواه اضافه شد --- */}
        <textarea
          className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 !focus:ring-[#009688] !focus:border-[#009688] transition duration-200 resize-none shadow-lg shadow-[#009688]/50" style={{ fontFamily: 'Vazirmatn', fontWeight: 500 }}
          placeholder="نظر خود را وارد کنید"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleSubmit}
            className="bg-[#205781] text-white py-2 !px-3 rounded-lg hover:bg-[#184567] transition duration-200 !text-[20px] !ml-1 !w-[25%]" style={{ fontFamily: 'Gandom', fontWeight: 400 }}
          >
            ثبت نظر
          </button>
          {/* <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200"
          >
            انصراف
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CommentModal;