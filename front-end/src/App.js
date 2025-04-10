import React from "react";
import VerificationPage from "./pages/verificationPage/verificationPage";  // وارد کردن کامپوننت صفحه تأیید شماره تلفن
import { Route, Routes, BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserSignUpPage from "./pages/UserSignUp/UserSignUp.jsx";
import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery";
import LoginSignup from "./pages/LoginSignUp/LoginSignUp.jsx";



function App() {
  return (
    <BrowserRouter>
    <Routes>
<<<<<<< HEAD
      <Route exact path="/login" element={ <LoginPage/> }></Route>
      {/* <Route exact path="/" element={ <UserSignUpPage/> }></Route> */}
      <Route exact path="/" element={ <PasswordRecovery/> }></Route>
      <Route exact path="/verf" element={ <VerificationPage /> }/></Routes>
=======
      {/* <Route exact path="/" element={ <LoginPage/> }></Route> */}
      {/* <Route exact path="/" element={ <UserSignUpPage/> }></Route> */}
      {/* <Route exact path="/" element={ <PasswordRecovery/> }></Route> */}
      {/* <Route exact path="/" element={ <VerificationPage /> }/> */}
      <Route exact path="/" element={ <LoginSignup/> }></Route>
      </Routes>
>>>>>>> cb4eb5b2f468c1da62e5fbe8a46fa1740697ba57
    </BrowserRouter>
  );
}

export default App;
