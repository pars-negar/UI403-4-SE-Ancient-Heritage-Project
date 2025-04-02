import React from "react";
import VerificationPage from "./components/VerificationPage";  // وارد کردن کامپوننت صفحه تأیید شماره تلفن
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<VerificationPage />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
