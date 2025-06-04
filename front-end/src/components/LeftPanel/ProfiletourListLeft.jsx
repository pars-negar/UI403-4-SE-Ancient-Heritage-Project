import React, { useState } from 'react';
import TourInfoList from '../Card/TourInfoList';

const ProfiletourListLeft = () => {
  const [activeTab, setActiveTab] = useState('available');

  return (
    
    <div className="!p-6 md:!p-8 !h-full !flex !flex-col !text-right">
    <hr className="!border-[var(--color-gray)] border-2 !mb-6" />

    <h1 className="!text-[px] !mb-6 border-r-4 border-[#205781] pr-1.5 " style={{fontFamily: 'Vazirmatn', fontWeight: 500}}>لیست تورها</h1>

      <div className="!bg-white !rounded-xl !shadow-md !flex-grow !p-4 sm:!p-6 !flex !flex-col !items-start mr-20 ml-20">
        
        <div className="!flex !mb-6"> 
          <button 
            onClick={() => setActiveTab('available')} 
            className={`!py-2 !pr-3 !pl-6 !text-base sm:!text-lg !font-medium !focus:outline-none !transition-colors !duration-150 !ease-in-out !border-r-[4px] !text-right !whitespace-nowrap !rounded-none ${
              activeTab === 'available' 
                ? '!border-blue-500 !text-black !font-semibold'
                : '!border-gray-400 !text-gray-700 !font-medium'
              } 
              !ml-1 sm:!ml-4`}
            style={{ fontFamily: 'Vazirmatn' }} 
          > 
            تور های موجود 
          </button> 
          <button 
            onClick={() => setActiveTab('previous')} 
            className={`!py-2 !pr-3 !pl-6  !text-base sm:!text-lg !font-medium !focus:outline-none !transition-colors !duration-150 !ease-in-out !border-r-[4px] !text-right !whitespace-nowrap !rounded-none ${
              activeTab === 'previous' 
                ? '!border-blue-500 !text-black !font-semibold'
                : '!border-gray-400 !text-gray-700 !font-medium'
              }`} 
            style={{ fontFamily: 'Vazirmatn' }} 
          > 
            تور های قبلی 
          </button> 
        </div>

        <div className="!flex-grow !w-full !self-stretch"> 
          {activeTab === 'available' && (
            <TourInfoList />
          )}
          {activeTab === 'previous' && (
            <div className="!pt-2"> 
              <p className="!text-gray-700" style={{ fontFamily: 'Vazirmatn' }}>
              لیست تورهای قبلی 
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfiletourListLeft;
