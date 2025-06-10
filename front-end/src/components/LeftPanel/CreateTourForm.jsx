import React, { useState } from 'react';
import axios from 'axios';

const CreateTourForm = ({ token }) => {
  // وضعیت ورودی‌ها
  const [tourName, setTourName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('normal');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [departureTime, setDepartureTime] = useState('');
  const [returnTime, setReturnTime] = useState('');

  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('');

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const [mainImage, setMainImage] = useState(null);

  // جاذبه‌ها (یک آرایه از شناسه‌ها)
  const [attractions, setAttractions] = useState([]);

  // متن‌های اضافه
  const [accommodation, setAccommodation] = useState('');
  const [mealDetails, setMealDetails] = useState('');
  const [transportation, setTransportation] = useState('');
  const [travelInsurance, setTravelInsurance] = useState('');
  const [tourismServices, setTourismServices] = useState('');
  const [tourGuidesInfo, setTourGuidesInfo] = useState([{ name: '', specialty: '' }]); // راهنماها به صورت آرایه آبجکت

  // شرکت برگزارکننده
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');

  // برنامه روزانه (آرایه روزها)
  const [dailySchedules, setDailySchedules] = useState([
    { day_number: 1, title: 'روز اول', description: '', image: null },
  ]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // اضافه کردن روز جدید
  const addDailySchedule = () => {
    setDailySchedules(prev => [
      ...prev,
      {
        day_number: prev.length + 1,
        title: `روز ${prev.length + 1}`,
        description: '',
        image: null,
      },
    ]);
  };

  // اضافه کردن راهنما جدید
  const addTourGuide = () => {
    setTourGuidesInfo(prev => [...prev, { name: '', specialty: '' }]);
  };

  // تغییر عکس روزانه
  const handleDailyScheduleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    setDailySchedules(prev => {
      const copy = [...prev];
      copy[index].image = file;
      return copy;
    });
  };

  // تغییر اطلاعات راهنماها
  const handleGuideChange = (index, field, value) => {
    setTourGuidesInfo(prev => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  // ارسال فرم
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess('');

  try {
    const formData = new FormData();

    formData.append('category', category);
    formData.append('tour_name', tourName);
    formData.append('description', description);
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    if (departureTime) formData.append('departure_time', departureTime);
    if (returnTime) formData.append('return_time', returnTime);
    formData.append('price', price);
    formData.append('capacity', capacity);
    formData.append('origin', origin);
    formData.append('destination', destination);
    if (mainImage) formData.append('main_image', mainImage);

    // ارسال attractions به صورت چند مقدار
    attractions.forEach(id => formData.append('attractions', id));

    // ارسال متن‌های اضافی
    formData.append('accommodation', accommodation);
    formData.append('meal_details', mealDetails);
    formData.append('transportation', transportation);
    formData.append('travel_insurance', travelInsurance);
    formData.append('tourism_services', tourismServices);

    // tour_guides_info به صورت رشته JSON
    formData.append('tour_guides_info', JSON.stringify(tourGuidesInfo));

    // شرکت برگزارکننده
    formData.append('company_name', companyName);
    formData.append('company_address', companyAddress);
    formData.append('company_phone', companyPhone);
    formData.append('company_email', companyEmail);
    formData.append('company_website', companyWebsite);

    // daily_schedules به صورت رشته JSON (تصاویر را حذف کن یا جداگانه مدیریت کن)
    const schedulesWithoutImages = dailySchedules.map(({ image, ...rest }) => rest);
    schedulesWithoutImages.forEach((item, index) => {
      formData.append(`daily_schedules[${index}]`, JSON.stringify(item));
    });

    dailySchedules.forEach((day, idx) => {
  if (day.image) {
    formData.append(`daily_schedules[${idx}].image`, day.image);
  }
});

    images.forEach((imgObj, index) => {
      const { image, title } = imgObj;

      // اول title رو به‌صورت JSON جداگانه می‌فرستیم
      formData.append(`images[${index}]`, JSON.stringify({ title }));

      // حالا فایل رو هم با کلید image جدا می‌فرستیم
      formData.append(`images[${index}].image`, image);
    });
    // درخواست API
    const res = await axios.post(
      'http://127.0.0.1:8000/api/homepage/dashboard/tours/create/',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    setSuccess('تور با موفقیت ساخته شد.');
    setError('');
  } catch (err) {
    setError('خطا در ارسال فرم: ' + (err.response?.data || err.message));
    setSuccess('');
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-4xl mx-auto bg-white shadow rounded" dir="rtl">
      <h2 className="text-xl font-bold mb-4">ایجاد تور جدید</h2>

      <label className="block mb-2">
        دسته‌بندی:
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="featured">پربازدید</option>
          <option value="hidden">کمتر شناخته‌شده</option>
          <option value="normal">معمولی</option>
        </select>
      </label>

      <label className="block mb-2">
        نام تور:
        <input
          type="text"
          value={tourName}
          onChange={e => setTourName(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        توضیحات:
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        تاریخ شروع:
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        تاریخ بازگشت:
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        ساعت حرکت:
        <input
          type="time"
          value={departureTime}
          onChange={e => setDepartureTime(e.target.value)}
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        ساعت برگشت:
        <input
          type="time"
          value={returnTime}
          onChange={e => setReturnTime(e.target.value)}
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        قیمت:
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        ظرفیت:
        <input
          type="number"
          value={capacity}
          onChange={e => setCapacity(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        مبدا:
        <input
          type="text"
          value={origin}
          onChange={e => setOrigin(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        مقصد:
        <input
          type="text"
          value={destination}
          onChange={e => setDestination(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        عکس اصلی تور:
        <input
          type="file"
          accept="image/*"
          onChange={e => setMainImage(e.target.files[0])}
          className="w-full"
        />
      </label>

      {/* جاذبه‌ها */}
      <label className="block mb-2">
        جاذبه‌ها (شناسه‌ها را با کاما جدا کنید):
        <input
          type="text"
          placeholder="مثلاً: 1,2,3"
          onChange={e => {
            const vals = e.target.value.split(',').map(v => v.trim()).filter(v => v);
            setAttractions(vals);
          }}
          className="w-full border rounded p-2"
        />
      </label>

      {/* متن‌های اضافی */}
      <label className="block mb-2">
        اقامتگاه:
        <textarea
          value={accommodation}
          onChange={e => setAccommodation(e.target.value)}
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        جزئیات غذا:
        <textarea
          value={mealDetails}
          onChange={e => setMealDetails(e.target.value)}
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        حمل و نقل:
        <textarea
          value={transportation}
          onChange={e => setTransportation(e.target.value)}
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        بیمه مسافرتی:
        <textarea
          value={travelInsurance}
          onChange={e => setTravelInsurance(e.target.value)}
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        خدمات گردشگری:
        <textarea
          value={tourismServices}
          onChange={e => setTourismServices(e.target.value)}
          className="w-full border rounded p-2"
        />
      </label>

      {/* راهنماهای تور */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">راهنماهای تور</h3>
        {tourGuidesInfo.map((guide, idx) => (
          <div key={idx} className="mb-2 border p-2 rounded">
            <label>
              نام:
              <input
                type="text"
                value={guide.name}
                onChange={e => handleGuideChange(idx, 'name', e.target.value)}
                className="w-full border rounded p-1"
              />
            </label>
            <label>
              تخصص:
              <input
                type="text"
                value={guide.specialty}
                onChange={e => handleGuideChange(idx, 'specialty', e.target.value)}
                className="w-full border rounded p-1"
              />
            </label>
          </div>
        ))}
        <button
          type="button"
          onClick={addTourGuide}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          اضافه کردن راهنما
        </button>
      </div>

      {/* برنامه روزانه */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">برنامه روزانه</h3>
        {dailySchedules.map((day, idx) => (
          <div key={idx} className="mb-3 border p-2 rounded">
            <p className="font-semibold">{day.title}</p>
            <label>
              شرح:
              <textarea
                value={day.description}
                onChange={e => {
                  const val = e.target.value;
                  setDailySchedules(prev => {
                    const copy = [...prev];
                    copy[idx].description = val;
                    return copy;
                  });
                }}
                className="w-full border rounded p-1"
              />
            </label>
            <label>
              تصویر:
              <input
                type="file"
                accept="image/*"
                onChange={e => handleDailyScheduleImageChange(e, idx)}
                className="w-full"
              />
            </label>
          </div>
        ))}
        <button
          type="button"
          onClick={addDailySchedule}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          اضافه کردن روز
        </button>
      </div>

      {/* شرکت برگزارکننده */}
      <h3 className="font-semibold mb-2">شرکت برگزارکننده</h3>

      <label className="block mb-2">
        نام شرکت:
        <input
          type="text"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        آدرس شرکت:
        <input
          type="text"
          value={companyAddress}
          onChange={e => setCompanyAddress(e.target.value)}
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        تلفن شرکت:
        <input
          type="tel"
          value={companyPhone}
          onChange={e => setCompanyPhone(e.target.value)}
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        ایمیل شرکت:
        <input
          type="email"
          value={companyEmail}
          onChange={e => setCompanyEmail(e.target.value)}
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        وب‌سایت شرکت:
        <input
          type="url"
          value={companyWebsite}
          onChange={e => setCompanyWebsite(e.target.value)}
          className="w-full border rounded p-2"
        />
      </label>

      {/* نمایش خطا یا موفقیت */}
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-700 text-white px-4 py-2 rounded"
      >
        {loading ? 'در حال ارسال...' : 'ارسال تور'}
      </button>
    </form>
  );
};

export default CreateTourForm;
