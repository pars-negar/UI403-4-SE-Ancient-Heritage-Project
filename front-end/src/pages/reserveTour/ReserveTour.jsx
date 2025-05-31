// src/pages/ReserveTour.jsx
import React from 'react';
import ShoppingCart from '../../components/reserveTour/shopingCart';
import RoomSelector from '../../components/reserveTour/RoomSelector';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import PassengerForm from '../../components/reserveTour/PassengerForm';

const ReserveTour = () => {
  const tourInfo = `تور تهران به اصفهان
زمان حرکت: 4 اردیبهشت 1404
تعداد مسافر: 2
قیمت تور به ازای هر مسافر: 4,000,000 تومان`;

  return (
    <div dir="rtl" className="p-4">

      <Navbar/>
      <div className="b-10" />

      <PassengerForm
        tourPath="تورها > تور اصفهان"
        tourTitle="تور تهران به اصفهان"
      />


      <RoomSelector
        title="اقامتگاه اصفهان"
        roomData={[
          { label: "سه نفره", remaining: 2 },
          { label: "دو نفره", remaining: 2 },
        ]}
      />
      <ShoppingCart
        tourInfo={tourInfo}
        totalPrice={8000000}
        buttonLink="/payment"
      />
      <div className="h-20" />
      <Footer />
    </div>
    
  );
};

export default ReserveTour;
