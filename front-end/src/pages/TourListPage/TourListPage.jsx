import { useState, useEffect } from "react";
import axios from 'axios';


import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SearchBox from "../../components/SearchBox/SearchBox";
import TourInfoList from "../../components/Card/TourInfoList";
import TourInfoCard from "../../components/Card/TourInfoCard";
import { Torus } from "lucide-react";


const TourListPage = () => {
    const [allTours, setAllTours] = useState([]);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        getData();
      }, []);
    
      const getData = async () => {
        try {
          const response = await axios.get("https://parsnegarback.liara.run/api/homepage/tour-page/");
          if (response && response.status === 200) {
            console.log(response.data);
            setAllTours(response.data.all_tours || []);
            setLoading(false); // Change loading state to false when data is loaded
          } else {
            console.error("Failed to fetch data", response);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error during fetch: ", error);
          setLoading(false); // Even in case of error, set loading to false
        }
      };



 

   



    return (
        <div className="text-right mr-3.5">
        <Navbar/>
        <h1 className="!text-4xl font-bold mb-6 mr-1 border-r-4 border-[#205781] pr-1.5 !mt-[4.1875rem]" style={{ fontFamily: 'Vazirmatn', fontWeight: 700 }}>تورهای گردشگری تاریخی</h1>
        <div className="-mt-[190px] mr-[8%]"><SearchBox/></div>
        
        <div>
            {console.log(allTours)}
            {
                loading ? (
                  <p>در حال بارگذاری...</p>
                ) : (
                    allTours && allTours.map( (tour) => (
                        <>
                        <TourInfoCard 
                            key={tour.id}
                            // title={tour.title}
                            destination={tour.destination}
                            duration={tour.duration}
                            price={tour.price}
                            imageUrl={tour.imageUrl}
                        />
                        <h1>helow</h1>
                        </>
            )))}
        </div>

        <Footer/>
        </div>

    );
}
 
export default TourListPage