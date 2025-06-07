// components/TourReviews.jsx
import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
// برای ایمپورت عکس پروفایل ثابت
import defaultProfilePic from '../../assets/images/profcomment.png'; 

// تابع کمکی برای تبدیل اعداد انگلیسی به فارسی
const toPersianNumber = (num) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  // اگر ورودی null یا undefined بود، صفر را برگردان
  if (num === null || typeof num === 'undefined') {
    return persianDigits[0];
  }
  return String(num).replace(/\d/g, (d) => persianDigits[parseInt(d)]);
};

// کامپوننت مجزا برای هر نظر
const ReviewCard = ({
  username,
  created_at,
  rating,
  trip_date,
  comment,
  likes, // نام prop همانطور که خواسته بودید
  dislikes, // نام prop همانطور که خواسته بودید
  profileImageSrc = defaultProfilePic,
}) => {
  // ۱. رفع تداخل نام و جلوگیری از خطای undefined
  const [likeCount, setLikeCount] = useState(likes ?? 0);
  const [dislikeCount, setDislikeCount] = useState(dislikes ?? 0);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
      setLiked(true);
      if (disliked) {
        setDislikeCount(dislikeCount - 1);
        setDisliked(false);
      }
    } else {
      setLikeCount(likeCount - 1);
      setLiked(false);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDislikeCount(dislikeCount + 1);
      setDisliked(true);
      if (liked) {
        setLikeCount(likeCount - 1);
        setLiked(false);
      }
    } else {
      setDislikeCount(dislikeCount - 1);
      setDisliked(false);
    }
  };

  const renderStars = (starRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= starRating) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-lg" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300 text-lg" />);
      }
    }
    return stars;
  };

  return (
    <div className="py-6 border-b-2 border-orange-500 last:border-b-0">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start">
          <img
            src={profileImageSrc}
            alt="Profile"
            className="w-12 h-12 rounded-full ml-4 mt-0 bg-neutral-400"
          />
          <div className="flex items-center">
            <div className="flex flex-col items-end pt-1">
              <p className="font-semibold text-lg text-gray-800" style={{fontFamily:'vazirmatn',fontWeight:700}}>{username}</p>
              <p className="text-sm text-gray-500">
                {toPersianNumber(created_at)}
              </p>
            </div>
            <div className="flex items-center border border-blue-500 rounded-full py-1 px-3 mr-4 shadow-md bg-white mb-10 flex-row-reverse">
              {renderStars(rating)}
            </div>
          </div>
        </div>
        <div className="text-gray-600 text-sm pt-2">
          <span className="font-medium">تاریخ سفر:</span>{' '}
          {toPersianNumber(trip_date)}
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4" style={{fontFamily:'vazirmatn',fontWeight:500}}>{comment}</p>
      <div className='flex justify-end'>
        <span className="ml-4 text-gray-400" style={{fontFamily:'vazirmatn',fontWeight:500}}>آیا این نظر مورد پسند شما بود؟</span>
        <div className="flex w-24 ltr items-center text-sm text-gray-500">
          <button
            onClick={handleLike}
            className={`flex items-center p-1 rounded-full ${liked ? 'text-blue-600 bg-blue-500' : 'hover:bg-gray-300'}`}
          >
            <AiOutlineLike className="text-lg " fill='gray' />
            {/* ۲. نمایش متغیر state جدید */}
            <span className="mr-1 text-gray-700">{toPersianNumber(likeCount)}</span>
          </button>
          <button
            onClick={handleDislike}
            className={`flex items-center p-1 rounded-full mr-2 ${disliked ? 'text-red-600 bg-red-500' : 'hover:bg-gray-300'}`}
          >
            <AiOutlineDislike className="text-lg" fill='gray' />
            {/* ۳. نمایش متغیر state جدید */}
            <span className="mr-1 text-gray-700">{toPersianNumber(dislikeCount)}</span>
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
            username={review.username}
            created_at={review.created_at}
            rating={review.rating}
            trip_date={review.trip_date}
            comment={review.comment}
            likes={review.likes} // نام prop همان است که باید باشد
            dislikes={review.dislikes} // نام prop همان است که باید باشد
          />
        ))}
      </div>
      {reviewsData.length > 3 && visibleReviewsCount < reviewsData.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMoreReviews}
            className="px-6 py-3 font-semibold rounded-lg decoration-solid hover:text-gray-300 focus:outline-none"
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