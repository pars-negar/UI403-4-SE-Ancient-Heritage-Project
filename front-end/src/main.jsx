import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from "react";
// import VerificationPage from "./pages/verificationPage/verificationPage";  // وارد کردن کامپوننت صفحه تأیید شماره تلفن
import { Route, Routes, BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery";
//import LoginSignUp from "./pages/LoginSignUp/LoginSignUp.jsx"
// import Navbar from "./components/Navbar/Navbar.jsx"
// import TourismAttractionCard from "../src/components/Card/tourismAttractionCard.jsx";
// import HomePage from "./pages/Home/Home.jsx";
import "./App.css";
// import TourPage from "./pages/TourPage/TourPage.jsx";
import Home from "./pages/Home/Home.jsx";
// import Footer from "./components/Footer/Footer.jsx"
// import CityAttraction from "./components/card/CityAttraction.jsx";
// import TourismAttractionCard from "./components/card/tourismAttractionCard.jsx";
// import FourCityCards from "./components/card/FourCityCards.jsx";
import UserSignUpPage from "./pages/UserSignUp/UserSignUp.jsx";
import VerificationPage from "./pages/verificationPage/verificationPage.jsx";
import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery.jsx"
import TourleaderSignUp from "./pages/TourLeaderSignUp/TourleaderSignUp.jsx"
import LoginPage from "./pages/LoginPage/LoginPage.jsx"
import LoginSignUp from "./pages/LoginSignUp/LoginSignUp.jsx"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>



      {/* <Route exact path="/" element={ <UserSignUpPage/> }></Route> */}
      {/*<Route exact path="/" element={ <TourleaderSignUp/> }></Route>}
      {/* <Route exact path="/login" element={ <LoginPage/> }></Route> */}
      {/* <Route exact path="/" element={ <UserSignUpPage/> }></Route> */}
      {/* <Route exact path="/" element={ <PasswordRecovery/> }></Route> */}
      {/* <Route exact path="/" element={ <LoginSignUp/> }></Route> */}
      {/* <Route exact path="/" element={ <VerificationPage /> }/> */}

      <Route exact path="/LoginSignUp" element={ <LoginSignUp/> }></Route>
      <Route exact path="/UserSignUp" element={ <UserSignUpPage/> }></Route>
      <Route exact path="/TourleaderSignUp" element={ <TourleaderSignUp/> }></Route>
      <Route exact path="/login" element={ <LoginPage/> }></Route>
      <Route exact path="/passwordRecovery" element={ <PasswordRecovery/> }></Route>
      <Route path="/verify-otp" element={< VerificationPage/>} />

      {/* <Route exact path="/" element={ <Navbar />} /> */}
      <Route exact path="/" element={ <Home />}></Route>
      {/* <Route exact path="/" element={<CityAttraction cityName="اصفهان" imageSrc="./assets/images/esf.png" />}></Route> */}
      {/* <Route exact path="/" element={<TourismAttractionCard image="./assets/images/takht-jamshid.png" title="تخت جمشید" description="!شکوه بی‌همتای امپراتوری هخامنشی را از نزدیک لمس کنید" backgroundColor="#FF8C1A"/>}></Route> */}
      {/* <Route exact path="/" element={ < FourCityCards/>}></Route> */}
     
      </Routes>
    </BrowserRouter>
)
