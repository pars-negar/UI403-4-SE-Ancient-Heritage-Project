import { useState, useEffect } from "react";
import axios from "axios";

import Tabs from "../../components/Tabs/Tabs";
import TourCard from "../../components/Card/TourCard";

const TourTab = () => {
  const [latestTours, setLatestTours] = useState([]);
  const [topTours, setTopTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/homepage/");
      if (response && response.status === 200) {
        setLatestTours(response.data.latest || []);
        setTopTours(response.data.top || []);
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

  const renderTours = (tours,isTop) => (
    <div
      style={{
        display: "flex",
        gap: "8px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : tours && tours.length > 0 ? (
        tours.map((tour) => <TourCard key={tour.id} tour={tour} isTop={isTop}/>)
      ) : (
        <p>هیچ توری یافت نشد.</p>
      )}
    </div>
  );

  return (
    <Tabs labels={["تورهای اخیر", "تورهای برتر"]} className="w-full">
      <div id="home-tour-card">{renderTours(latestTours,false)}</div>
      <div>{renderTours(topTours,true)}</div>
    </Tabs>
  );
};

export default TourTab;
