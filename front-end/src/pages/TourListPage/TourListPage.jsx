import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SearchBox from "../../components/SearchBox/SearchBox";
import TourInfoList from "../../components/Card/TourInfoList";


const TourListPage = () => {
    return (
        <div className="text-right mr-3.5">
        <Navbar/>
        <h1 className="!text-4xl font-bold mb-6 mr-1 border-r-4 border-[#205781] pr-1.5 !mt-[4.1875rem]" style={{ fontFamily: 'Vazirmatn', fontWeight: 700 }}>تورهای گردشگری تاریخی</h1>
        <div className="-mt-[190px] mr-[8%]"><SearchBox/></div>
         <h1 className="text-xl font-bold !mt-12 border-r-4 border-[#205781] pr-1.5 ">لیست تورها</h1>
        <TourInfoList/>
        <Footer/>
        </div>

    );
}
 
export default TourListPage