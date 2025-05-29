// src/components/reserveTour/RoomSelector.jsx
import React, { useState } from "react";

const RoomSelector = ({ title, roomData }) => {
  const [counts, setCounts] = useState(roomData.map(() => 0));

  const increment = (index) => {
    setCounts((prev) => {
      const newCounts = [...prev];
      newCounts[index]++;
      return newCounts;
    });
  };

  const decrement = (index) => {
    setCounts((prev) => {
      const newCounts = [...prev];
      if (newCounts[index] > 0) newCounts[index]--;
      return newCounts;
    });
  };

  return (
    <div className=" rounded-lg shadow-md p-4 w-fit mx-auto mt-10"  style={{borderLeft: "2px solid #205781", border: "2px solid #205781e2",borderBottom: "3px solid #205781e2", boxShadow: "1px 2px 10px 	#585858"}}>
      <h2 className="!text-2xl font-bold text-right border-r-4 border-blue-800 pr-2 mb-4">
        {title}:
      </h2>
      <div className="flex flex-col md:flex-row gap-4">
        {roomData.map((room, index) => (
          <div
            key={index}
            className="flex items-center justify-between border rounded px-4 py-2 w-80"
          >
            <div className="text-sm text-gray-700 whitespace-nowrap">
              {room.label} (باقیمانده: {room.remaining})
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => decrement(index)}
                className="text-lg text-gray-700 font-bold"
              >
                –
              </button>
              <span className="w-6 text-center">{counts[index]}</span>
              <span className="text-sm">اتاق</span>
              <button
                onClick={() => increment(index)}
                className="text-lg text-blue-700 font-bold"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomSelector;
