
import React from 'react';
import TourLeaderPanel from '../../components/UserPanel/TourLeaderPanel';
import TourRegistrationList from '../../components/UserPanel/TourRegistrationList/TourRegistrationList'; 

const TourRegPage = () => {
 
  const tourData = {
    tourCity: "اصفهان",
    origin: "تهران",
    destination: "اصفهان",
    registrantsCount: 8,
    registrations: [
      {
        fullName: "مهدیه حیدری",
        nationalCode: "1050258748",
        phoneNumber: "09876543214",
        paymentStatus: "پرداخت شده",
        registrationTime: "1404/02/01",
      },
      {
        fullName: "منا احمدی",
        nationalCode: "1050258748",
        phoneNumber: "09876543214",
        paymentStatus: "پرداخت شده",
        registrationTime: "1404/02/01",
      },
      {
        fullName: "ایلیا ربانی",
        nationalCode: "1050258748",
        phoneNumber: "09876543214",
        paymentStatus: "پرداخت شده",
        registrationTime: "1404/02/01",
      },
      {
        fullName: "حسن دیودار",
        nationalCode: "1050258748",
        phoneNumber: "09876543214",
        paymentStatus: "پرداخت شده",
        registrationTime: "1404/02/01",
      },
      {
        fullName: "جمشید دوستی",
        nationalCode: "1050258748",
        phoneNumber: "09876543214",
        paymentStatus: "پرداخت شده",
        registrationTime: "1404/02/01",
      },
      {
        fullName: "سمانه محمدی",
        nationalCode: "1050258748",
        phoneNumber: "09876543214",
        paymentStatus: "پرداخت شده",
        registrationTime: "1404/02/01",
      },
      {
        fullName: "روزبه حیدری",
        nationalCode: "1050258748",
        phoneNumber: "09876543214",
        paymentStatus: "پرداخت شده",
        registrationTime: "1404/02/01",
      },
      {
        fullName: "شبنم ایمانی",
        nationalCode: "1050258748",
        phoneNumber: "09876543214",
        paymentStatus: "پرداخت شده",
        registrationTime: "1404/02/01",
      },
      {
        fullName: "وحید مرادی",
        nationalCode: "1050258748",
        phoneNumber: "09876543214",
        paymentStatus: "پرداخت شده",
        registrationTime: "1404/02/01",
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-right" dir="rtl">
      {/* Right side: TourLeaderPanel */}
      <div className="w-[26.25rem] bg-white shadow-lg overflow-y-auto">
        <TourLeaderPanel />
      </div>

      {/* Left side: TourRegistrationList */}
      <div className="flex-1 p-8 overflow-y-auto">
        <TourRegistrationList
          tourCity={tourData.tourCity}
          origin={tourData.origin}
          destination={tourData.destination}
          registrantsCount={tourData.registrantsCount}
          registrations={tourData.registrations}
        />
      </div>
    </div>
  );
};

export default TourRegPage;