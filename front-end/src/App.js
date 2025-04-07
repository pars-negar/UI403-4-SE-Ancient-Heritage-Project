import React from "react";
import VerificationPage from "./pages/verificationPage/verificationPage.jsx";  // وارد کردن کامپوننت صفحه تأیید شماره تلفن
import { Route, Routes, BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserSignUpPage from "./pages/UserSignUpPage/UserSignUpPage";
import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery";
import LoginPage from "./pages/LoginPage/LoginPage.jsx"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={ <LoginPage/> }></Route>
      {/* <Route exact path="/" element={ <UserSignUpPage/> }></Route> */}
      <Route exact path="/" element={ <PasswordRecovery/> }></Route>
      <Route exact path="/verf" element={ <VerificationPage /> }/></Routes>
    </BrowserRouter>
  );
}

export default App;
