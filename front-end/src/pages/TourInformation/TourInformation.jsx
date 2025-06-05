import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import cach from '../../assets/icons/cach.svg'
import timeRewind from '../../assets/icons/time-rewind.svg'
import support from '../../assets/icons/support.svg'
import tourPicture from '../../assets/images/naghshejahan.svg'
import TourReviews from "../../components/comment-tourinf/TourReviews";

const TourInformation = () => {
        console.log('TourInformation render'); // چک کردن رندر شدن
    const { id } = useParams();
    const location = useLocation();

    const [tour, setTour] = useState({});
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(true);
    const companyName = 'شرکت گردشگری ایران گشت';
    const duration = 'kjkgh';
    const features = 'lkj;h'


    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const response = await axios.get(
                    "https://parsnegarback.liara.run/api/homepage/tour-page"
                );
                if (response && response.status === 200) {
                    console.log(response.data);
                    const tours = response.data.top_tours || [];
                    const foundTour = tours.find((tour) => tour.id === parseInt(id));
                    console.log(foundTour);
                    console.log(foundTour.origin);
                    console.log("آیدی از URL:", id);
                    console.log("آیدی هر تور:", tours.map(t => t.id));
                    console.log("ID from useParams:", id);

                    if (foundTour) {
                        setTour(foundTour);
                    } else {
                        setError('تور مورد نظر یافت نشد.');
                    }
                } else {
                    setError('خطا در دریافت اطلاعات.');
                    console.error("Failed to fetch data", response);
                }
                } catch (error) {
                    console.error("Error during fetch: ", error);
                    setError('مشکلی در دریافت اطلاعات رخ داده است.');
                } finally {
                    setLoading(false);
                }
        };

        fetchTourData();
    }, [id, location]);

    
    if (loading) {
        return <div className="text-center mt-10">در حال بارگذاری...</div>;
    }

    if (error && error.length > 0) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    const reviewsData = [
    {
      userName: 'سما محمدی',
      userProfileDate: '۱۴۰۴/۰۱/۱۵', // تاریخ در فرمت دلخواه شما
      starRating: 5,
      travelDate: '۱۴۰۴/۰۱/۰۹',
      reviewText: 'بی‌نظیر بود! راهنمای بسیار حرفه‌ای، برنامه‌ریزی عالی و اقامتگاه فوق‌العاده. اولین بار بود با یک تور به اصفهان رفتم و کاملاً راضی‌ام.',
      initialLikes: 10,
      initialDislikes: 0,
    },
    {
      userName: 'الهام حسینی',
      userProfileDate: '۱۴۰۴/۰۱/۱۳',
      starRating: 4,
      travelDate: '۱۴۰۴/۰۱/۰۹',
      reviewText: 'تور خیلی عالی بود، ولی یک ایراد کوچیک داشت: زمان بازدید از هر جاذبه کمی کوتاه بود. در کل همه چیز عالی بود و من از خدمات تور راضی بودم. راهنما خیلی خوب و صبور بود.',
      initialLikes: 0,
      initialDislikes: 0,
    },
    {
      userName: 'سعید بابایی',
      userProfileDate: '۱۴۰۴/۰۱/۱۶',
      starRating: 4,
      travelDate: '۱۴۰۴/۰۱/۰۹',
      reviewText: 'خدمات تور عالی بود و همه چیز طبق برنامه انجام شد. اما به نظرم باید بیشتر به تجربه‌های محلی غذاهای سنتی و فرهنگ بومی پرداخته شود. به طور کلی از تور راضی بودم.',
      initialLikes: 1,
      initialDislikes: 0,
    },
    {
      userName: 'رضا کریمی',
      userProfileDate: '۱۴۰۴/۰۱/۱۰',
      starRating: 3,
      travelDate: '۱۴۰۴/۰۱/۰۵',
      reviewText: 'تور خوبی بود اما انتظار بیشتری داشتم. هتل کمی دور بود و نیاز به پیاده‌روی زیاد داشت.',
      initialLikes: 5,
      initialDislikes: 2,
    },
    {
      userName: 'نازنین امینی',
      userProfileDate: '۱۴۰۴/۰۱/۱۰',
      starRating: 5,
      travelDate: '۱۴۰۴/۰۱/۰۵',
      reviewText: 'عالیییییییی بود عاشق این سایتم .هتل کمی دور بود و نیاز به پیاده‌روی زیاد داشت.',
      initialLikes: 33,
      initialDislikes: 0,
    }

];

   

    return ( 
        <>
            <Navbar />
            {Object.keys(tour).length > 0 && 
                (
                    <>
                        <div className="w-auto h-[5.375rem] flex items-center gap-[1rem] pr-[2.25rem] mt-[7.5625rem]">
                            <hr className="h-[3.5rem] bg-[var(--color-orange)] w-[0.4rem] rounded-[8px] opacity-100"/>
                            <h2 className="!text-4xl" style={{ fontFamily: 'Vazirmatn', fontWeight: 700}}>تور { tour.origin || '...' } به { tour.destination || '......'}</h2>
                        </div>
                        <div className="flex justify-center w-full mt-[3.5rem]">
                            <img src={ tour.main_image } alt="tour-picture" className="rounded-[1.875rem] w-[80%] !h-[130.5]"/>
                        </div>
                        <div className="flex justify-center mt-[3.9375rem]">
                            <div className="flex justify-center gap-[1.5rem] items-center w-[40rem] h-[14rem] rounded-[10px] bg-[var(--color-light-beige)] p-[0.8125rem] text-center">
                                <div className="flex flex-col gap-[3.3125rem] justify-center items-center w-[11rem] p-[0.5rem]">
                                    <img src={ cach } alt="cach" className="w-[3.625rem] h-[3.625rem]" />
                                    <span style={{ fontFamily: 'Koodak', fontWeight: 700 }} className="text-2xl">{ tour.price } تومان</span>
                                </div>
                                <hr className="h-[9rem] w-[0.01rem] bg-black !opacity-100"/>
                                <div className="flex flex-col gap-[3.3125rem] justify-center items-center w-[11rem]">
                                    <img src={ timeRewind } alt="time-rewind" className="w-[3.625rem] h-[3.625rem]" />
                                    <span style={{ fontFamily: 'Koodak', fontWeight: 700 }} className="text-2xl">{ duration }</span>
                                </div>
                                <hr className="h-[9rem] w-[0.01rem] bg-black !opacity-100"/>
                                <div className="flex flex-col gap-[3.3125rem] justify-center items-center w-[11rem]">
                                    <img src={ support } alt="support" className="w-[3.625rem] h-[3.625rem]" />
                                    <span style={{ fontFamily: 'Koodak', fontWeight: 700 }} className="text-2xl">{ companyName }</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex mt-[4.0625rem] mb-[3.9375rem] mr-[11.3125rem]">
                            <div className="w-[80%] h-auto">
                                <span className="text-2xl" style={{ fontFamily: 'Vazirmatn', fontWeight: 400, whiteSpace: 'pre-wrap' }}>{ tour.description }</span>
                            </div>
                        </div>

                        {/* <div className="flex justify-center mr-[11.3125rem] w-[69.3125rem] text-xl">
                            { features }
                        </div> */}
                    
                    </>
                )
            }

                <TourReviews reviewsData={reviewsData} />

            <Footer />
        </>
     );
}
 
export default TourInformation;