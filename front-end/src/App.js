import LoginPage from  './pages/LoginPage/LoginPage.jsx'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import RightPanel from './components/RightPanel/LoginPageRightpanel.jsx'


function App() {
    return (
      <BrowserRouter>
      <Routes>
              {/* <Route exact path="/" element={ <LoginPage/> }></Route> */}
              <Route exact path="/" element={ <RightPanel/> }></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;