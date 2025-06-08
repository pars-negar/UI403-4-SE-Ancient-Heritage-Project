// src/components/reserveTour/RoomSelector.jsx
import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const RoomSelector = ({ title, roomData, onRoomChange, suggestedRoomCounts }) => {
  // Initialize counts based on roomData or suggestedRoomCounts
  const [counts, setCounts] = useState(() => {
    if (suggestedRoomCounts && roomData) {
      const initialCounts = roomData.map(room => {
        const suggested = suggestedRoomCounts.find(sug => sug.room_type_id === room.id);
        return suggested ? suggested.count : 0;
      });
      return initialCounts;
    }
    return roomData.map(() => 0);
  });

  // Update counts if suggestedRoomCounts changes
  useEffect(() => {
    if (suggestedRoomCounts && roomData) {
      const newCounts = roomData.map(room => {
        const suggested = suggestedRoomCounts.find(sug => sug.room_type_id === room.id);
        return suggested ? suggested.count : 0;
      });
      setCounts(newCounts);
    }
  }, [suggestedRoomCounts, roomData]);


  useEffect(() => {
    // Notify parent component about changes in room selection
    const updatedSelectedRooms = counts.map((count, index) => ({
      room_type_id: roomData[index].id,
      count: count,
      price_per_room: roomData[index].price_per_room,
      capacity: roomData[index].capacity,
      label: roomData[index].label
    })).filter(room => room.count > 0); // Only pass selected rooms
    
    onRoomChange(updatedSelectedRooms);
  }, [counts, roomData, onRoomChange]);

  const increment = (index) => {
    setCounts((prev) => {
      const newCounts = [...prev];
      // Ensure we don't exceed available rooms
      if (newCounts[index] < roomData[index].available) {
        newCounts[index]++;
      }
      return newCounts;
    });
  };

  const decrement = (index) => {
    setCounts((prev) => {
      const newCounts = [...prev];
      // Ensure count doesn't go below zero
      if (newCounts[index] > 0) {
        newCounts[index]--;
      }
      return newCounts;
    });
  };

  return (
    <div
      className="rounded-lg shadow-md p-4 w-fit mx-auto mt-10"
      dir="rtl" // Add dir="rtl" here for consistency
      style={{
        borderLeft: "2px solid #205781",
        border: "2px solid #205781e2",
        borderBottom: "3px solid #205781e2",
        boxShadow: "1px 2px 10px #585858",
      }}
    >
      <h2
        className="!text-2xl font-bold text-right border-r-4 border-blue-800 pr-2 mb-4"
        style={{ fontFamily: "vazirmatn", fontWeight: 700 }}
      >
        {title}:
      </h2>
      <div className="flex flex-col md:flex-row gap-4">
        {roomData.map((room, index) => (
          <div
            key={room.id} // Use room.id as key for stable identification
            className="flex items-center justify-between border rounded px-4 py-2 w-80"
          >
            <div
              className="text-sm text-gray-700 whitespace-nowrap"
              style={{ fontFamily: "vazirmatn", fontWeight: 500 }}
            >
              {room.label} (باقیمانده: {room.available})
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => increment(index)}
                className="!text-gray-800 !text-sm"
                style={{ zIndex: 12 }}
              >
                <FaPlus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center">{counts[index]}</span>
              <span
                className="text-sm"
                style={{ fontFamily: "vazirmatn", fontWeight: 500 }}
              >
                اتاق
              </span>
              <button
                onClick={() => decrement(index)}
                className="!text-gray-800 !text-sm"
                style={{ zIndex: 12 }}
              >
                <FaMinus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomSelector;