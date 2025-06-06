// pages/PlacesPage.jsx
import React, { useEffect, useState } from 'react';
import PlaceSection from '../../components/Placescard/PlaceSection';
import PlaceModal from '../../components/Placescard/PlaceModal';
import "../../components/Placescard/Places.css";
import styles from "./PlacesPage.module.css"
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import SearchFilter from '../../components/SearchBox/SearchFilter';
import HeroSection from '../../components/Placescard/HeroSection';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const PlacesPage = () => {
  const param = useParams()
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [hiddenGems, setGems] = useState([]);
  const [popularPlaces, setPopular] = useState([]);
  const [search, setSearch] = useState(param.city);
  const [loading, setLoading] = useState(true);
  
  

  
  useEffect(() => {
      getData();
    }, []);
  
const getData = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/homepage/attraction-page/"
    );
    if (response && response.status === 200) {
        console.log(response.data);
        setPopular(response.data.featured);
        setGems(response.data.hidden);
        
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

  console.log(param)
  async function get_data() {
  
        try {
            const response = await axios.get(`http://${IP}:8000/remove/` , search);
            if (response.status === 200) {
              setPopular(response.data.popular)
              setGems(response.data.gems)
                 
            }
          }
          catch (e) {
          console.log(e)}
    }

    useEffect(() => {
      get_data()
    });

  return (
    <div>
      <Navbar />
       <HeroSection text={`جاذبه‌های تاریخی ایران${param.city != undefined ? "/" + param.city : ""}`} showImage={true} />

      <div className={styles.editSearch}>
      <SearchFilter setSearch={setSearch}/>
      </div>
      <div className={styles.compJazebe}>
      <PlaceSection
        title="پربازدیدترین مکان‌های تاریخی"//{`${search.province} , ${search.term} , ${search.periods}`}
        places={popularPlaces}//{popular}
        onMoreInfo={setSelectedPlace}
      />
      <PlaceSection
        title="کمتر شناخته‌شده اما جذاب"
        places={hiddenGems}//{gems}
        onMoreInfo={setSelectedPlace}
      />
      <PlaceModal
        show={!!selectedPlace}
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
      />
      </div>
      <Footer />
    </div>
  );
};

export default PlacesPage;