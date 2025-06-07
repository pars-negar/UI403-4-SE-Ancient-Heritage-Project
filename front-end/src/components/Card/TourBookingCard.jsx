import React, { useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";
import plus from "../../assets/icons/+.png";
import minus from "../../assets/icons/-.png"


const TourBookingCard = () => {
  const [travelerCount, setTravelerCount] = useState(1);

  const handleIncrement = () => {
    setTravelerCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setTravelerCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
  };

  return (
    <div dir="rtl" className=" w-[70%] mx-auto my-10 font-sans ">
      <div className="bg-white rounded-xl  shadow-lg p-2 !border-[#205781] !border-3">
        
        <div className="flex justify-start items-center w-full"> 
            <hr className='!w-[5px] !h-[2.75rem] border-none !bg-[var(--color-dark-blue)] opacity-100 rounded-[8px] !ml-[0.4375rem]'/>
            <h3 className='!text-3xl' style={{fontFamily: 'Vazirmatn', fontWeight: 700}}>تور تهران به اصفهان</h3>
        </div>
        <hr className="bg-[--color-gray] w-full !mt-[1.5rem]"/>

        <div className="flex justify-between items-center py-0">
          <span className="mr-3 text-lg font-semibold text-gray-600"style={{ fontFamily: 'Vazirmatn', fontWeight: 700 }}>قیمت برای هر نفر:</span>
          <span className="text-xl font-bold text-gray-900"style={{ fontFamily: 'Vazirmatn', fontWeight: 700 }}>4,000,000 تومان</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-4">
          
          <div className='mr-3'>
            <label htmlFor="traveler-count" className="block text-right text-base font-medium text-gray-700 mb-2"style={{ fontFamily: 'Vazirmatn', fontWeight: 700 }}>
              تعداد مسافر:
            </label>
            <div className="!w-[90%] flex items-center justify-around border border-gray-300 rounded-lg p-1.5">
              <button
                onClick={handleIncrement}
                className="flex justify-end rounded-full p-1 transition-colors "
                aria-label="افزودن مسافر"
              >
              <img className='' src={plus} alt="header" />
              </button>
              <span className="px-4 text-gray-800 font-semibold select-none whitespace-nowrap">{travelerCount} مسافر</span>
              <button
                onClick={handleDecrement}
                className="rounded-full p-1 transition-colors"
                aria-label="کاستن مسافر"
              >
              <img className='' src={minus} alt="header" />
              </button>
            </div>
          </div>
            <div className='w-[90%] mr-7'>
            <label htmlFor="room-type" className="block text-right text-base text-gray-700 mb-2"style={{ fontFamily: 'Vazirmatn', fontWeight: 700 }}>
              نوع اتاق اقامتگاه:
            </label>
            <div className="relative">
              <select
                id="room-type"
                name="room-type"
                className="appearance-none w-full bg-white border border-gray-300 rounded-lg py-2.5 px-4 text-gray-700 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" style={{ fontFamily: 'Vazirmatn', fontWeight: 700 }}
              >
                <option disabled selected value="">-</option>
                <option>اتاق یک تخته</option>
                <option>اتاق دو تخته</option>
                <option>سوئیت</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            type="button"
            className="!text-[25px] !w-[15%] !bg-[var(--color-dark-blue)] text-white font-bold !py-2 !px-4 rounded-lg !hover:bg-[#123D5E] focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300"
            style={{ fontFamily: 'Gandom', fontWeight: 400 }}
          >
            رزرو تور
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourBookingCard;