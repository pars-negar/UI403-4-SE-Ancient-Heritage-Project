import React from 'react';

const CustomAlert = ({ message, type = 'error', onClose }) => {
  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className={`${bgColor} text-white p-4 rounded-xl shadow-xl min-w-[250px] text-center`}>
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-3 bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition"
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
