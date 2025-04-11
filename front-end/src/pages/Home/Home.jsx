
import React, { useEffect, useState } from "react";
import TourCard from "../../components/Card/TourCard";
import axios from "axios"


const Home = () => {

  const [tours, setTours] = useState([])

  useEffect(() => {
    get_data()
    
     }, []);

  async function get_data(event) {
    try {
        const response = await axios.get("http://localhost:8001/tours");
        if (response.status === 200) {
          console.log(response)
          setTours(response.data)
        }
      }
      catch (e) {
      console.log(e)}
  }


  return (
    <div className="tours-wrapper">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
};

export default Home;
