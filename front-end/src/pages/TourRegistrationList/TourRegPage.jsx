import React, { useState, useEffect } from 'react';
import TourLeaderPanel from '../../components/UserPanel/TourLeaderPanel';
import TourRegistrationList from '../../components/UserPanel/TourRegistrationList/TourRegistrationList';

const TourRegPage = (props) => {
  const baseUrl = "http://127.0.0.1:8000";
  const [customersData, setCustomersData] = useState(null);
  const [loading, setLoading] = useState(true);

  const tourId = props.tourId;

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('توکن وجود ندارد.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/api/homepage/dashboard/tours/${tourId}/passengers/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          console.error('دریافت اطلاعات کاربر ناموفق بود.');
        } else {
          const data = await response.json();
          setCustomersData(data);
        }
      } catch (err) {
        console.error('خطا در دریافت اطلاعات:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // بررسی وضعیت بارگذاری و وجود داده
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        در حال بارگذاری داده‌ها...
      </div>
    );
  }

  if (!customersData) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        هیچ داده‌ای یافت نشد.
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-right" dir="rtl">
      {/* ستون سمت راست: پنل لیدر */}
      <div className="w-[26.25rem] bg-white shadow-lg overflow-y-auto">
        <TourLeaderPanel />
      </div>

      {/* ستون سمت چپ: لیست ثبت‌نام */}
      <div className="flex-1 p-8 overflow-y-auto">
        <TourRegistrationList
          tourCity={customersData.tourCity}
          origin={customersData.origin}
          destination={customersData.destination}
          registrantsCount={customersData.registrantsCount}
          registrations={customersData.registrations}
        />
      </div>
    </div>
  );
};

export default TourRegPage;
