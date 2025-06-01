// src/components/TourRegistrationList.jsx
import React from 'react';

const TourRegistrationList = ({
  tourCity,
  origin,
  destination,
  registrantsCount,
  registrations,
}) => {
  return (
    <div className="flex-1 p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto border-r border-gray-200">
      <div className="relative mb-[1.9rem] flex items-center">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-blue-600 rounded-full"></div>
        <h2 
          className="text-3xl font-medium text-gray-800 pr-4" 
          style={{ fontFamily: 'Vazirmatn', fontWeight: 500 }}
        >
          لیست ثبت‌نام کنندگان تور {tourCity}
        </h2>
      </div>

      <div className="bg-blue-700 text-white rounded-lg p-6 mb-8 text-xl font-medium">
        <p className="mb-2">
          <span className="font-semibold">مبدا:</span> {origin}
        </p>
        <p className="mb-2">
          <span className="font-semibold">مقصد:</span> {destination}
        </p>
        <p>
          <span className="font-semibold">تعداد ثبت نامی‌ها:</span> {registrantsCount} نفر
        </p>
      </div>

      <div className="overflow-x-auto">
        {/* Added border and rounded-lg to the table itself */}
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            {/* Changed background color of the header row */}
            <tr className="text-black text-sm leading-normal" style={{ backgroundColor: '#8bb4d5', fontFamily: 'Vazirmatn', fontWeight: 500 }}>
              <th className="py-3 px-6 text-right border-b !border-gray-600">ردیف</th>
              <th className="py-3 px-6 text-right border-b  border-l !border-black">نام و نام خانوادگی</th>
              <th className="py-3 px-6 text-right border-b  border-l border-black">کد ملی</th>
              <th className="py-3 px-6 text-right border-b  border-l border-black">شماره تماس</th>
              <th className="py-3 px-6 text-right border-b  border-l border-black">وضعیت پرداخت</th>
              <th className="py-3 px-6 text-right border-b  border-l border-black">زمان ثبت‌نام</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light" style={{fontFamily:"Vazirmatn" , fontWeight:400, color: '#205781' + ' !important' }}>
            {registrations.map((reg, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50"> 
                <td className="py-3 px-6 text-right whitespace-nowrap">{index + 1}</td>
                <td className="py-3 px-6 text-right whitespace-nowrap border-l border-black">{reg.fullName}</td>
                <td className="py-3 px-6 text-right whitespace-nowrap border-l border-black">{reg.nationalCode}</td>
                <td className="py-3 px-6 text-right whitespace-nowrap border-l border-black">{reg.phoneNumber}</td>
                <td className="py-3 px-6 text-right whitespace-nowrap border-l border-black">{reg.paymentStatus}</td>
                <td className="py-3 px-6 text-right whitespace-nowrap border-l border-black">{reg.registrationTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TourRegistrationList;