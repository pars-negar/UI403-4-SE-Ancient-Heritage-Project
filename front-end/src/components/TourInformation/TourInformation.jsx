import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import cach from "../../assets/icons/cach.svg";
import timeRewind from "../../assets/icons/time-rewind.svg";
import support from "../../assets/icons/support.svg";

const TourInformation = () => {
  //  console.log('TourInformation render'); // چک کردن رندر شدن
  const { id, category } = useParams();

  const [tour, setTour] = useState({});
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tourPlan, setTourPlan] = useState([]);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/homepage/tour/${id}/`
        );
        if (response && response.status === 200) {
          //    console.log(response.data)
          const foundTour = response.data;
          setTour(foundTour);
          setTourPlan(foundTour.daily_schedules || []);
          setError([]);
        } else {
          setError(["خطا در دریافت اطلاعات."]);
        }
      } catch (error) {
        console.error("Error during fetch: ", error);
        setError(["مشکلی در دریافت اطلاعات رخ داده است."]);
      } finally {
        setLoading(false);
      }
    };

    fetchTourData();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">در حال بارگذاری...</div>;
  }

  if (error && error.length > 0) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white w-[80%] rounded-[30px]">
      {Object.keys(tour).length > 0 && (
        <>
          <div className="w-auto h-[5.375rem] flex items-center gap-[1rem] pr-[2.25rem] mt-[7.5625rem]">
            <hr className="h-[3.5rem] bg-[var(--color-orange)] w-[0.4rem] rounded-[8px] opacity-100" />
            <h2
              className="!text-4xl"
              style={{ fontFamily: "Vazirmatn", fontWeight: 700 }}
            >
              تور {tour.origin || "..."} به {tour.destination || "......"}
            </h2>
          </div>
          <div className="flex justify-center w-full mt-[3.5rem]">
            <img
              src={
                tour.images.find((img) => img.image_type === "detail")?.image
              }
              alt="tour-detail-picture"
              className="rounded-[1.875rem] w-[80%] !h-[130.5]"
            />
          </div>
          <div className="flex justify-center mt-[3.9375rem]">
            <div className="flex justify-center gap-[1.5rem] items-center w-[40rem] h-[14rem] rounded-[10px] bg-[var(--color-light-beige)] p-[0.8125rem] text-center">
              <div className="flex flex-col gap-[3.3125rem] justify-center items-center w-[11rem] p-[0.5rem]">
                <img
                  src={cach}
                  alt="cach"
                  className="w-[3.625rem] h-[3.625rem]"
                />
                <span
                  style={{ fontFamily: "Koodak", fontWeight: 700 }}
                  className="text-2xl"
                >
                  {Math.round(tour.price).toLocaleString("fa-IR")} تومان
                </span>
              </div>
              <hr className="h-[9rem] w-[0.01rem] bg-black !opacity-100" />
              <div className="flex flex-col gap-[3.3125rem] justify-center items-center w-[11rem]">
                <img
                  src={timeRewind}
                  alt="time-rewind"
                  className="w-[3.625rem] h-[3.625rem]"
                />
                <span
                  style={{ fontFamily: "Koodak", fontWeight: 700 }}
                  className="text-2xl"
                >
                  {tour.duration} روز
                </span>
              </div>
              <hr className="h-[9rem] w-[0.01rem] bg-black !opacity-100" />
              <div className="flex flex-col gap-[3.3125rem] justify-center items-center w-[11rem]">
                <img
                  src={support}
                  alt="support"
                  className="w-[3.625rem] h-[3.625rem]"
                />
                <span
                  style={{ fontFamily: "Koodak", fontWeight: 700 }}
                  className="text-2xl"
                >
                  {tour.company_name}
                </span>
              </div>
            </div>
          </div>

          {/* { tour.description } */}
          <div className="flex justify-center">
            <div
              className="text-2xl w-[90%] mt-[4rem]"
              style={{
                fontFamily: "Vazirmatn",
                fontWeight: 400,
                whiteSpace: "pre-wrap",
              }}
            >
              {tour.description}
            </div>
          </div>

          <div className="flex mt-[4.0625rem] mb-[3.9375rem] mr-[11.3125rem]">
            <div className="w-[80%] h-auto whitespace-pre-line">
              <div className="mt-[2rem]">
                <h3
                  className="!text-3xl font-bold"
                  style={{ fontFamily: "Vazirmatn", fontWeight: 700 }}
                >
                  ویژگی های تور
                </h3>
                <h4
                  className="!text-2xl !mt-[2rem]"
                  style={{ fontFamily: "Vazirmatn", fontWeight: 500 }}
                >
                  بازدید از اماکن تاریخی:
                </h4>
                <p
                  className="text-xl"
                  style={{ fontFamily: "Vazirmatn", fontWeight: 400 }}
                >
                  {" "}
                  {tour.attractions}
                </p>
                <h4
                  className="!text-2xl"
                  style={{ fontFamily: "Vazirmatn", fontWeight: 500 }}
                >
                  اقامت:
                </h4>
                <p
                  className="text-xl"
                  style={{ fontFamily: "Vazirmatn", fontWeight: 400 }}
                >
                  {tour.accommodation}
                </p>
                <h4
                  className="!text-2xl"
                  style={{ fontFamily: "Vazirmatn", fontWeight: 500 }}
                >
                  حمل‌ونقل:
                </h4>
                <p
                  className="text-xl"
                  style={{ fontFamily: "Vazirmatn", fontWeight: 400 }}
                >
                  {tour.transportation}
                </p>
                <h4
                  className="!text-2xl"
                  style={{ fontFamily: "Vazirmatn", fontWeight: 500 }}
                >
                  بیمه سفر:
                </h4>
                <p
                  className="text-xl"
                  style={{ fontFamily: "Vazirmatn", fontWeight: 400 }}
                >
                  {tour.travel_insurance}
                </p>
                <h4
                  className="!text-2xl"
                  style={{ fontFamily: "Vazirmatn", fontWeight: 500 }}
                >
                  راهنما و خدمات گردشگری:
                </h4>
                <p
                  className="text-xl"
                  style={{ fontFamily: "Vazirmatn", fontWeight: 400 }}
                >
                  {tour.tourism_services}
                </p>
              </div>

              <div>
                <h3
                  className="!text-3xl font-bold !mt-[8rem]"
                  style={{ fontFamily: "Vazirmatn", fontWeight: 700 }}
                >
                  برنامه روزانه
                </h3>

                {tourPlan.map((dayPlan) => (
                  <div
                    className="tour-day w-full flex justify-center"
                    key={dayPlan.day_number}
                  >
                    <div className="flex w-full justify-between items-center">
                      <div className="tour-details">
                        <h3>{dayPlan.title}</h3>
                        <p
                          className="text-xl"
                          style={{ fontFamily: "Vazirmatn", fontWeight: 400 }}
                        >
                          {dayPlan.description}
                        </p>
                      </div>
                      <img
                        src={dayPlan.image}
                        alt={dayPlan.title}
                        className="tour-image w-[15rem] h-[15rem] rounded-[30px] mb-[4rem] shadow-[0_-10px_15px_-3px_rgba(0,0,0,1)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="w-[80%] mx-auto mt-16 mb-16 text-right"
            style={{ fontFamily: "Vazirmatn" }}
          >
            {/* بخش اطلاعات مسئول تور */}

            {tour.tour_manager_info && (
              <div className="mb-12 !w-full">
                <hr class="w-full border-3 !border-[#FB8101]" />
                <div className=" flex justify-start items-center w-full">
                  <h1
                    className="!text-[25px] !mb-5"
                    style={{ fontFamily: "Vazirmatn", fontWeight: 700 }}
                  >
                    اطلاعات مسئول تور
                  </h1>
                </div>{" "}
                <div className="flex items-center justify-beetwen gap-5  rounded-lg">
                  <div>
                    <img
                      src={tour.tour_manager_info.profile_image}
                      alt={`عکس ${tour.tour_manager_info.username}`}
                      className=" w-40 h-40 rounded-full object-cover"
                    />
                  </div>
                  <div className="text-xl leading-10">
                    <p>
                      <span className="font-semibold">مسئول تور: </span>
                      {tour.tour_manager_info.username}
                    </p>
                    <p>
                      <span className="font-semibold">تماس اضطراری: </span>
                      {tour.tour_manager_info.phone_number}
                    </p>
                    <p>
                      <span className="font-semibold">ایمیل: </span>
                      {tour.tour_manager_info.email}
                    </p>
                    <p>با ۸ سال سابقه در اجرای تورهای اصفهان و شهرهای مرکزی</p>
                  </div>
                </div>
              </div>
            )}

            {/* بخش راهنمایان تور */}
            {Array.isArray(tour.guides) && tour.guides.length > 0 && (
              <div className="mb-12">
                <h1
                  className="!text-[25px] !mb-5"
                  style={{ fontFamily: "Vazirmatn", fontWeight: 700 }}
                >
                  راهنمایان تور
                </h1>{" "}
                <div className="p-6 rounded-lg text-xl leading-9">
                  {tour.guides.map((guide, index) => (
                    <p key={index}>
                      {guide.name} - راهنمای {guide.type}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* بخش اطلاعات شرکت برگزار کننده */}
            <div className="mb-12">
              <h1
                className="!text-[25px] !mb-5"
                style={{ fontFamily: "Vazirmatn", fontWeight: 700 }}
              >
                اطلاعات شرکت برگزار کننده
              </h1>
              <div className="p-6 rounded-lg text-xl leading-10">
                <p>
                  <span className="font-semibold">شرکت گردشگری: </span>
                  {tour.company_name}
                </p>
                <p>
                  <span className="font-semibold">آدرس: </span>
                  {tour.company_address}
                </p>
                <p>
                  <span className="font-semibold">تلفن: </span>
                  {tour.company_phone}
                </p>
                <p>
                  <span className="font-semibold">ایمیل: </span>
                  {tour.company_email}
                </p>
                <p>
                  <span className="font-semibold">وب‌سایت: </span>
                  <a
                    href={tour.company_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {tour.company_website}
                  </a>
                </p>
                <p className="font-semibold">مجوز رسمی از سازمان گردشگری</p>
              </div>
              <hr class="w-full border-3 !border-[#FB8101]" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TourInformation;
