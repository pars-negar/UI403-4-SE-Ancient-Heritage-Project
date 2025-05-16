// src/components/ShoppingCart.jsx
import React from 'react';

const ShoppingCart = ({ tourInfo, totalPrice, buttonLink }) => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border-2 rounded-md shadow-md border-blue-700 text-right" dir="rtl">
      <h2 className="text-lg font-bold border-r-4 border-blue-700 pr-2 mb-4">سبد خرید</h2>
      <div className="text-sm text-gray-800 leading-7 mb-4 whitespace-pre-line">
        {tourInfo}
      </div>
      <hr className="my-4" />
      <div className="flex justify-between items-center text-lg font-medium mb-6">
        <span>مجموع</span>
        <span>
          {totalPrice.toLocaleString('fa-IR')} <span className="text-sm font-normal">تومان</span>
        </span>
      </div>
      <div className="text-center">
        <a href={buttonLink}>
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md">
            ادامه خرید
          </button>
        </a>
      </div>
    </div>
  );
};

export default ShoppingCart;
