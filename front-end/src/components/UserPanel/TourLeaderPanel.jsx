import React, { useState, useEffect } from 'react';
import axios from "axios";

import Toggle from './Toggle';
import logo from '../../assets/icons/logo.svg';
import userAvatar from '../../assets/icons/login-user-avatar.svg';

import HomeIcon from '../Icons/HomeIcon';
import EditInfoIcon from '../Icons/EditInfoIcon';
import LogoutIcon from '../Icons/LogoutIcon';

import DeleteAccountModal from './DeleteAccountModal';

const TourLeaderPanel = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('/api/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      } else {
        const errorData = await response.json();
        alert('خطا: ' + (errorData.message || 'لطفاً دوباره تلاش کنید.'));
      }
    } catch (err) {
      alert('مشکل در ارتباط با سرور.');
    } finally {
      closeModal();
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('توکن وجود ندارد.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/api/users/oneuser/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('دریافت اطلاعات کاربر ناموفق بود.');
        }
      } catch (err) {
        console.error('خطا در دریافت اطلاعات:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const baseUrl = "http://127.0.0.1:8000"; // دامنه سرور که عکس‌ها رو سرو می‌کنه

  if (loading) {
    return (
      <div className="bg-white w-[23rem] h-[30rem] flex items-center justify-center">
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="bg-white w-[23rem] h-[30rem] !max-h-3">
      <div className="flex items-center pr-[0.5rem] pt-[0.5rem] mb-[4rem]">
        <div className="relative flex items-center ml-[1.375rem]">
          <div className="w-[5rem] h-[5rem] rounded-full border !border-[var(--color-orange)]"></div>
          <img src={logo} alt="لوگو" className="absolute right-0 w-[5.59rem] h-[3.9375rem]" />
        </div>
        <hr className="!w-[5px] !h-[3.5rem] border-none !bg-[var(--color-orange)] opacity-100 rounded-[8px] !ml-[0.4375rem]" />
        <h3 className="!text-4xl" style={{ fontFamily: 'Vazirmatn', fontWeight: 500 }}>پنل کاربری</h3>
      </div>

      <div className="flex flex-col justify-center w-full h-auto mt-[2rem] items-center">
        <img
          src={userData && userData.profile_image ? `${baseUrl}${userData.profile_image}` : userAvatar}
          alt="آواتار کاربر"
          className="w-[8.75rem] h-[8.75rem] rounded-full" 
        />
        <h4 className="!text-3xl !font-bold !mt-[0.875rem]" style={{ fontFamily: 'Vazirmatn', fontWeight: 500 }}>
          {userData ? userData.username : 'نامشخص'}
        </h4>
        <h4 className="!text-2xl !mt-[0.635rem] !mb-[3.5rem]" style={{ fontFamily: 'Vazirmatn', fontStyle: 400 }}>
          {userData ? (userData.role === 'tour_manager' ? 'مسئول تور' : userData.role) : ''}
        </h4>
      </div>

      <div className="w-[23rem]">
        <div
          className="relative 
                    h-[3.2875rem] 
                    flex
                    gap-[0.6rem] 
                    items-center 
                    pr-[1.4375rem] 
                    border-b 
                    border-[var(--color-orange)]
                    text-[var(--color-gray)]
                    hover:text-black
                    hover:font-bold
                    cursor-pointer
                    group"
        >
          <HomeIcon defualtColor="var(--color-gray)" hoverColor="black" className="group-hover:text-black" />
          <a href="/"><span className="text-xl group-hover:text-black group-hover:font-bold">صفحه اصلی</span></a>
        </div>
        <div
          className="relative 
                        h-[3.2875rem] 
                        flex 
                        gap-[0.6rem] 
                        items-center 
                        pr-[1.4375rem]
                        text-[var(--color-gray)]
                      hover:text-black
                        hover:font-bold
                        cursor-pointer
                        group"
        >
          <EditInfoIcon defualtColor="var(--color-gray)" hoverColor="black" className="group-hover:text-black" />
          <a href="/profiletourleader"><span className="text-xl group-hover:text-black group-hover:font-bold text-black ">ویرایش اطلاعات</span></a>
        </div>
        <Toggle />
        <div
          className="relative 
                    h-[3.2875rem] 
                    flex 
                    gap-[0.6rem] 
                    items-center 
                    pr-[1.4375rem] 
                    text-[var(--color-gray)]
                  hover:text-black
                    hover:font-bold
                    cursor-pointer
                    group"
          onClick={openModal}
        >
          <LogoutIcon defualtColor="var(--color-gray)" hoverColor="black" className="group-hover:text-black" />
          <span className="text-xl group-hover:text-black group-hover:font-bold">حذف حساب کاربری</span>
        </div>
      </div>

      <DeleteAccountModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDeleteConfirm={handleDeleteAccount}
      />
    </div>
  );
};

export default TourLeaderPanel;
