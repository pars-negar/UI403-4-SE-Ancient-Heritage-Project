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

const PassengerForm = ({ tourPath, tourTitle, passengerIndex, onPassengerChange, passengerData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onPassengerChange(passengerIndex, name, value);
  };

  return (
    <div className="p-0" dir="rtl">
      {passengerIndex === 0 && ( // Display tour info only for the first passenger form
        <>
          <div className="text-lg text-gray-700 text-right mt-[2.2rem] mb-[3.12rem]" style={{fontFamily:'vazirmatn', fontWeight:400}}>{tourPath}</div>
          <div className="flex items-center text-right mr-0 mb-[9.5rem]">
            <div className="w-1 h-6 bg-blue-700 ml-2"></div>
            <h1 className="!text-3xl font-bold mt-[7.4rem]" style={{fontFamily:'vazirmatn', fontWeight:700}}>{tourTitle}</h1>
          </div>
        </>
      )}
      <div className="rounded-xl p-6" style={{marginRight:"110px",marginLeft:"90px",borderLeft: "2px solid #205781", borderBottom: "4px solid #205781e2", borderRight: "2px solid #205781", borderTop: "3px solid #205781", boxShadow: "1px 3px 10px #585858"}}>
        <h2 className="text-center !text-xl font-semibold mb-4" style={{fontFamily:'vazirmatn', fontWeight:700}}>
          اطلاعات مسافر {passengerIndex + 1}
        </h2>

        <div className="flex flex-wrap gap-4 mb-4 justify-start">
          <input
            type="text"
            name="firstName"
            placeholder="نام"
            value={passengerData?.firstName || ''}
            onChange={handleChange}
            className="rounded px-4 py-2 text-sm flex-grow sm:w-auto"
            style={{border: "2px solid #474747"}}
          />
          <input
            type="text"
            name="lastName"
            placeholder="نام خانوادگی"
            value={passengerData?.lastName || ''}
            onChange={handleChange}
            className="rounded px-4 py-2 text-sm flex-grow sm:w-auto"
            style={{border: "2px solid #474747"}}
          />
          <input
            type="number"
            name="nationalCode"
            placeholder="کد ملی"
            value={passengerData?.nationalCode || ''}
            onChange={handleChange}
            className="rounded px-4 py-2 text-sm flex-grow sm:w-auto"
            style={{border: "2px solid #474747"}}
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="شماره موبایل"
            value={passengerData?.phoneNumber || ''}
            onChange={handleChange}
            className="rounded px-5 py-3 text-base flex-grow sm:w-auto"
            style={{border: "2px solid #474747"}}
          />
        </div>

        <div className="flex flex-wrap gap-4 mb-4 justify-start">
          <div>
            <label className="block mb-1 text-sm font-medium">
              تاریخ تولد:
            </label>
            <div className="flex rounded overflow-hidden text-sm" style={{border: "2px solid #474747"}}>
              <select
                name="birthDay"
                value={passengerData?.birthDay || ''}
                onChange={handleChange}
                className="px-2 py-3 border-l w-16 focus:outline-none"
              >
                <option value="">روز</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select
                name="birthMonth"
                value={passengerData?.birthMonth || ''}
                onChange={handleChange}
                className="px-2 py-3 border-l w-16 focus:outline-none"
              >
                <option value="">ماه</option>
                {months.map((month, idx) => (
                  <option key={idx} value={month}>{month}</option>
                ))}
              </select>
              <select
                name="birthYear"
                value={passengerData?.birthYear || ''}
                onChange={handleChange}
                className="px-2 py-3 w-20 focus:outline-none"
              >
                <option value="">سال</option>
                {generateYears().map((year, idx) => (
                  <option key={idx} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <input
            type="email"
            name="email"
            placeholder="ایمیل (اختیاری)"
            value={passengerData?.email || ''}
            onChange={handleChange}
            className="rounded px-4 py-3 text-sm flex-grow sm:w-64 self-end"
            style={{border: "2px solid #474747"}}
          />
        </div>
      </div>
    </div>
  );
};

export default PassengerForm;