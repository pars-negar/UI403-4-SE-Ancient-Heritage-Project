import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCart from '../../components/reserveTour/shopingCart';
import RoomSelector from '../../components/reserveTour/RoomSelector';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import PassengerForm from '../../components/reserveTour/PassengerForm';
import { FaPlusCircle } from 'react-icons/fa';

import { useParams } from 'react-router-dom';
const ReserveTour = () => {
  const navigate = useNavigate();

  // Auth guard:
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('برای مشاهده این صفحه باید وارد شوید.');
      navigate('/loginSignUp'); // یا صفحه ثبت نام
      return;
    }
    // TODO: اگر نقش کاربر را باید چک کنید، اینجا انجام دهید (decode توکن یا API)
  }, [navigate]);

  const emptyPassenger = { fullName: '', nationalCode: '', birthDate: '' };
  const [passengers, setPassengers] = useState([emptyPassenger]);

  const [tourData, setTourData] = useState(null);
  const [roomOptions, setRoomOptions] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tourInfoText, setTourInfoText] = useState("");
  const [suggestedRoomCounts] = useState([]);

  const { tourId } = useParams();

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`http://127.0.0.1:8000/api/homepage/tour/${tourId}/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log("Tour data status:", response.status); // 👈
        if (!response.ok) throw new Error("خطا در دریافت اطلاعات تور");
        const data = await response.json();
        console.log("Fetched tour data:", data); // 👈
        setTourData(data);
        setRoomOptions(data.available_rooms);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    
    fetchTourData();
  }, [tourId]);

  const addPassengerForm = () => {
    setPassengers([...passengers, {}]);
  };

const handlePassengerChange = (index, newData) => {
  const updated = [...passengers];
  updated[index] = newData;
  setPassengers(updated);
};



  const handleRoomSelectionChange = useCallback((newSelectedRooms) => {
    setSelectedRooms(newSelectedRooms);
  }, []);

useEffect(() => {
  if (!tourData || !selectedRooms) return;

  let total = 0;
  let info = `تعداد مسافران: ${passengers.length}\n`;

  selectedRooms.forEach(room => {
    const roomPrice = room.price_per_room * room.count;
    total += roomPrice;
    info += `${room.label} × ${room.count} = ${roomPrice.toLocaleString("fa-IR")} تومان\n`;
  });

  setTotalPrice(total);
  setTourInfoText(info);
}, [passengers.length, tourData, selectedRooms]);


const handleSubmit = async () => {
  if (passengers.length === 0) {
    alert("لطفاً حداقل یک مسافر اضافه کنید.");
    return;
  }

  if (selectedRooms.length === 0) {
    alert("لطفاً حداقل یک اتاق انتخاب کنید.");
    return;
  }

  const reservedRoomsArray = selectedRooms.map(room => ({
    room_type_id: room.room_type_id,
    count: room.count
  }));

  const reservationData = {
    tour_id: tourId,
    passengers: passengers,
    reserved_rooms: reservedRoomsArray,
  };

  try {
    const response = await fetch('http://127.0.0.1:8000/api/tour-reservations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(reservationData),
    });
    console.log("Sending reservation data to backend:", reservationData);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'خطا در ثبت رزرو');
    }

    const result = await response.json();
    alert(`رزرو با موفقیت انجام شد! شناسه رزرو: ${result.reservation_id}`);
    // Reset یا Redirect
  } catch (error) {
    alert('خطا در رزرو: ' + error.message);
  }
};


  return (
    <div dir="rtl" className="p-4">
      <Navbar />
      <div className="mb-10" />

      {passengers.map((passenger, index) => (
        <div key={index} className="mb-8">
          <PassengerForm
            tourPath={tourData?.path || "تورها"}
            tourTitle={tourData?.name || "نام تور"}
            passengerIndex={index}
            onPassengerChange={(data) => handlePassengerChange(index, data)}
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
        suggestedRoomCounts={suggestedRoomCounts}
      />

      <ShoppingCart
        tourInfo={tourInfoText}
        totalPrice={totalPrice}
        onSubmit={handleSubmit}
      />

      <div className="h-20" />
      <Footer />
    </div>
  );
};

export default ReserveTour;
