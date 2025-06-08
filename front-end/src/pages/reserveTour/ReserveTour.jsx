// src/pages/ReserveTour.jsx
import React, { useState, useEffect, useCallback } from 'react';
import ShoppingCart from '../../components/reserveTour/shopingCart';
import RoomSelector from '../../components/reserveTour/RoomSelector';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import PassengerForm from '../../components/reserveTour/PassengerForm';
import { FaPlusCircle } from 'react-icons/fa';

const ReserveTour = () => {
  const [passengers, setPassengers] = useState([{}]); // Start with one empty passenger form
  const [tourData, setTourData] = useState(null); // To store tour details from backend
  const [roomOptions, setRoomOptions] = useState([]); // To store available room types
  const [selectedRooms, setSelectedRooms] = useState([]); // Changed to an array to hold selected room objects
  const [totalPrice, setTotalPrice] = useState(0);
  const [tourInfoText, setTourInfoText] = useState("");
  const [suggestedRoomCounts, setSuggestedRoomCounts] = useState([]); // New state for suggested rooms

  // Dummy tour ID for API call (replace with actual tour ID if dynamic)
  const tourId = 1;

  // Simulate fetching tour and room data from backend
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

  const handleRoomSelectionChange = useCallback((newSelectedRooms) => {
    // newSelectedRooms is already in the desired format [{room_type_id, count, ...}]
    setSelectedRooms(newSelectedRooms);
  }, []);

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
    selectedRooms.forEach(room => {
      currentTotalPrice += room.count * room.price_per_room;
      totalCapacity += room.count * room.capacity;
      tourInfoRooms.push(`${room.count} ${room.label}`);
    });
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
    if (passengers.length > 0 && roomOptions.length > 0) {
      let tempSuggestedRoomCounts = [];
      let remainingPassengers = passengers.length;

      // Prioritize filling higher capacity rooms first
      const sortedRoomOptions = [...roomOptions].sort((a, b) => b.capacity - a.capacity);

      for (const roomType of sortedRoomOptions) {
        if (remainingPassengers <= 0) break;

        // Calculate how many rooms of this type are needed for remaining passengers
        let roomsNeeded = Math.floor(remainingPassengers / roomType.capacity);
        
        // Ensure we don't try to reserve more than available
        let roomsToAllocate = Math.min(roomsNeeded, roomType.available);
        
        if (roomsToAllocate > 0) {
          tempSuggestedRoomCounts.push({
            room_type_id: roomType.id,
            count: roomsToAllocate,
            label: roomType.label // Add label for easier debugging/display
          });
          remainingPassengers -= (roomsToAllocate * roomType.capacity);
        }
      }
      // If there are still passengers left, try to fit them into smaller rooms (or one extra larger room)
      if (remainingPassengers > 0) {
          // This part can be more sophisticated. For now, try to add one more of the smallest room that fits.
          const smallestRoom = roomOptions.sort((a,b) => a.capacity - b.capacity)[0];
          if (smallestRoom && smallestRoom.available > 0) {
            let found = false;
            tempSuggestedRoomCounts = tempSuggestedRoomCounts.map(room => {
              if (room.room_type_id === smallestRoom.id) {
                found = true;
                return {...room, count: room.count + 1};
              }
              return room;
            });
            if (!found && smallestRoom.available > 0) {
              tempSuggestedRoomCounts.push({
                room_type_id: smallestRoom.id,
                count: 1,
                label: smallestRoom.label
              });
            }
          }
      }

      setSuggestedRoomCounts(tempSuggestedRoomCounts);
    }

  }, [passengers.length, tourData, selectedRooms, roomOptions]); // Recalculate when passengers count or selected rooms change

  const handleSubmit = async () => {
    // Prepare data for backend
    const reservedRoomsArray = selectedRooms.map(room => ({
      room_type_id: room.room_type_id,
      count: room.count
    }));

    const reservationData = {
      tour_id: tourId,
      passengers: passengers, // This is already in the correct format for backend
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
          {index === passengers.length - 1 && ( // Add button only after the last form
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
        suggestedRoomCounts={suggestedRoomCounts} // Pass suggested rooms to RoomSelector
      />

      <ShoppingCart
        tourInfo={tourInfoText}
        totalPrice={totalPrice}
        buttonLink="#" // You might want to make this dynamic or trigger handleSubmit
      />
      <div className="h-20" />
      <Footer />
    </div>
  );
};

export default ReserveTour;