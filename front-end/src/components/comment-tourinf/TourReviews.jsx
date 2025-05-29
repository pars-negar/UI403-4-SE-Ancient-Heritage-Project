// components/TourReviews.jsx
import React, { useState } from 'react';
import { FaStar, FaRegStar, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
// برای ایمپورت عکس پروفایل ثابت
import defaultProfilePic from '../../assets/images/profcomment.png'; 

// تابع کمکی برای تبدیل اعداد انگلیسی به فارسی
const toPersianNumber = (num) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, (d) => persianDigits[parseInt(d)]);
};

// کامپوننت مجزا برای هر نظر
const ReviewCard = ({
  userName,
  userProfileDate,
  starRating,
  travelDate,
  reviewText,
  initialLikes,
  initialDislikes,
  profileImageSrc = defaultProfilePic, // اینجا از عکس ایمپورت شده استفاده می‌شود
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
      if (disliked) {
        setDislikes(dislikes - 1);
        setDisliked(false);
      }
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDislikes(dislikes + 1);
      setDisliked(true);
      if (liked) {
        setLikes(likes - 1);
        setLiked(false);
      }
    } else {
      setDislikes(dislikes - 1);
      setDisliked(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-lg" />); // استفاده از FaStar
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300 text-lg" />); // استفاده از FaRegStar
      }
    }
    return stars;
  };

  return (
    <div className="py-6 border-b-2 border-orange-500 last:border-b-0">
      {/* این div اصلی که محتوای بالای کامنت رو در دو سمت (راست و چپ) نگه می‌داره */}
      <div className="flex items-start justify-between mb-4">
        {/* بلوک راست: شامل عکس پروفایل، اسم، تاریخ پروفایل و ستاره‌ها */}
        <div className="flex items-start"> {/* از items-start استفاده شده برای تراز از بالا */}
          <img
            src={profileImageSrc}
            alt="Profile"
            className="w-12 h-12 rounded-full ml-4 mt-0 bg-neutral-400" // ml-4 برای فاصله و mt-0 برای تراز عمودی اولیه
          />
          <div className="flex items-center">
            {/* بلوک اطلاعات کاربر (اسم و تاریخ) */}
            <div className="flex flex-col items-end pt-1"> {/* pt-1 برای کمی پایین آوردن اسم و تاریخ */}
              <p className="font-semibold text-lg text-gray-800" style={{fontFamily:'vazirmatn',fontWeight:700}}>{userName}</p>
              <p className="text-sm text-gray-500">
                {toPersianNumber(userProfileDate)}
              </p>
            </div>

            {/* بلوک ستاره‌ها با کادر و سایه */}
            <div className="flex items-center border border-blue-500 rounded-full py-1 px-3 mr-4 shadow-md bg-white mb-10 flex-row-reverse">
              {renderStars(starRating)}
            </div>
          </div>
        </div>

        {/* بلوک چپ: تاریخ سفر */}
        <div className="text-gray-600 text-sm pt-2"> {/* pt-2 برای تنظیم دقیق‌تر فاصله عمودی */}
          <span className="font-medium">تاریخ سفر:</span>{' '}
          {toPersianNumber(travelDate)}
        </div>
      </div>

      {/* متن نظر */}
      <p className="text-gray-700 leading-relaxed mb-4" style={{fontFamily:'vazirmatn',fontWeight:500}}>{reviewText}</p>

      {/* بخش لایک و دیسلایک */}
      <div className='flex justify-end'>
        <span className="ml-4 text-gray-400" style={{fontFamily:'vazirmatn',fontWeight:500}}>آیا این نظر مورد پسند شما بود؟</span>
      <div className="flex w-24 ltr items-center text-sm text-gray-500">
        <button
          onClick={handleLike}
          className={`flex items-center p-1 rounded-full ${liked ? 'text-blue-600 bg-blue-500' : 'hover:bg-gray-300'}`}
        >
          <AiOutlineLike className="text-lg " fill='gray' />
          <span className="mr-1 text-gray-700">{toPersianNumber(likes)}</span>
        </button>
        <button
          onClick={handleDislike}
          className={`flex items-center p-1 rounded-full mr-2 ${disliked ? 'text-red-600 bg-red-500' : 'hover:bg-gray-300'}`}
        >
          <AiOutlineDislike className="text-lg" fill='gray' />
          <span className="mr-1 text-gray-700">{toPersianNumber(dislikes)}</span>
        </button>
      </div>
      </div>
       
    </div>
  );
};


const TourReviews = ({ reviewsData }) => {
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(3);

  const handleShowMoreReviews = () => {
    setVisibleReviewsCount(reviewsData.length);
  };

  return (
    <div className="font-sans max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-r-4 border-orange-500 pr-2" style={{fontFamily:'vazirmatn',fontWeight:700}}>
        نظرات کاربران
      </h2>

      <div>
        {reviewsData.slice(0, visibleReviewsCount).map((review, index) => (
          <ReviewCard
            key={index}
            userName={review.userName}
            userProfileDate={review.userProfileDate}
            starRating={review.starRating}
            travelDate={review.travelDate}
            reviewText={review.reviewText}
            initialLikes={review.initialLikes}
            initialDislikes={review.initialDislikes}
          />
        ))}
      </div>

      {reviewsData.length > 3 && visibleReviewsCount < reviewsData.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMoreReviews}
            className="px-6 py-3  font-semibold rounded-lg decoration-solid hover:text-gray-300 focus:outline-none "
            style={{color: "#205781"}}
          >
            <span style={{borderBottom: "2px solid #205781", paddingBottom: "5px"}} className='hover:text-gray-500 hover:border-gray-300'>دیدن نظرات بیشتر</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TourReviews;