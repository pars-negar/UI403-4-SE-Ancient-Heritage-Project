import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import VerificationPage from "./pages/verificationPage/verificationPage";  // وارد کردن کامپوننت صفحه تأیید شماره تلفن
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
// import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery";
//import LoginSignUp from "./pages/LoginSignUp/LoginSignUp.jsx"
// import Navbar from "./components/Navbar/Navbar.jsx"
// import TourismAttractionCard from "../src/components/Card/tourismAttractionCard.jsx";
// import HomePage from "./pages/Home/Home.jsx";
import "./App.css";
// import TourPage from "./pages/TourPage/TourPage.jsx";
import Home from './pages/Home/Home.jsx';
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
import SuccessMassage from './pages/SuccessMassage/SuccessMassage.jsx';
import SetNewPassword from './pages/SetNewPassword/SetNewPassword.jsx';

import TourInformation from './pages/ToursList/ToursList.jsx';
import TourListPage from './pages/TourListPage/TourListPage.jsx';
import HistoricSearch from './components/SearchBox/SearchFilter.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>

        {/* <Route exact path="/" element={ <UserSignUpPage/> }></Route> */}
        {/*<Route exact path="/" element={ <TourleaderSignUp/> }></Route>}
        {/* <Route exact path="/login" element={ <LoginPage/> }></Route> */}
        {/* <Route exact path="/" element={ <UserSignUpPage/> }></Route> */}
        {/* <Route exact path="/" element={ <PasswordRecovery/> }></Route> */}
        {/* <Route exact path="/" element={ <LoginSignUp/> }></Route> */}
        {/* <Route exact path="/" element={ <VerificationPage /> }/> */}


        {/* <Route exact path="/LoginSignUp" element={ <LoginSignUp/> }></Route>
        <Route exact path="/UserSignUp" element={ <UserSignUpPage/> }></Route>
        <Route exact path="/TourleaderSignUp" element={ <TourleaderSignUp/> }></Route>
        <Route exact path="/login" element={ <LoginPage/> }></Route>
        <Route exact path="/passwordRecovery" element={ <PasswordRecovery/> }></Route>
        <Route path="/verify-otp" element={< VerificationPage/>} />
        {/* <Route path="/success" element={< SuccessMassage/>} /> */}
        <Route path="/verify-otp" element={< VerificationPage/>} />

        <Route exact path="/LoginSignUp" element={ <LoginSignUp/> }></Route>
        <Route exact path="/LoginSignUp/UserSignUp" element={ <UserSignUpPage/> }></Route>
        <Route exact path="/LoginSignUp/TourleaderSignUp" element={ <TourleaderSignUp/> }></Route>
        <Route exact path="/LoginSignUp/login" element={ <LoginPage/> }></Route>
        <Route exact path="/passwordRecovery" element={ <PasswordRecovery/> }></Route>
        
        <Route path="/success" element={<SuccessMassage/>} />
        <Route path="/tourInformation" element={<TourInformation/>} />
        <Route path="tourlistpage" element={<TourListPage/>}/>
        <Route path="/historical" element={<HistoricSearch/>}/>

        {/* <Route exact path="/" element={ <Navbar />} /> */}
        <Route exact path="/" element={ <Home />}></Route> 
        {/* <Route exact path="/" element={<CityAttraction cityName="اصفهان" imageSrc="./assets/images/esf.png" />}></Route> */}
        {/* <Route exact path="/" element={<TourismAttractionCard image="./assets/images/takht-jamshid.png" title="تخت جمشید" description="!شکوه بی‌همتای امپراتوری هخامنشی را از نزدیک لمس کنید" backgroundColor="#FF8C1A"/>}></Route> */}
        {/* <Route exact path="/" element={ < FourCityCards/>}></Route> */}
        <Route exact path="/setnewpass" element={ < SetNewPassword/>}></Route>
        {/* <Route exact path="/tourlist" element={<TourList/>}></Route> */}
     
      </Routes>
    </Router>
  </StrictMode>
)



