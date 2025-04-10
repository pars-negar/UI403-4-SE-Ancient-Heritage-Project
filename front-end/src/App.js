import React from "react";
import VerificationPage from "./pages/verificationPage/verificationPage";  // وارد کردن کامپوننت صفحه تأیید شماره تلفن
import { Route, Routes, BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserSignUpPage from "./pages/UserSignUp/UserSignUp.jsx";
import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery";
import LoginPage from "./pages/LoginPage/LoginPage.jsx"
import LoginSignUp from "./pages/LoginSignUp/LoginSignUp.jsx"
import TourismAttractionCard from "./components/card/tourismAttractionCard.jsx";
import HomePage from "./pages/Home/Home.jsx";
import "./App.css";
import TourPage from "./pages/TourPage/TourPage.jsx";
import Home from "./pages/Home/Home.jsx";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* <Route exact path="/" element={ <UserSignUpPage/> }></Route> */}
      {/* <Route exact path="/" element={ <LoginPage/> }></Route> */}
      {/* <Route exact path="/" element={ <PasswordRecovery/> }></Route> */}
      {/* <Route exact path="/" element={ <LoginSignUp/> }></Route> */}
      {/* <Route exact path="/" element={ <VerificationPage /> }/> */}
      {/* <Route exact path="/" element={ <PasswordRecovery/> }></Route> */}
      {/* <Route path="/tour/:id" element={<TourPage />} /></Routes> */}
  
      <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
