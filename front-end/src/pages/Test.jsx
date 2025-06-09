import React, { useState, useEffect, useRef } from "react";
import axios from "axios";


const Test = () => {

    const token = localStorage.getItem("access_token");
    console.log("Access Token:", token);

    const [loading, setLoading] = useState(true);
    const [oneUser, setOneUser] = useState([]);
    useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/users/oneuser",
        {
            headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (response && response.status === 200) {
        setOneUser(response.data || []);
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
  <>
    {loading ? (
      <p>در حال بارگذاری...</p>
    ) : (
      <div>
        <h1>{oneUser.username}</h1>
        <h2>{oneUser.role}</h2>
      </div>
    )}
  </>
);

}
 
export default Test;