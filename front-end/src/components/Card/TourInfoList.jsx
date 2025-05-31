import TourInfoCard from "./TourInfoCard";

import pasargadImage from "../../assets/images/pasargad-tour.png";
import zigooratImage from "../../assets/images/zigoorat-tour.png";
import golestanImage from "../../assets/images/golestan-tour.png";

const tours = [
  {
    title: "تور تخت جمشید و پاسارگاد",
    destination: "استان فارس (شیراز، مرودشت)",
    duration: "3 روز و 2 شب",
    price: "3,000,000",
    imageUrl: pasargadImage,
  },
  {
    title: "تور شوش و زیگورات چغازنبیل",
    destination: "خوزستان (شوش، هفت‌تپه، چغازنبیل)",
    duration: "2 روز و 1 شب",
    price: "2,500,000",
    imageUrl: zigooratImage,
  },
  {
    title: "تور کاخ گلستان و بازار تاریخی تهران",
    destination: "تهران",
    duration: "1 روزه",
    price: "900,000",
    imageUrl: golestanImage,
  },
];

const TourInfoList = () => {
  return (
    <div className="p-8 text-right">
      <h1 className="text-xl font-bold mb-6 border-r-4 border-[#205781] pr-1.5 ">لیست تورها</h1>
      <div className="flex flex-col content-center items-center mt-5">{tours.map((tour, index) => (
        <TourInfoCard key={index} {...tour} />
      ))}
      </div>
    </div>
  );
};

export default TourInfoList;
