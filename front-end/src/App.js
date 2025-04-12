import React from "react";
import VerificationPage from "./pages/verificationPage/verificationPage";  // وارد کردن کامپوننت صفحه تأیید شماره تلفن
import { Route, Routes, BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserSignUpPage from "./pages/UserSignUp/UserSignUp.jsx";
import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery";
import LoginPage from "./pages/LoginPage/LoginPage.jsx"
import LoginSignUp from "./pages/LoginSignUp/LoginSignUp.jsx"
// import Navbar from "./components/Navbar/Navbar.jsx"
// import TourismAttractionCard from "../src/components/Card/tourismAttractionCard.jsx";
// import HomePage from "./pages/Home/Home.jsx";
import "./App.css";
import mainPlscePage from "../src/pages/PlacesPage/PlacesPage.jsx"
// import TourPage from "./pages/TourPage/TourPage.jsx";
import Home from "./pages/Home/Home.jsx";
import PlacesPage from "./pages/PlacesPage/PlacesPage";
// import Footer from "./components/Footer/Footer.jsx"
// import CityAttraction from "./components/card/CityAttraction.jsx";
// import TourismAttractionCard from "./components/card/tourismAttractionCard.jsx";
//import FourCityCards from "./components/card/FourCityCards.jsx";





function App() {
  return (
    <BrowserRouter>
    <Routes>


      {/* <Route exact path="/" element={ <UserSignUpPage/> }></Route> */}
      {/* <Route exact path="/" element={ <LoginPage/> }></Route> */}
      {/* <Route exact path="/" element={ <UserSignUpPage/> }></Route> */}
      {/* <Route exact path="/" element={ <PasswordRecovery/> }></Route> */}
      {/* <Route exact path="/" element={ <LoginSignUp/> }></Route> */}
      {/* <Route exact path="/" element={ <VerificationPage /> }/> */}
      {/* <Route exact path="/" element={ <Navbar />} /> */}
      {/* <Route exact path="/" element={ <Home />}></Route> */}
      {/* <Route exact path="/" element={<CityAttraction cityName="اصفهان" imageSrc="./assets/images/esf.png" />}></Route> */}
      {/* <Route exact path="/" element={<TourismAttractionCard image="./assets/images/takht-jamshid.png" title="تخت جمشید" description="!شکوه بی‌همتای امپراتوری هخامنشی را از نزدیک لمس کنید" backgroundColor="#FF8C1A"/>}></Route> */}
      {/* <Route exact path="/" element={ < FourCityCards/>}></Route> */}
      <Route exact path="/" element={ <PlacesPage/>} />


      </Routes>
    </BrowserRouter>
  );
}
export default App;