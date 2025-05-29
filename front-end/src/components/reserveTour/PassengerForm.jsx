// src/components/reserveTour/PassengerForm.jsx
import React from "react";

const months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const generateYears = () => {
  const years = [];
  for (let i = 1403; i >= 1300; i--) years.push(i);
  return years;
};

const PassengerForm = ({ tourPath, tourTitle }) => {
  return (
    <div className="p-0 max-w-4xl mx-auto mt-20" dir="rtl">
      <div className="text-sm text-gray-700 text-right mb-2">{tourPath}</div>

      <div className="flex items-center text-right mb-6">
        <div className="w-1 h-6 bg-blue-700 ml-2"></div>
        <h1 className="!text-3xl font-bold">{tourTitle}</h1>
      </div>

      <div className=" rounded-xl p-6 " style={{borderLeft: "2px solid #205781", borderBottom: "4px solid #205781e2", borderRight: "2px solid #205781", borderTop: "3px solid #205781", boxShadow: "1px 3px 10px 	#585858"}}>
        <h2 className="text-center !text-xl font-semibold mb-4">
          اطلاعات مسافر
        </h2>

        {/* ردیف اول */}
        <div className="flex flex-wrap gap-4 mb-4 justify-start">
          <input
            type="text"
            placeholder="نام"
            className=" rounded px-4 py-2 text-sm w-40"
            style={{border: "2px solid #474747"}}
          />
          <input
            type="text"
            placeholder="نام خانوادگی"
            className=" rounded px-4 py-2 text-sm w-40"
            style={{border: "2px solid #474747"}}
          />
          <input
            type="number"
            placeholder="کد ملی"
            className="rounded px-4 py-2 text-sm w-40"
            style={{border: "2px solid #474747"}}
          />
          <input
            type="tel"
            placeholder="شماره موبایل"
            className="rounded px-5 py-3 text-base w-64"
            style={{border: "2px solid #474747"}}
          />
        </div>

        {/* ردیف دوم */}
        <div className="flex flex-wrap gap-4 mb-4 justify-start">
          {/* تاریخ تولد */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              تاریخ تولد:
            </label>
            <div className="flex rounded overflow-hidden text-sm"
            style={{border: "2px solid #474747"}}>
              <select className="px-2 py-3 border-l bore w-16 focus:outline-none">
                <option>روز</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select className="px-2 py-3 border-l w-16 focus:outline-none">
                <option>ماه</option>
                {months.map((month, idx) => (
                  <option key={idx}>{month}</option>
                ))}
              </select>
              <select className="px-2 py-3 w-20 focus:outline-none">
                <option>سال</option>
                {generateYears().map((year, idx) => (
                  <option key={idx}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ایمیل */}
          <input
            type="email"
            placeholder="ایمیل (اختیاری)"
            className="rounded px-4 py-3 text-sm w-64 self-end"
            style={{border: "2px solid #474747"}}
          />
        </div>
      </div>
    </div>
  );
};

export default PassengerForm;
