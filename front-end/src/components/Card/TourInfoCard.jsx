

const TourInfoCard = ({ title, destination, duration, price, imageUrl }) => {
  return (
    <div className="relative flex row-auto items-center bg-white rounded-xl border border-gray-200 w-[700px] mb-6 shadow-[0_4px_8px_#205781]">      
        <img
        src={imageUrl}
        alt={title}
        className=" w-51 h-auto mr-2.5 object-cover rounded-md"
      />

        <div className="text-wrap p-4 pr-2 flex-1 text-right">
            <h2 className="text-[15px] font-bold mb-1">{title}</h2>
            <p className="text-[14px] font-bold mb-1">
            <span className="font-semibold">مقصد:</span> {destination}
            </p>
            <p className="text-[14px] font-bold mb-1">
            <span className="font-semibold">مدت:</span> {duration}
            </p>
            <p className="text-[14px] font-bold mb-8">
            <span className="font-semibold">هزینه تور:</span> {price} تومان
            </p>
            <button className="absolute w-auto h-7 text-[15px] flex flex-row items-center left-2.5 bottom-4  bg-[#205781]  hover:bg-[#0f3a5b] transition ">
            جزئیات بیشتر
            </button>
        </div>
    </div>
  );
};

export default TourInfoCard;