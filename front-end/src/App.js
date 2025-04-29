import React from "react";
import VerificationPage from "./pages/verificationPage/verificationPage";  // وارد کردن کامپوننت صفحه تأیید شماره تلفن
import { Route, Routes, BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import UserSignUpPage from "./pages/UserSignUp/UserSignUp.jsx";
import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery";
import LoginPage from "./pages/LoginPage/LoginPage.jsx"
import LoginSignUp from "./pages/LoginSignUp/LoginSignUp.jsx"
// // import Navbar from "./components/Navbar/Navbar.jsx"
// // import TourismAttractionCard from "../src/components/Card/tourismAttractionCard.jsx";
=======
// import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery";
//import LoginSignUp from "./pages/LoginSignUp/LoginSignUp.jsx"
// import Navbar from "./components/Navbar/Navbar.jsx"
// import TourismAttractionCard from "../src/components/Card/tourismAttractionCard.jsx";
>>>>>>> 0d54b0f0852ba4d18fca35ffbb1e7b0d7bbed102
import "./App.css";
import TourPage from "./pages/TourPage/TourPage.jsx";
import Home from "./pages/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx"
// import CityAttraction from "./components/card/CityAttraction.jsx";
// import TourismAttractionCard from "./components/card/tourismAttractionCard.jsx";
// import FourCityCards from "./components/card/FourCityCards.jsx";
import PlacesPage from "./pages/PlacesPage/PlacesPage.jsx";
import TourLeaderPage from './pages/TourLeaderSignUp/TourleaderSignUp.jsx'

import UserSignUpPage from "./pages/UserSignUp/UserSignUp.jsx";
import VerificationPage from "./pages/verificationPage/verificationPage.jsx";
import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery.jsx"
import TourleaderSignUp from "./pages/TourLeaderSignUp/TourleaderSignUp.jsx"
import LoginPage from "./pages/LoginPage/LoginPage.jsx"
import LoginSignUp from "./pages/LoginSignUp/LoginSignUp.jsx"





function App() {
  return (
    <BrowserRouter>
    <Routes>

      <Route exact path="/" element={ <LoginSignUp/> }></Route>
      <Route exact path="/UserSignUp" element={ <UserSignUpPage/> }></Route>
      <Route exact path="/TourleaderSignUp" element={ <TourleaderSignUp/> }></Route>
      <Route exact path="/login" element={ <LoginPage/> }></Route>
      <Route exact path="/passwordRecovery" element={ <PasswordRecovery/> }></Route>
      <Route path="/verify-otp" element={< VerificationPage/>} />

<<<<<<< HEAD
      <Route exact path="/sign" element={ <UserSignUpPage/> }></Route>
      <Route exact path="/login" element={ <LoginPage/> }></Route>
      <Route exact path="/pass" element={ <PasswordRecovery/> }></Route>
      <Route exact path="/" element={ <LoginSignUp/> }></Route>
      <Route exact path="/verf" element={ <VerificationPage /> }/>
=======
>>>>>>> 0d54b0f0852ba4d18fca35ffbb1e7b0d7bbed102

      {/* <Route exact path="/" element={ <Navbar />} /> */}
       <Route exact path="/home" element={ <Home />}></Route>
       <Route exact path="/tour" element={ <TourLeaderPage />}></Route>
      {/* <Route exact path="/city" element={<CityAttraction cityName="اصفهان" imageSrc="./assets/images/esf.png" />}></Route> */}
      {/* <Route exact path="/" element={<TourismAttractionCard image="./assets/images/takht-jamshid.png" title="تخت جمشید" description="!شکوه بی‌همتای امپراتوری هخامنشی را از نزدیک لمس کنید" backgroundColor="#FF8C1A"/>}></Route> */}
      {/* <Route exact path="/" element={ < FourCityCards/>}></Route> */}
<<<<<<< HEAD
      <Route exact path="/places" element={ <PlacesPage/>}></Route>
  
=======
>>>>>>> 0d54b0f0852ba4d18fca35ffbb1e7b0d7bbed102

      </Routes>
    </BrowserRouter>
  );
}
export default App;