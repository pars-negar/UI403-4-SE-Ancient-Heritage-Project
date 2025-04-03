import React from "react";
// import VerificationPage from "./components/VerificationPage";  // وارد کردن کامپوننت صفحه تأیید شماره تلفن
import { Route, Routes, BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar';
import UserSignUpPage from "./pages/UserSignUp/UserSignUpPage";

function App() {
  return (
    
    <BrowserRouter>
     {/* <Navbar /> */}
    <Routes>
      {/* <Route exact path="/">
      </Route> */}
      <Route exact path="/" element={ <UserSignUpPage/> }></Route>
      {/* <Route exact path="/" element={ <VerificationPage /> }/> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
