import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TourInformation from "../../components/TourInformation/TourInformation";
import TourReviews from "../../components/comment-tourinf/TourReviews";
import TourBookingCard from "../../components/Card/TourBookingCard";

const TourInformationPage = () => {
    const { id, category } = useParams();
    const [tourData, setTourData] = useState(null);
    const [reviewsData, setReviewsData] = useState([]);
    const [loadingTour, setLoadingTour] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [tourError, setTourError] = useState(null);

    useEffect(() => {
        const fetchTourDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/homepage/tour/${id}/`);
                if (response && response.status === 200) {
                    setTourData(response.data);
                    setTourError(null);
                } else {
                    setTourError("Failed to fetch tour details.");
                }
            } catch (error) {
                setTourError("Error fetching tour details. Please try again later.");
                console.error("Error during tour details fetch: ", error);
            } finally {
                setLoadingTour(false);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/comment/tour-comments");
                if (response && response.status === 200) {
                    // فیلتر کردن نظرات مربوط به این تور خاص
                    const filteredReviews = response.data.filter(review => review.tour === parseInt(id));
                    setReviewsData(filteredReviews);
                } else {
                    console.error("Failed to fetch reviews", response);
                }
            } catch (error) {
                console.error("Error during reviews fetch: ", error);
            } finally {
                setLoadingReviews(false);
            }
        };

        fetchTourDetails();
        fetchReviews();
    }, [id]);

    if (loadingTour || loadingReviews) {
        return <div className="text-center mt-20">در حال بارگذاری اطلاعات تور...</div>;
    }

    if (tourError) {
        return <div className="text-center mt-20 text-red-500">{tourError}</div>;
    }

    if (!tourData) {
        return <div className="text-center mt-20 text-gray-500">اطلاعاتی برای این تور یافت نشد.</div>;
    }

    return (
        <>
            <Navbar />
            <div className="flex justify-center">
                <TourInformation tour={tourData} />
            </div>
            <hr className="!mr-[10%] !ml-[10%] bg-[#FB8101] w-[80%] !mt-[2rem]"/>
            <div className="!mr-[10%] flex justify-start items-center w-full"> 
                <h1 className="!text-[25px] !mb-5" style={{fontFamily: 'Vazirmatn', fontWeight: 700}}>اطلاعات مسئول تور</h1>
            </div>

            {/* TourBookingCard و TourReviews بدون تغییرات در props قبلی */}
            <TourBookingCard />
            <TourReviews reviewsData={reviewsData} />
            <Footer />
        </>
    );
}

export default TourInformationPage;