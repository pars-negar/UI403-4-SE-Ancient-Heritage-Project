// src/pages/ReserveTour.jsx
import React from 'react';
import ShoppingCart from '../../components/reserveTour/shopingCart';
import RoomSelector from '../../components/reserveTour/RoomSelector';

const ReserveTour = () => {
  const tourInfo = `تور تهران به اصفهان
زمان حرکت: 4 اردیبهشت 1404
تعداد مسافر: 2
قیمت تور به ازای هر مسافر: 4,000,000 تومان`;

  return (
    <div dir="rtl" className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">رزرو تور</h1>

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
    </div>
  );
};

export default ReserveTour;
