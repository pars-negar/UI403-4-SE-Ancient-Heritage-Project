import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import cach from '../../assets/icons/cach.svg'
import timeRewind from '../../assets/icons/time-rewind.svg'
import support from '../../assets/icons/support.svg'
import tourPicture from '../../assets/images/naghshejahan.svg'

const TourInformation = () => {
    
    console.log('TourInformation render'); // چک کردن رندر شدن
    const { id, category } = useParams();
    const location = useLocation();

    const [tour, setTour] = useState({});
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(true);
    const companyName = 'شرکت گردشگری ایران گشت';
    const duration = 'kjkgh';
    const features = 'lkj;h'
    const [tourPlan, setTourPlan] = useState([]);


    useEffect(() => {
    const fetchTourData = async () => {
        try {
            const response = await axios.get(
                `https://parsnegarback.liara.run/api/homepage/tour/${id}/`
            );
            if (response && response.status === 200) {
                const foundTour = response.data;
                setTour(foundTour);
                setTourPlan(foundTour.daily_schedules || []);
                setError([]);
            } else {
                setError(['خطا در دریافت اطلاعات.']);
            }
        } catch (error) {
            console.error("Error during fetch: ", error);
            setError(['مشکلی در دریافت اطلاعات رخ داده است.']);
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
                                {/* { tour.description } */}
                                <div className="text-3xl" style={{ fontFamily: 'Vazirmatn', fontWeight: 400, whiteSpace: 'pre-wrap' }}>توضیحات تور</div>
                                <div>
                                    <h3 className="!text-3xl font-bold" style={{ fontFamily: 'Vazirmatn', fontWeight: 700 }}>ویژگی های تور</h3>
                                    <h4 className="!text-2xl" style={{ fontFamily: 'Vazirmatn', fontWeight: 500 }}>بازدید از اماکن تاریخی:</h4>
                                    <p>bla bla bla</p>
                                    <h4 className="!text-2xl" style={{ fontFamily: 'Vazirmatn', fontWeight: 500 }}>اقامت:</h4>
                                    <p>bla bla bla</p>
                                    <h4 className="!text-2xl" style={{ fontFamily: 'Vazirmatn', fontWeight: 500 }}>حمل‌ونقل:</h4>
                                    <p>bla bla bla</p>
                                    <h4 className="!text-2xl" style={{ fontFamily: 'Vazirmatn', fontWeight: 500 }}>بیمه سفر:</h4>
                                    <p>bla bla bla</p>
                                    <h4 className="!text-2xl" style={{ fontFamily: 'Vazirmatn', fontWeight: 500 }}>راهنما و خدمات گردشگری:</h4>
                                    <p>bla bla bla</p>
                                </div>

                                <div>
                                    <h3 className="!text-3xl font-bold" style={{ fontFamily: 'Vazirmatn', fontWeight: 700 }}>برنامه روزانه</h3>
                                    
                                    {tourPlan.map((dayPlan, index) => (
                                        <div className="tour-day" key={index}>
                                        <img src={dayPlan.image} alt={dayPlan.day} className="tour-image" />
                                        <div className="tour-details">
                                            <h3>{dayPlan.day}</h3>
                                            <ul>
                                            {dayPlan.activities.map((activity, i) => (
                                                <li key={i}>{activity}</li>
                                            ))}
                                            </ul>
                                        </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* <div className="flex justify-center mr-[11.3125rem] w-[69.3125rem] text-xl">
                            { features }
                        </div> */}
                        
                    </>
                )
            }
        </div>
     );
}
 
export default TourInformation;