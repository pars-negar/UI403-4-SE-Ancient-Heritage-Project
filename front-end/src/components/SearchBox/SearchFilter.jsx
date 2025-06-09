import React, { useState,useEffect } from 'react';
import { Search } from "lucide-react";


const periods = [
  "دوره‌ی هخامنشیان",
  "دوره‌ی اشکانیان",
  "دوره‌ی ساسانیان",
  "دوره‌ی صفویان",
  "دوره‌ی قاجار",
  "دوره‌ی سلجوقیان",
  "دوره‌ی تیموریان",
  "دوره‌ی ایلخانیان",
];
const PERSIAN_TO_CODE = {
  "دوره‌ی هخامنشیان": "Achaemenid",
  "دوره‌ی اشکانیان": "Parthian",
  "دوره‌ی ساسانیان": "Sassanid",
  "دوره‌ی صفویان": "Safavid",
  "دوره‌ی قاجار": "Qajar",
  "دوره‌ی سلجوقیان": "Seljuk",
  "دوره‌ی تیموریان": "Timurid",
  "دوره‌ی ایلخانیان": "Ilkhanid",
};


function SearchFilter(props) {
  const cities = props.cities || [];

  const [selectedPeriods, setSelectedPeriods] = useState(props.search?.periods || []);
  const [searchTerm, setSearchTerm] = useState(props.search?.term || '');
  const [selectedProvince, setSelectedProvince] = useState(props.search?.province || '');
console.log("🟡 مقدار جستجو در زمان کلیک:", {
  term: searchTerm,
  province: selectedProvince,
  periods: selectedPeriods
});

  useEffect(() => {
  props.setSearch({
    term: searchTerm,
    province: selectedProvince,
    periods: selectedPeriods
  });
}, [searchTerm, selectedProvince, selectedPeriods]);


console.log(props)
useEffect(() => {
  setSelectedProvince(props.search?.province || '');
  setSelectedPeriods(props.search?.periods || []);
  setSearchTerm(props.search?.term || '');  // اضافه کن این خط رو
}, [props.search]);


    const togglePeriod = (persianPeriod) => {
      const code = PERSIAN_TO_CODE[persianPeriod];
      setSelectedPeriods((prev) =>
        prev.includes(code)
          ? prev.filter((p) => p !== code)
          : [...prev, code]
      );
    };


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  const handleSearchClick = () => {
    console.log('Searching for:', searchTerm, 'in province:', selectedProvince, 'with periods:', selectedPeriods);
    props.setSearch({term:searchTerm, province: selectedProvince, periods: selectedPeriods});
  };

  return (
    <div className="!max-w-4xl !mx-auto !mt-50 !p-6 !rounded-2xl !border-4 !border-[var(--color-dark-blue)] !shadow-xl font-['Vazirmatn']" dir="rtl">
      <div className="flex flex-col lg:flex-row justify-between items-center !gap-7">
        <div className="relative !w-full lg:!w-[40%] !rounded-[8px] order-1 lg:order-none"> 
          <input
            type="text"
            placeholder="هر جارو میخوای جستجو کن..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="!w-full !border !border-gray-300 !rounded-md !px-4 !py-3 !pr-10 !text-sm !text-gray-700 text-right"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 !w-5 !h-5 text-gray-400" />
        </div>

        <div className="flex items-center !w-full lg:!w-auto lg:flex-shrink-0 order-2 lg:order-none !mt-4 lg:!mt-0">
          <span className="!text-sm font-bold text-sky-900 !ml-2">شهر:</span>
          <select
            value={selectedProvince}
            onChange={handleProvinceChange}
            className="!flex-grow lg:!flex-none lg:!w-48 !border !border-gray-300 !rounded-md !px-2 !py-3 !text-sm !text-gray-700 text-right"
          >
            <option value="">همه شهرها</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSearchClick}
          className="!w-full lg:!w-auto lg:flex-shrink-0 !bg-[#18388B] hover:!bg-[#102966] !text-white !px-8 !py-3 !rounded-md !text-base !font-bold order-3 lg:order-none !mt-4 lg:!mt-0"
        >
          جستجو
        </button>
      </div>

      <div className="!mt-10 flex items-start !gap-x-4"> 
        <div className="flex-shrink-0 text-right">
            <span className="block !text-sm font-bold text-sky-900 whitespace-nowrap">دوره‌های تاریخی:</span>
            <span className="block !text-xs text-blue-700 !mt-1 whitespace-nowrap">(فیلترها {selectedPeriods.length})</span>
        </div>
        <div className="flex-1 grid grid-cols-4 !gap-x-3 !gap-y-3"> 
          {periods.map((persianPeriod) => {
            const code = PERSIAN_TO_CODE[persianPeriod];
            const selected = selectedPeriods.includes(code);
            return (
              <button
                key={code}
                onClick={() => togglePeriod(persianPeriod)}
                className={`
                  !text-xs !px-2 !py-2 !rounded-lg !border !transition-all !duration-200 !w-full !text-center
                  focus:!outline-none focus:!ring-2 focus:!ring-offset-1
                  ${selected
                    ? "!bg-sky-700 !border-sky-800 !text-white !font-semibold focus:!ring-sky-600"
                    : "!bg-white !border-gray-300 !text-gray-700 hover:!bg-gray-50 hover:!border-gray-400 focus:!ring-sky-500"
                  }
                `}
              >
                {persianPeriod}
              </button>
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
