import React, { useState } from 'react';
import CommentModal from './CommentModal';

function TestModal() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleCommentSubmit = (comment) => {
    console.log("نظر ثبت شده:", comment);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 font-sans p-4 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">صفحه تست مودال</h1>
      
      <button
        onClick={handleOpenModal}
        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-label="افزودن نظر جدید"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
      </button>

      <CommentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCommentSubmit}
      />
    </div>
  );
}

export default TestModal;