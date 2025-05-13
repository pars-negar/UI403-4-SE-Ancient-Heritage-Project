import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import cach from '../../assets/icons/cach.svg'
import timeRewind from '../../assets/icons/time-rewind.svg'
import support from '../../assets/icons/support.svg'
import tourPicture from '../../assets/images/naghshejahan.svg'

const TourInformation = () => {
    const origin = "تهران";
    const destination = 'اصفهان';
    const cost = '4,000,000 تومان';
    const companyName = 'شرکت گردشگری ایران گشت';
    const duration = '3 روز و 2 شب';
    const tourDescription = 'اصفهان، مهد هنر و معماری ایرانی، شهری با کاشی‌کاری‌هایی که نفس را بند می‌آورد. در این تور سه‌روزه، با ما همراه شوید تا قدم در میدان نقش جهان بگذاریم، از مناره‌های زیبای مسجد جامع عکس بگیریم و در خیابان چهارباغ عبور از تاریخ را حس کنیم. نصف جهان اینجاست… منتظر شماست!';
    const features = "";

    return ( 
        <>
            <Navbar />
                <div className="w-auto h-[5.375rem] flex items-center gap-[1rem] pr-[2.25rem]">
                    <hr className="h-[3.5rem] bg-[var(--color-orange)] w-[0.4rem] rounded-[8px] opacity-100"/>
                    <h2 className="!text-4xl" style={{ fontFamily: 'Vazirmatn', fontWeight: 700}}>تور { origin } به { destination }</h2>
                </div>
                <div className="flex justify-center w-full mt-[3.5rem]">
                    {/* have difficulty fixing the size of the image....it just doeesn't make sense! */}
                    <img src={ tourPicture } alt="tour-picture" className="rounded-[1.875rem] w-[80%] !h-[130.5]"/>
                </div>
                <div className="flex justify-center mt-[3.9375rem]">
                    <div className="flex justify-center gap-[1.5rem] items-center w-[40rem] h-[14rem] rounded-[10px] bg-[var(--color-light-beige)] p-[0.8125rem] text-center">
                        <div className="flex flex-col gap-[3.3125rem] justify-center items-center w-[11rem] p-[0.5rem]">
                            <img src={ cach } alt="cach" className="w-[3.625rem] h-[3.625rem]" />
                            <span style={{ fontFamily: 'Koodak', fontWeight: 700 }} className="text-2xl">{ cost }</span>
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
                
                <div className="flex justify-center mt-[4.0625rem]">
                    <div className="w-[80%] h-auto">
                        <span className="text-2xl" style={{ fontFamily: 'Vazirmatn', fontWeight: 400 }}>{ tourDescription }</span>
                    </div>
                </div>

                <div className="flex justify-center">

                </div>

            <Footer />
        </>
     );
}
 
export default TourInformation;