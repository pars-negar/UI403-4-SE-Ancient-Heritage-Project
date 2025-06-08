// src/pages/ReserveTour.jsx
import React, { useState, useEffect, useCallback } from 'react';
import ShoppingCart from '../../components/reserveTour/shopingCart';
import RoomSelector from '../../components/reserveTour/RoomSelector';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import PassengerForm from '../../components/reserveTour/PassengerForm';
import { FaPlusCircle } from 'react-icons/fa';

const ReserveTour = () => {
  const [passengers, setPassengers] = useState([{}]);
  const [tourData, setTourData] = useState(null);
  const [roomOptions, setRoomOptions] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [tourInfoText, setTourInfoText] = useState("");

  const tourId = 1; // Dummy tour ID for API call (replace with actual tour ID if dynamic)

  useEffect(() => {
    // In a real app, you'd make an API call here, e.g., using axios.
    // For now, we'll use mock data.
    const mockTourData = {
      id: tourId,
      name: "تور تهران به اصفهان",
      base_price: 4000000, // Price per passenger
      date: "4 اردیبهشت 1404",
      path: "تورها > تور اصفهان",
    };
    const mockRoomTypes = [
      { id: 1, label: "سه نفره", capacity: 3, price_per_room: 1500000, available: 2 },
      { id: 2, label: "دو نفره", capacity: 2, price_per_room: 1000000, available: 2 },
    ];
    setTourData(mockTourData);
    setRoomOptions(mockRoomTypes);
  }, [tourId]);

  const addPassengerForm = () => {
    setPassengers((prev) => [...prev, {}]);
  };

  const handlePassengerChange = useCallback((index, name, value) => {
    setPassengers((prev) => {
      const newPassengers = [...prev];
      newPassengers[index] = { ...newPassengers[index], [name]: value };
      return newPassengers;
    });
  }, []);

  const handleRoomSelectionChange = useCallback((newCounts) => {
    const updatedSelectedRooms = {};
    newCounts.forEach((count, index) => {
      if (count > 0) {
        updatedSelectedRooms[roomOptions[index].id] = {
          count: count,
          room_type_id: roomOptions[index].id,
          price_per_room: roomOptions[index].price_per_room,
          capacity: roomOptions[index].capacity
        };
      }
    });
    setSelectedRooms(updatedSelectedRooms);
  }, [roomOptions]);

  // Calculate total price and tour info dynamically
  useEffect(() => {
    let currentTotalPrice = 0;
    let totalCapacity = 0;

    // Calculate price based on passengers
    if (tourData) {
      currentTotalPrice += passengers.length * tourData.base_price;
    }

    // Calculate price based on selected rooms
    const tourInfoRooms = [];
    for (const roomId in selectedRooms) {
      const room = selectedRooms[roomId];
      currentTotalPrice += room.count * room.price_per_room;
      totalCapacity += room.count * room.capacity;
      const roomLabel = roomOptions.find(opt => opt.id === room.room_type_id)?.label || `اتاق با شناسه ${room.room_type_id}`;
      tourInfoRooms.push(`${room.count} ${roomLabel}`);
    }
    setTotalPrice(currentTotalPrice);

    // Update tour info text for ShoppingCart
    if (tourData) {
      let infoText = `تور ${tourData.name}\nزمان حرکت: ${tourData.date}\nتعداد مسافر: ${passengers.length}\n`;
      if (tourInfoRooms.length > 0) {
        infoText += `اقامتگاه: ${tourInfoRooms.join(', ')}\n`;
      }
      infoText += `قیمت تور به ازای هر مسافر: ${tourData.base_price.toLocaleString("fa-IR")} تومان`;
      setTourInfoText(infoText);
    } else {
      setTourInfoText("");
    }

    // Suggest rooms based on passenger count (client-side simple suggestion)
    // This is a very basic suggestion and might need more complex logic based on your backend
    if (passengers.length > 0 && roomOptions.length > 0) {
      let suggestedRoomConfig = {};
      let remainingPassengers = passengers.length;

      // Try to fill 3-person rooms first, then 2-person
      const sortedRoomOptions = [...roomOptions].sort((a, b) => b.capacity - a.capacity);

      for (const roomType of sortedRoomOptions) {
        if (remainingPassengers <= 0) break;
        const roomsNeeded = Math.ceil(remainingPassengers / roomType.capacity);
        const roomsToAllocate = Math.min(roomsNeeded, roomType.available);
        
        if (roomsToAllocate > 0) {
          suggestedRoomConfig[roomType.id] = {
            count: roomsToAllocate,
            room_type_id: roomType.id,
            price_per_room: roomType.price_per_room,
            capacity: roomType.capacity
          };
          remainingPassengers -= (roomsToAllocate * roomType.capacity);
        }
      }
      // You might want to automatically set selectedRooms here if you want auto-suggestion
      // For now, we'll just log it or use it for display
      console.log("Suggested Room Configuration:", suggestedRoomConfig);
    }

  }, [passengers, tourData, selectedRooms, roomOptions]);

  const handleSubmit = async () => {
    // Prepare data for backend
    const reservedRoomsArray = Object.values(selectedRooms).map(room => ({
      room_type_id: room.room_type_id,
      count: room.count
    }));

    const reservationData = {
      tour_id: tourId,
      passengers: passengers,
      reserved_rooms: reservedRoomsArray,
    };

    console.log("Submitting:", reservationData);

    // In a real application, you would send this data to your backend API
    // Example using fetch:
    /*
    try {
      const response = await fetch('/api/reserve-tour/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include Authorization header if needed, e.g., 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Reservation failed');
      }

      const result = await response.json();
      alert('رزرو با موفقیت انجام شد! شناسه رزرو: ' + result.reservation_id);
      // Redirect or show success message
    } catch (error) {
      alert('خطا در رزرو: ' + error.message);
    }
    */
  };


  return (
    <div dir="rtl" className="p-4">
      <Navbar/>
      <div className="mb-10" />

      {passengers.map((passenger, index) => (
        <div key={index} className="mb-8">
          <PassengerForm
            tourPath={tourData?.path || "تورها"}
            tourTitle={tourData?.name || "نام تور"}
            passengerIndex={index}
            onPassengerChange={handlePassengerChange}
            passengerData={passenger}
          />
          {index === passengers.length - 1 && (
            <div className="text-center mt-6">
              <button
                onClick={addPassengerForm}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center mx-auto"
                style={{ width: '50px', height: '50px' }}
              >
                <FaPlusCircle className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      ))}

      <RoomSelector
        title="انتخاب اقامتگاه"
        roomData={roomOptions}
        onRoomChange={handleRoomSelectionChange}
      />

      <ShoppingCart
        tourInfo={tourInfoText}
        totalPrice={totalPrice}
        buttonLink="#"
      />
      <div className="h-20" />
      <Footer />
    </div>
  );
};

export default ReserveTour;