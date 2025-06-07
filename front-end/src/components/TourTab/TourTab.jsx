import { useState, useEffect, use } from "react";
import axios from 'axios';

import Tabs from "../../components/Tabs/Tabs";
import TourCard from "../../components/Card/TourCard";

const TourTab = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
    getData();
    }, []);
    

    const getData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/homepage/"
            );
            // console.log(response)
          if (response && response.status === 200) {
            setTours(response.data.top || []);
            setLoading(false);
          } else {
            console.error("Failed to fetch data", response);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error during fetch: ", error);
          setLoading(false);
        }
      };


    return ( 
        <Tabs labels={['تورهای اخیر' ,'تورهای برتر']} className=" w-full " >
          <div id="home-tour-card">
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' ,marginTop:'0px' }}>
              {loading ? (
                <p>در حال بارگذاری...</p>
              ) : (
                tours && tours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                    
                )) 
              )}
            </div>
        </div>

          <div>
            
          </div>
        </Tabs>
     );
}
 
export default TourTab;