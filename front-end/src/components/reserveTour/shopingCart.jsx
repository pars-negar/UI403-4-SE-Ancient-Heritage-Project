// src/components/ShoppingCart.jsx
import React from "react";

const ShoppingCart = ({ tourInfo, totalPrice, buttonLink }) => {
  return (
    <div
      className="max-w-2xl mx-auto mt-10 mb-12 p-6 rounded-md text-right"
      dir="rtl" style={{borderLeft: "2px solid #205781", border: "2px solid #205781e2", boxShadow: "1px 5px 10px 	#585858"}}>
      <h2 className="!text-2xl font-bold border-r-4 border-blue-700 pr-2 mb-4"  style={{fontFamily:'vazirmatn', fontWeight:600}}>
        سبد خرید
      </h2>
      <div className="text-sm text-gray-800 leading-7 mb-4 whitespace-pre-line"  style={{fontFamily:'vazirmatn', fontWeight:500}}>
        {tourInfo}
      </div>
      <hr className="my-4" />
      <div className="flex justify-between items-center text-lg font-medium mb-6"  style={{fontFamily:'vazirmatn', fontWeight:500}}>
        <span>مجموع</span>
        <span>
          {totalPrice.toLocaleString("fa-IR")}{" "}
          <span className="text-sm font-normal" style={{fontFamily:'vazirmatn', fontWeight:500}}>تومان</span>
        </span>
      </div>
      <div className="text-center">
        <a href={buttonLink}>
          <button className="bg-[#205781] hover:bg-[#1a4a6c] text-white py-2 rounded-md !w-40"  style={{fontFamily:'gandom', fontWeight:500}}>
            ادامه خرید
          </button>
        </a>
      </div>
    </div>
  );
};

export default ShoppingCart;
