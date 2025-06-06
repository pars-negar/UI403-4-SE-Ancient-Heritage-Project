import React, { useRef } from 'react';
import modalBgImage from '../../assets/images/deleteacc.png';

const DeleteTourModal = ({ isOpen, onClose, onDeleteConfirm }) => {
  const modalRef = useRef();

  if (!isOpen) return null;

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-70 flex justify-center items-center z-50 p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="relative bg-white shadow-2xl flex overflow-hidden"
        style={{ width: '45rem', height: '30rem', borderRadius: "40px" }}
      >
        <div className="w-1/2 h-full flex flex-col items-center justify-center p-8 text-right z-10">
          <p className="text-3xl font-bold text-gray-800 mb-10" style={{ fontFamily: 'Vazirmatn' }}>
            مطمئنی می‌خوای این تور رو حذف کنی؟
          </p>
          <div className="flex flex-col gap-6 w-full">
            <button
              onClick={onDeleteConfirm}
              className="bg-[#205781] hover:bg-[#1A4566] text-white font-bold py-3 px-8 rounded-lg text-2xl transition-colors duration-200"
              style={{ fontFamily: 'Vazirmatn' }}
            >
              بله مطمئنم
            </button>
            <button
              onClick={onClose}
              className="bg-[#FF8C00] hover:bg-[#E57B00] text-white font-bold py-3 px-8 rounded-lg text-2xl transition-colors duration-200"
              style={{ fontFamily: 'Vazirmatn' }}
            >
              حذف نکن
            </button>
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center">
          <img
            src={modalBgImage}
            alt="تصویر پس‌زمینه مدال حذف تور"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteTourModal;