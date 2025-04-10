import React from "react";
import VerificationPage from "./pages/verificationPage/verificationPage";  // وارد کردن کامپوننت صفحه تأیید شماره تلفن
import { Route, Routes, BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserSignUpPage from "./pages/UserSignUp/UserSignUp.jsx";
import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery";
import LoginSignup from "./pages/LoginSignUp/LoginSignUp.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx"



function App() {
  return (
    <BrowserRouter>
    <Routes>
<<<<<<< HEAD

=======
>>>>>>> fe5d0a472e78f39d7febbf1e50696a603ff6439d
      {/* <Route exact path="/" element={ <UserSignUpPage/> }></Route> */}
      <Route exact path="/" element={ <LoginPage/> }></Route>
      {/* <Route exact path="/" element={ <UserSignUpPage/> }></Route> */}
      {/* <Route exact path="/" element={ <PasswordRecovery/> }></Route> */}
<<<<<<< HEAD
      {/* <Route exact path="/" element={ <VerificationPage /> }/> */}
      {/* <Route exact path="/" element={ <LoginSignup/> }></Route> */}
=======
>>>>>>> fe5d0a472e78f39d7febbf1e50696a603ff6439d
      </Routes>
    </BrowserRouter>
  );
}
export default App;
