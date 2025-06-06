import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TourInformation from "../../components/TourInformation/TourInformation";


import TourReviews from "../../components/comment-tourinf/TourReviews";

const TourInformationPage = () => {
    
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
                <div className="flex justify-center">
                  <TourInformation />
                </div>
                <TourReviews reviewsData={reviewsData} />

            <Footer />
        </>
     );
}
 
export default TourInformationPage;