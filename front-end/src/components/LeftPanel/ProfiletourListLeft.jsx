import React, { useState } from 'react';
import TourInfoList from '../Card/TourInfoList'; 

const ProfiletourListLeft = () => {
  const [activeTab, setActiveTab] = useState('available');

  return (
    <div className="p-6 md:p-8 h-full flex flex-col text-right">
      <hr className="border-gray-300 mb-6" />

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800" style={{ fontFamily: 'Vazirmatn', fontWeight: 700 }}>
        لیست تور ها
      </h1>

      <div className="flex mb-6 border-b border-gray-300">
        <button
          onClick={() => setActiveTab('available')}
          className={`py-2 px-4 text-base sm:text-lg font-medium focus:outline-none transition-colors duration-150 ease-in-out
            ${activeTab === 'available'
              ? 'border-b-2 border-[var(--color-orange)] text-[var(--color-orange)] font-semibold'
              : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-400'
            }
            ml-1 sm:ml-4`} 
          style={{ fontFamily: 'Vazirmatn' }}
        >
          تور های موجود
        </button>
        <button
          onClick={() => setActiveTab('previous')}
          className={`py-2 px-4 text-base sm:text-lg font-medium focus:outline-none transition-colors duration-150 ease-in-out
            ${activeTab === 'previous'
              ? 'border-b-2 border-[var(--color-orange)] text-[var(--color-orange)] font-semibold'
              : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-400'
            }`}
          style={{ fontFamily: 'Vazirmatn' }}
        >
          تور های قبلی
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md flex-grow p-0"> 
        {activeTab === 'available' && (
          
          <TourInfoList />
        )}
        {activeTab === 'previous' && (
          <div className="p-4 sm:p-6"> 
            <p className="text-gray-700" style={{ fontFamily: 'Vazirmatn' }}>
              لیست تورهای برگزار شده یا منقضی شده در اینجا نمایش داده خواهد شد.
            </p>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfiletourListLeft;