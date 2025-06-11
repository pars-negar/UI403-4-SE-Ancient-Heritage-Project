import React, { useState } from 'react';
import './CreateForm.css'

// کامپوننت‌های شما بدون تغییر باقی می‌مانند
const ChevronDownIcon = () => (
    <svg className="!absolute !left-2 !top-1/2 !-translate-y-1/2 !w-4 !h-4 !text-[#959494] pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
  
  const SectionTitle = ({ title }) => (
    <div className="!flex !items-center !mb-5 !mt-8 first:!mt-0">
      <h3 className="!text-[25px] !font-bold "style={{fontFamily: 'Vazirmatn', fontWeight: 700}}>{title}</h3>
    </div>
  );
  
  const FormRow = ({ children, className = "" }) => (
    <div className={`!flex !flex-wrap md:!flex-nowrap !gap-x-6 !gap-y-4 !mb-4 ${className}`}>
      {children}
    </div>
  );
  
  const FormFieldStacked = ({ label, htmlFor, children, className = "", fieldWrapperClassName = "!w-full" }) => (
    <div className={`!mb-4 ${fieldWrapperClassName} ${className}`}>
      <label htmlFor={htmlFor} className="!block !text-[18px] !mb-1 !text-right"style={{fontFamily: 'Vazirmatn', fontWeight: 700}}>
        {label}
      </label>
      {children}
    </div>
  );

const CreateTourForm = () => {
    // تعریف استایل‌ها
    const inputBase = "!block !w-full !h-10 !px-3 !py-2 !border-2 !border-black !rounded-md !shadow-sm focus:!ring-indigo-500 focus:!border-indigo-500 !text-sm input-vazirmatn-style";
    const inputDigit = "!block !text-black !w-full !h-10 !px-3 !py-2 !border-2 !border-black !rounded-md !shadow-sm focus:!ring-indigo-500 focus:!border-indigo-500 !text-[20px] font-koodak";
    const datePartInputBase = "!block !w-full !h-10 !pr-3 !pl-7 !py-2 !border-2 !border-black !rounded-md !shadow-sm focus:!ring-indigo-500 focus:!border-indigo-500 !text-[25px] !text-right font-nazanin";
    const textareaBase = "!block !w-full !px-3 !py-2 !border-2 !border-black !rounded-md !shadow-sm focus:!ring-indigo-500 focus:!border-indigo-500 !text-sm";
    const buttonBase = "!inline-flex !items-center !justify-center !py-2 !border !border-transparent !text-[28px] !h-[6vh] !w-auto !rounded-lg !shadow-[#009688] !shadow-sm !text-white font-nazanin";
    const primaryButton = `${buttonBase} !bg-[#205781] hover:!bg-[#143D5D] focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-blue-500`;
    const fileInputButtonStyled = `!bg-[#D9D9D9] hover:!bg-gray-400 !text-black !h-[3.8vh] !rounded-md !px-3 !text-[18px] font-koodak`;
    const commonAddButtonClass = `${primaryButton} !py-2 !text-sm !w-auto`;

    const [days, setDays] = useState([]);
    const [guides, setGuides] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    
    // State های جدید برای مدیریت خطا، موفقیت و وضعیت ارسال
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAddDay = () => {
        setDays([...days, { id: Date.now() }]);
    };

    const handleAddGuide = () => {
        setGuides([...guides, { id: Date.now() }]);
    };
    
    // تابع برای مدیریت ارسال فرم
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        const form = event.target;
        const formData = new FormData(form);
        let allFieldsFilled = true;

        // 1. بررسی خالی نبودن تمام فیلدها (به جز فایل و دکمه)
        for (const [name, value] of formData.entries()) {
            const element = form.elements[name];
            if (element.type !== 'file' && element.type !== 'button' && element.type !== 'submit') {
                if (typeof value === 'string' && !value.trim()) {
                    allFieldsFilled = false;
                    break;
                }
            }
        }

        if (!allFieldsFilled) {
            setErrorMessage('لطفاً تمام فیلدهای متنی را پر کنید.');
            return;
        }

    dailySchedules.forEach((day, idx) => {
  if (day.image) {
    formData.append(`daily_schedules[${idx}].image`, day.image);
  }
});

        // 2. ایجاد توکن و ارسال به بک‌اند
        setIsLoading(true);
const tourToken = localStorage.getItem("access_token");
        const dataToSend = Object.fromEntries(formData.entries());

        console.log("Sending data to backend:", dataToSend);
        console.log("With Token:", tourToken);

        try {
            const response = await fetch('https://api.example.com/tours', { // آدرس API بک‌اند خود را اینجا قرار دهید
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tourToken}`
                },
                body: JSON.stringify(dataToSend)
            });

            if (!response.ok) {
                throw new Error('پاسخ سرور موفقیت‌آمیز نبود.');
            }

            const result = await response.json();
            console.log('Backend Response:', result);

            // نمایش پیام موفقیت به همراه توکن
            setSuccessMessage(`اطلاعات با موفقیت ثبت شد. توکن تور: ${tourToken}`);

        } catch (error) {
            console.error('Error submitting form:', error);
            setErrorMessage('خطا در ارسال اطلاعات. لطفاً دوباره تلاش کنید.');
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="bg-[var(--color-light-gray)] w-full h-auto flex flex-col justify-center items-center">
        <hr className="bg-[--color-gray] w-full !mt-[2rem]"/>      
        <div className="!flex justify-start !items-end !mb-3 w-full mr-[3.5rem]">
            <h2 className="!text-[30px] !mb-6 border-r-4 border-[#205781] pr-1.5 " style={{fontFamily: 'Vazirmatn', fontWeight: 500}}>ثبت اطلاعات تور</h2>
        </div>

      <form onSubmit={handleSubmit} className="!bg-white w-[61.9375rem] !py-6 !px-[7.5rem] !rounded-lg !shadow !relative" noValidate>
        
        <SectionTitle title="اطلاعات کلی تور" />
        <FormFieldStacked label="نام تور" htmlFor="tourName"><input type="text" name="tourName" id="tourName" className={inputBase} placeholder="تور اصفهان نوروز" /></FormFieldStacked>
        <FormFieldStacked label="توضیحات تور" htmlFor="tourDescription"><textarea name="tourDescription" id="tourDescription" rows="3" className={textareaBase}></textarea></FormFieldStacked>
        <FormRow>
          <FormFieldStacked label="تصویر اصلی تور" htmlFor="mainImage_file_trigger" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><div className={`${inputBase} !p-0 !flex !items-center !overflow-hidden`}><label htmlFor="mainImage_file" className={`${fileInputButtonStyled} !cursor-pointer `}>فایلی انتخاب کنید</label><input type="file" name="mainImage_file" id="mainImage_file" className="!hidden" /><span className="!px-3 !text-sm !text-[#959494] !flex-grow">فایلی انتخاب نشده است</span></div></FormFieldStacked>
          <FormFieldStacked label="قیمت (تومان)" htmlFor="price" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name="price" id="price" className={inputDigit} placeholder="۴,۰۰۰,۰۰۰" /></FormFieldStacked>
        </FormRow>
        <FormRow>
          <FormFieldStacked label="تاریخ شروع" htmlFor="startDate_day" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><div className="!flex !items-center !gap-2"><div className="!relative !flex-1"><input type="text" name="startDate_day" id="startDate_day" placeholder="روز" className={datePartInputBase} /><ChevronDownIcon /></div><div className="!relative !flex-1"><input type="text" name="startDate_month" id="startDate_month" placeholder="ماه" className={datePartInputBase} /><ChevronDownIcon /></div><div className="!relative !flex-1"><input type="text" name="startDate_year" id="startDate_year" placeholder="سال" className={datePartInputBase} /><ChevronDownIcon /></div></div></FormFieldStacked>

          <FormFieldStacked label="ساعت حرکت" htmlFor="departureTime" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name="departureTime" id="departureTime" className={inputDigit} placeholder="۰۸:۳۰" /></FormFieldStacked>
        </FormRow>
        <FormRow>
          <FormFieldStacked label="تاریخ برگشت" htmlFor="returnDate_day" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><div className="!flex !items-center !gap-2"><div className="!relative !flex-1"><input type="text" name="returnDate_day" id="returnDate_day" placeholder="روز" className={datePartInputBase} /><ChevronDownIcon /></div><div className="!relative !flex-1"><input type="text" name="returnDate_month" id="returnDate_month" placeholder="ماه" className={datePartInputBase} /><ChevronDownIcon /></div><div className="!relative !flex-1"><input type="text" name="returnDate_year" id="returnDate_year" placeholder="سال" className={datePartInputBase} /><ChevronDownIcon /></div></div></FormFieldStacked>
          <FormFieldStacked label="ساعت برگشت" htmlFor="returnTime" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name="returnTime" id="returnTime" className={inputDigit} placeholder="۲۰:۰۰" /></FormFieldStacked>
        </FormRow>
         <FormRow>
          <FormFieldStacked label="مبدا" htmlFor="origin" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name="origin" id="origin" className={inputBase} /></FormFieldStacked>
          <FormFieldStacked label="مقصد" htmlFor="destination" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name="destination" id="destination" className={inputBase} /></FormFieldStacked>
        </FormRow>
        <FormRow>
          <FormFieldStacked label="محل حرکت" htmlFor="departurePlace" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name="departurePlace" id="departurePlace" className={inputBase} /></FormFieldStacked>
          <FormFieldStacked label="ظرفیت" htmlFor="capacity" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="number" name="capacity" id="capacity" className={inputBase} /></FormFieldStacked>
        </FormRow>


        <SectionTitle title="ویژگی های تور" />
        <FormFieldStacked label="جاذبه ها" htmlFor="attractions"><input type="text" name="attractions" id="attractions" className={inputBase} /></FormFieldStacked>
        <FormFieldStacked label="اقامت" htmlFor="accommodation"><input type="text" name="accommodation" id="accommodation" className={inputBase} /></FormFieldStacked>
        <FormFieldStacked label="جزئیات وعده های غذایی" htmlFor="mealDetails"><input type="text" name="mealDetails" id="mealDetails" className={inputBase} /></FormFieldStacked>
        <FormFieldStacked label="اطلاعات حمل و نقل" htmlFor="transportInfo"><input type="text" name="transportInfo" id="transportInfo" className={inputBase} /></FormFieldStacked>
        <FormFieldStacked label="اطلاعات بیمه" htmlFor="insuranceInfo"><input type="text" name="insuranceInfo" id="insuranceInfo" className={inputBase} /></FormFieldStacked>
        
        <div id="daily-program-section">
            <SectionTitle title="برنامه روزانه" />
            <FormFieldStacked label="توضیحات برنامه روز اول" htmlFor="day1Description">
              <textarea name="day1Description" id="day1Description" rows="3" className={textareaBase}></textarea>
            </FormFieldStacked>
            <FormFieldStacked label="تصویر روز اول" htmlFor="day1Image_file_trigger" fieldWrapperClassName="!w-[calc(50%-0.75rem)]">
                <div className={`${inputBase} !p-0 !flex !items-center !overflow-hidden`}>
                    <label htmlFor="day1Image_file" className={`${fileInputButtonStyled} !cursor-pointer`}>فایل انتخاب کنید</label>
                    <span className="!px-3 !text-sm !text-gray-500 !flex-grow">فایلی انتخاب نشده است</span>
                    <input type="file" name="day1Image_file" id="day1Image_file" className="!hidden" />
                </div>
            </FormFieldStacked>
            
            {days.map((day, index) => (
                <div key={day.id} className="mt-6 border-t-2 border-gray-200 pt-4">
                    <FormFieldStacked label={`توضیحات برنامه روز ${index + 2}`} htmlFor={`day${day.id}Description`}>
                        <textarea name={`day${day.id}Description`} id={`day${day.id}Description`} rows="3" className={textareaBase}></textarea>
                    </FormFieldStacked>
                    <FormFieldStacked label={`تصویر روز ${index + 2}`} htmlFor={`day${day.id}Image_file_trigger`} fieldWrapperClassName="!w-[calc(50%-0.75rem)]">
                        <div className={`${inputBase} !p-0 !flex !items-center !overflow-hidden`}>
                            <label htmlFor={`day${day.id}Image_file`} className={`${fileInputButtonStyled} !cursor-pointer`}>فایل انتخاب کنید</label>
                            <span className="!px-3 !text-sm !text-gray-500 !flex-grow">فایلی انتخاب نشده است</span>
                            <input type="file" name={`day${day.id}Image_file`} id={`day${day.id}Image_file`} className="!hidden" />
                        </div>
                    </FormFieldStacked>
                </div>
            ))}
        </div>

        <div className="!mt-4 !flex !justify-start !ml-[-34.8rem]">
          <button type="button" onClick={handleAddDay} className={commonAddButtonClass}>
            افزودن روز جدید
          </button>
        </div>


        <SectionTitle title="اطلاعات مسئول تور" />
        <FormRow>
          <FormFieldStacked label="نام و نام خانوادگی" htmlFor="leaderName" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name="leaderName" id="leaderName" className={inputBase} /></FormFieldStacked>
          <FormFieldStacked label="شماره تماس" htmlFor="leaderContact" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name="leaderContact" id="leaderContact" className={inputBase} /></FormFieldStacked>
        </FormRow>
        <FormRow>
           <FormFieldStacked label="ایمیل" htmlFor="leaderEmail" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="email" name="leaderEmail" id="leaderEmail" className={inputBase} /></FormFieldStacked>
          <FormFieldStacked label="توضیحات" htmlFor="leaderDescription" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name="leaderDescription" id="leaderDescription" className={inputBase} /></FormFieldStacked>
        </FormRow>
         <FormRow>
          <FormFieldStacked label="عکس مسئول تور" htmlFor="leaderImage_file_trigger" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]">
            <div className={`${inputBase} !p-0 !flex !items-center !overflow-hidden`}>
             <label htmlFor="leaderImage_file" className={`${fileInputButtonStyled} !cursor-pointer`}>فایل انتخاب کنید</label>
               <span className="!px-3 !text-sm !text-gray-500 !flex-grow">فایلی انتخاب نشده است</span>
               <input type="file" name="leaderImage_file" id="leaderImage_file" className="!hidden" />
            </div>
          </FormFieldStacked>
           <div className="!w-full md:!w-[calc(50%-0.75rem)]"></div> {/* Spacer */}
         </FormRow>

        <div id="tour-guides-section">
            <SectionTitle title="اطلاعات راهنمایان تور" />
            <FormRow>
              <FormFieldStacked label="نام و نام خانوادگی" htmlFor="guideName1" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name="guideName1" id="guideName1" className={inputBase} /></FormFieldStacked>
              <FormFieldStacked label="تخصص" htmlFor="guideSpecialty1" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name="guideSpecialty1" id="guideSpecialty1" className={inputBase} /></FormFieldStacked>
            </FormRow>
            
            {guides.map((guide, index) => (
                <FormRow key={guide.id} className="mt-4 border-t-2 border-gray-200 pt-4">
                    <FormFieldStacked label={`نام و نام خانوادگی راهنمای ${index + 2}`} htmlFor={`guideName${guide.id}`} fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name={`guideName${guide.id}`} id={`guideName${guide.id}`} className={inputBase} /></FormFieldStacked>
                    <FormFieldStacked label={`تخصص راهنمای ${index + 2}`} htmlFor={`guideSpecialty${guide.id}`} fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name={`guideSpecialty${guide.id}`} id={`guideSpecialty${guide.id}`} className={inputBase} /></FormFieldStacked>
                </FormRow>
            ))}
        </div>
        
        <div className="!mt-4 !flex !justify-start !ml-[-36.8rem]"> 
          <button type="button" onClick={handleAddGuide} className={commonAddButtonClass}>
            افزودن راهنما
          </button>
        </div>


        <SectionTitle title="اطلاعات شرکت برگزارکننده" />
        <FormRow>
          <FormFieldStacked label="نام شرکت" htmlFor="companyName" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name="companyName" id="companyName" className={inputBase} /></FormFieldStacked>
          <FormFieldStacked label="تلفن" htmlFor="companyPhone" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name="companyPhone" id="companyPhone" className={inputBase} /></FormFieldStacked>
        </FormRow>
         <FormRow>
           <FormFieldStacked label="ایمیل" htmlFor="companyEmail" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="email" name="companyEmail" id="companyEmail" className={inputBase} /></FormFieldStacked>
          <FormFieldStacked label="وبسایت" htmlFor="companyWebsite" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="url" name="companyWebsite" id="companyWebsite" className={inputBase} /></FormFieldStacked>
        </FormRow>
        <FormFieldStacked label="آدرس" htmlFor="companyAddress">
          <textarea name="companyAddress" id="companyAddress" rows="3" className={textareaBase}></textarea>
        </FormFieldStacked>

        <div className="!mt-10 !pt-5 !pb-12"> 
            {/* نمایش پیام خطا */}
            {errorMessage && (
                <div className="!absolute !bottom-[5.5rem] !right-[2rem] !left-[2rem] !text-red-700 !font-bold !bg-red-100 !p-3 !rounded-md !text-center">
                    {errorMessage}
                </div>
            )}
            {/* نمایش پیام موفقیت */}
            {successMessage && (
                <div className="!absolute !bottom-[5.5rem] !right-[2rem] !left-[2rem] !text-green-700 !font-bold !bg-green-100 !p-3 !rounded-md !text-center !break-words">
                    {successMessage}
                </div>
            )}
          <button type="submit" className={`${primaryButton} !py-2.5 !text-sm !w-auto !absolute !bottom-6 !left-[2rem]`} disabled={isLoading}>
            {isLoading ? 'در حال ارسال...' : 'ثبت اطلاعات'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTourForm;
