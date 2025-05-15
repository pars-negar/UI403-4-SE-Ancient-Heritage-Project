import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SearchBox from "../../components/SearchBox/SearchBox";
import TourInfoList from "../../components/Card/TourInfoList";


const TourListPage = () => {
    return (
        <div className="text-right mr-3.5">
        <Navbar/>
        <h1 className="text-xl font-bold mb-6 mr-1 border-r-4 border-[#205781] pr-1.5 ">تورهای گردشگری تاریخی</h1>
        <div className="-mt-[190px] mr-[8%]"><SearchBox/></div>
        <TourInfoList/>
        <Footer/>
        </div>

    );
}
 
export default TourListPage