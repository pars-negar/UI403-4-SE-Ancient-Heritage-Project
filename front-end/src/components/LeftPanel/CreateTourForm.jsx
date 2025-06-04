import React, { useState } from 'react';

const ChevronDownIcon = () => (
  <svg className="!absolute !left-2 !top-1/2 !-translate-y-1/2 !w-4 !h-4 !text-gray-500 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const SectionTitle = ({ title }) => (
  <div className="!flex !items-center !mb-5 !mt-8 first:!mt-0">
    <div className="!w-1 !h-5 !bg-blue-600 !ml-3"></div>
    <h3 className="!text-lg !font-bold !text-gray-800">{title}</h3>
  </div>
);

const FormRow = ({ children, className = "" }) => (
  <div className={`!flex !flex-wrap md:!flex-nowrap !gap-x-6 !gap-y-4 !mb-4 ${className}`}>
    {children}
  </div>
);

const FormFieldStacked = ({ label, htmlFor, children, className = "", fieldWrapperClassName = "!w-full" }) => (
  <div className={`!mb-4 ${fieldWrapperClassName} ${className}`}>
    <label htmlFor={htmlFor} className="!block !text-sm !font-medium !text-gray-600 !mb-1 !text-right">
      {label}
    </label>
    {children}
  </div>
);

const CreateTourForm = () => {

  const inputBase = "!block !w-full !h-10 !px-3 !py-2 !border-2 !border-black !rounded-md !shadow-sm focus:!ring-indigo-500 focus:!border-indigo-500 !text-sm";
  const datePartInputBase = "!block !w-full !h-10 !pr-3 !pl-7 !py-2 !border-2 !border-black !rounded-md !shadow-sm focus:!ring-indigo-500 focus:!border-indigo-500 !text-sm !text-right";
  const textareaBase = "!block !w-full !px-3 !py-2 !border-2 !border-black !rounded-md !shadow-sm focus:!ring-indigo-500 focus:!border-indigo-500 !text-sm";
  const buttonBase = "!inline-flex !items-center !justify-center !px-4 !py-2 !border !border-transparent !text-sm !font-medium !rounded-md !shadow-sm !text-white";
  const primaryButton = `${buttonBase} !bg-blue-600 hover:!bg-blue-700 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-blue-500`;
  const fileInputButtonStyled = `${buttonBase} !bg-gray-200 hover:!bg-gray-300 !text-gray-700 !h-full !border-l-2 !border-black !rounded-r-none !rounded-l-md !px-3`;
  
  const commonAddButtonClass = `${primaryButton} !px-6 !py-2 !text-sm !w-auto`;

  return (
    <div className="!p-6 md:!p-8">
      <div className="!flex !items-center !mb-8">
        <div className="!w-1 !h-6 !bg-blue-600 !ml-3"></div>
        <h2 className="!text-2xl !font-bold !text-gray-800">ثبت اطلاعات تور</h2>
      </div>

      <form className="!bg-white !py-6 !px-[7.5rem] !rounded-lg !shadow !relative">
        
        <SectionTitle title="اطلاعات کلی تور" />
        <FormFieldStacked label="نام تور" htmlFor="tourName"><input type="text" name="tourName" id="tourName" className={inputBase} placeholder="تور اصفهان نوروز" /></FormFieldStacked>
        <FormFieldStacked label="توضیحات تور" htmlFor="tourDescription"><textarea name="tourDescription" id="tourDescription" rows="3" className={textareaBase}></textarea></FormFieldStacked>
        <FormRow>
          <FormFieldStacked label="تصویر اصلی تور" htmlFor="mainImage_file_trigger" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><div className={`${inputBase} !p-0 !flex !items-center !overflow-hidden`}><span className="!px-3 !text-sm !text-gray-500 !flex-grow">فایلی انتخاب نشده است</span><label htmlFor="mainImage_file" className={`${fileInputButtonStyled} !cursor-pointer`}>فایل انتخاب کنید</label><input type="file" name="mainImage_file" id="mainImage_file" className="!hidden" /></div></FormFieldStacked>
          <FormFieldStacked label="قیمت (تومان)" htmlFor="price" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name="price" id="price" className={inputBase} placeholder="۴,۰۰۰,۰۰۰" /></FormFieldStacked>
        </FormRow>
        <FormRow>
          <FormFieldStacked label="تاریخ شروع" htmlFor="startDate_day" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><div className="!flex !items-center !gap-2"><div className="!relative !flex-1"><input type="text" name="startDate_day" id="startDate_day" placeholder="روز" className={datePartInputBase} /><ChevronDownIcon /></div><div className="!relative !flex-1"><input type="text" name="startDate_month" id="startDate_month" placeholder="ماه" className={datePartInputBase} /><ChevronDownIcon /></div><div className="!relative !flex-1"><input type="text" name="startDate_year" id="startDate_year" placeholder="سال" className={datePartInputBase} /><ChevronDownIcon /></div></div></FormFieldStacked>
          <FormFieldStacked label="ساعت حرکت" htmlFor="departureTime" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name="departureTime" id="departureTime" className={inputBase} placeholder="۰۸:۳۰" /></FormFieldStacked>
        </FormRow>
        <FormRow>
          <FormFieldStacked label="تاریخ برگشت" htmlFor="returnDate_day" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><div className="!flex !items-center !gap-2"><div className="!relative !flex-1"><input type="text" name="returnDate_day" id="returnDate_day" placeholder="روز" className={datePartInputBase} /><ChevronDownIcon /></div><div className="!relative !flex-1"><input type="text" name="returnDate_month" id="returnDate_month" placeholder="ماه" className={datePartInputBase} /><ChevronDownIcon /></div><div className="!relative !flex-1"><input type="text" name="returnDate_year" id="returnDate_year" placeholder="سال" className={datePartInputBase} /><ChevronDownIcon /></div></div></FormFieldStacked>
          <FormFieldStacked label="ساعت برگشت" htmlFor="returnTime" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name="returnTime" id="returnTime" className={inputBase} placeholder="۲۰:۰۰" /></FormFieldStacked>
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

        <SectionTitle title="برنامه روزانه" />
        <FormFieldStacked label="توضیحات برنامه روز اول" htmlFor="day1Description">
          <textarea name="day1Description" id="day1Description" rows="3" className={textareaBase}></textarea>
        </FormFieldStacked>
        
        <FormRow className="!items-center">
          <FormFieldStacked 
            label="تصویر روز اول" 
            htmlFor="day1Image_file_trigger" 
            fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"
            className="!mb-0 md:!mb-4"
          >
            <div className={`${inputBase} !p-0 !flex !items-center !overflow-hidden`}>
              <span className="!px-3 !text-sm !text-gray-500 !flex-grow">فایلی انتخاب نشده است</span>
              <label htmlFor="day1Image_file" className={`${fileInputButtonStyled} !cursor-pointer`}>فایل انتخاب کنید</label>
              <input type="file" name="day1Image_file" id="day1Image_file" className="!hidden" />
            </div>
          </FormFieldStacked>
          <div className="!w-full md:!w-[calc(50%-0.75rem)] !flex !justify-end !items-center"> 
            <button 
              type="button" 
              className={commonAddButtonClass}
            >
              افزودن روز جدید
            </button>
          </div>
        </FormRow>

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
                <span className="!px-3 !text-sm !text-gray-500 !flex-grow">فایلی انتخاب نشده است</span>
                <label htmlFor="leaderImage_file" className={`${fileInputButtonStyled} !cursor-pointer`}>فایل انتخاب کنید</label>
                <input type="file" name="leaderImage_file" id="leaderImage_file" className="!hidden" />
                </div>
            </FormFieldStacked>
            <div className="!w-full md:!w-[calc(50%-0.75rem)]"></div>
         </FormRow>

        <SectionTitle title="اطلاعات راهنمایان تور" />
         <FormRow>
          <FormFieldStacked label="نام و نام خانوادگی" htmlFor="guideName" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name="guideName" id="guideName" className={inputBase} /></FormFieldStacked>
          <FormFieldStacked label="تخصص" htmlFor="guideSpecialty" fieldWrapperClassName="!w-full md:!w-[calc(50%-0.75rem)]"><input type="text" name="guideSpecialty" id="guideSpecialty" className={inputBase} /></FormFieldStacked>
        </FormRow>
        <FormRow className="!mt-1">
            <div className="!w-full md:!w-[calc(50%-0.75rem)]"></div>
            <div className="!w-full md:!w-[calc(50%-0.75rem)] !flex !justify-end !items-center">
                <button 
                    type="button" 
                    className={commonAddButtonClass}
                >
                    افزودن راهنما
                </button>
            </div>
        </FormRow>

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
          <button 
            type="submit" 
            className={`${primaryButton} !px-8 !py-2.5 !text-sm !w-auto 
                        !absolute !bottom-6 !left-[7.5rem]`} 
          >
            ثبت اطلاعات
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTourForm;