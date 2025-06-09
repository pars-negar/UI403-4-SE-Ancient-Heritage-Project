import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TourInfoList from '../Card/TourInfoList';

const ProfiletourListLeft = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [upcomingTours, setUpcomingTours] = useState([]);
  const [pastTours, setPastTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/dashboard/tours/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        setUpcomingTours(response.data.upcoming_tours || []);
        setPastTours(response.data.past_tours || []);
      } catch (error) {
        console.error("خطا در دریافت لیست تورها:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="bg-[var(--color-light-gray)] w-full h-auto flex flex-col justify-center items-center">
      <hr className="bg-[--color-gray] w-full !mt-[2rem]" />
      <div className="flex justify-start items-center w-full mr-[6rem]">
        <h1 className="!text-[30px] border-r-4 border-[#205781] pr-1.5 !mb-5" style={{ fontFamily: 'Vazirmatn', fontWeight: 500 }}>
          لیست تورها
        </h1>
      </div>

      <div className="!bg-white !rounded-xl !shadow-md !flex-grow !p-4 sm:!p-6 !flex !flex-col !items-start mr-20 ml-20">
        <div className="!flex !mb-[-1.5rem]">
          <button
            onClick={() => setActiveTab('available')}
            className={`!py-2 !pr-3 !pl-6 !text-base sm:!text-lg !font-medium !focus:outline-none !transition-colors !duration-150 !ease-in-out !border-r-[4px] !text-right !whitespace-nowrap !rounded-none ${
              activeTab === 'available'
                ? '!border-[#205781] !text-black !font-semibold'
                : '!border-[#647683] !text-[#959494] !font-medium'
            } !ml-1 sm:!ml-4`}
            style={{ fontFamily: 'Vazirmatn' }}
          >
            تور های موجود
          </button>
          <button
            onClick={() => setActiveTab('previous')}
            className={`!py-2 !pr-3 !pl-6  !text-base sm:!text-lg !font-medium !focus:outline-none !transition-colors !duration-150 !ease-in-out !border-r-[4px] !text-right !whitespace-nowrap !rounded-none ${
              activeTab === 'previous'
                ? '!border-[#205781] !text-black !font-semibold'
                : '!border-[#647683] !text-[#959494] !font-medium'
            }`}
            style={{ fontFamily: 'Vazirmatn' }}
          >
            تور های قبلی
          </button>
        </div>

        <div className="!flex-grow !w-full !self-stretch">
          {loading ? (
            <p style={{ fontFamily: 'Vazirmatn' }}>در حال بارگذاری...</p>
          ) : activeTab === 'available' ? (
            <TourInfoList tours={upcomingTours} />
          ) : (
            <TourInfoList tours={pastTours} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfiletourListLeft;
