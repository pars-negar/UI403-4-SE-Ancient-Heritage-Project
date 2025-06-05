import React, { useState } from 'react';
import Toggle from './Toggle';
import logo from '../../assets/icons/logo.svg';
import userAvatar from '../../assets/images/user-avatar.png';
import home from '../../assets/icons/home.svg';
import userProfile from '../../assets/icons/user-profile.svg';
import logout from '../../assets/icons/logout.svg';
import DeleteAccountModal from './DeleteAccountModal';

import HomeIcon from '../Icons/HomeIcon';
import EditInfoIcon from '../Icons/EditInfoIcon';
import LogoutIcon from '../Icons/LogoutIcon';

const TourLeaderPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('/api/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        localStorage.removeItem('authToken');
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
        <img src={userAvatar} alt="آواتار کاربر" className="w-[8.75rem] h-[8.75rem] rounded" />
        <h4 className="!text-3xl !font-bold !mt-[0.875rem]" style={{ fontFamily: 'Vazirmatn', fontWeight: 500 }}>محمدرضا مرادی</h4>
        <h4 className="!text-2xl !mt-[0.635rem] !mb-[3.5rem]" style={{ fontFamily: 'Vazirmatn', fontStyle: 400 }}>مسئول تور</h4>
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
                    group
                    "
                    
            >
          {/* <img src={home} alt="آیکون خانه" className="w-[1.625rem] h-[1.625rem]" /> */}
          <HomeIcon defualtColor="var(--color-gray)" hoverColor="black" className="group-hover:text-black"/>
          <span className="text-xl group-hover:text-black group-hover:font-bold">صفحه اصلی</span>
        </div>
        <div className="relative 
                        h-[3.2875rem] 
                        flex 
                        gap-[0.6rem] 
                        items-center 
                        pr-[1.4375rem]
                        text-[var(--color-gray)]
                      hover:text-black
                        hover:font-bold
                        cursor-pointer
                        group
                        ">
          {/* <img src={userProfile} alt="آیکون پروفایل کاربر" className="w-[1.625rem] h-[1.625rem]" /> */}
          <EditInfoIcon defualtColor="var(--color-gray)" hoverColor="black" className="group-hover:text-black"/>
          <span className="text-xl group-hover:text-black group-hover:font-bold">ویرایش اطلاعات</span>
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
          {/* <img src={logout} alt="آیکون خروج" className="w-[1.625rem] h-[1.625rem]" /> */}
          <LogoutIcon defualtColor="var(--color-gray)" hoverColor="black" className="group-hover:text-black"/>
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
