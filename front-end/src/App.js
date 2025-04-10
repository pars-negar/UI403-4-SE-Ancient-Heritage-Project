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
      <Route exact path="/login" element={ <LoginPage/> }></Route>
      <Route exact path="/sign" element={ <UserSignUpPage/> }></Route>
=======
      {/* <Route exact path="/" element={ <UserSignUpPage/> }></Route> */}
      {/* <Route exact path="/" element={ <LoginPage/> }></Route> */}
      {/* <Route exact path="/" element={ <UserSignUpPage/> }></Route> */}
>>>>>>> 83073de0c0b38514bc2934807164a4d280c3aac2
      {/* <Route exact path="/" element={ <PasswordRecovery/> }></Route> */}
      <Route exact path="/verf" element={ <VerificationPage /> }/>
      <Route exact path="/" element={ <LoginSignup/> }></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
