import React, { useState, useEffect } from 'react';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import arabic_fa from "react-date-object/locales/persian_fa";
import styles from './SearchBox.module.css';

const formatDate = (date) => {
  if (!date) return "";
  return date.format("YYYY/MM/DD");
};

function SearchBox() {
  const [origins, setOrigins] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/homepage/tour/cities/");
        const data = await response.json();
        if (Array.isArray(data.origins)) setOrigins(data.origins);
        if (Array.isArray(data.destinations)) setDestinations(data.destinations);
      } catch (error) {
        console.error("خطا در دریافت شهرها:", error);
      }
    };

    fetchCities();
  }, []);

  const handleSearch = async () => {
    const searchData = {
      origin: selectedOrigin,
      destination: selectedDestination,
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
    };

    console.log("داده‌های جستجو:", searchData);

    /*
    try {
      const response = await fetch("http://127.0.0.1:8000/api/your-search-endpoint/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchData),
      });
      const result = await response.json();
      console.log("نتیجه جستجو:", result);
    } catch (err) {
      console.error("خطا در جستجوی تور:", err);
    }
    */
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        جستجوی تور
        <span className='inline-block w-[0.3rem] h-[3rem] bg-[var(--color-dark-blue)] absolute right-[-0.625rem] rounded-2xl'></span>
      </h2>

      <div className='flex mt-[4rem] gap-[5rem]'>
        <div className={styles.form}>
          {/* انتخاب مبدا */}
          <select
            className={styles.input}
            value={selectedOrigin}
            onChange={(e) => setSelectedOrigin(e.target.value)}
          >
            <option value="">مبدا (شهر)</option>
            {origins.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          {/* انتخاب مقصد */}
          <select
            className={styles.input}
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
          >
            <option value="">مقصد (شهر)</option>
            {destinations.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

         <DatePicker
  calendar={persian}
  locale={arabic_fa}
  value={startDate}
  onChange={setStartDate}
  format="YYYY/MM/DD"
  render={(value, openCalendar) => {
    return (
      <input
        onFocus={openCalendar}
        value={value}
        readOnly
        placeholder="تاریخ رفت"
        className={styles.input}
      />
    );
  }}
/>

<DatePicker
  calendar={persian}
  locale={arabic_fa}
  value={endDate}
  onChange={setEndDate}
  format="YYYY/MM/DD"
  render={(value, openCalendar) => {
    return (
      <input
        onFocus={openCalendar}
        value={value}
        readOnly
        placeholder="تاریخ برگشت"
        className={styles.input}
      />
    );
  }}
/>

          {/* دکمه جستجو */}
          <div>
            <button
              onClick={handleSearch}
              className='bg-[var(--color-dark-blue)] !w-[8rem] !h-[3rem] !p-0 text-base'
              style={{ fontFamily: 'Gandom' }}
            >
              جستجو
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
