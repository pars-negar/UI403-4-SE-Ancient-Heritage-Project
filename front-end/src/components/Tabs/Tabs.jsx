import { useState, Children } from "react";
import { Link } from "react-router-dom";

const Tabs = ({ labels = [], children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const childrenArray = Children.toArray(children);

  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
        <div className="flex text-right">
          {labels.map((label, index) => (
              <div className="flex gap-[0.5rem] whitespace-nowrap text-right m-0">
              <hr className="!w-[5px] !h-[3.5rem] border-none !bg-[var(--color-orange)] opacity-100 rounded-[8px]" />
              <button
                  key={label}
                  onClick={() => setActiveIndex(index)}
                  className={`px-4 py-2 text-sm sm:text-base transition font-semibold ${
                  activeIndex === index
                      ? "text-black"
                      : "text-black"
                  }`}
              >
                  {label}
              </button>
              </div>
          ))}
        </div>
        {/* <Link to={`/tour/${tour.id}`}> */}
        <Link to=''>
          <button className="mt-5 ml-4 px-5 py-2 w-3/5 bg-[#f58119] text-black rounded cursor-pointer text-[15px] whitespace-nowrap leading-6 inline-block text-center">جزئیات بیشتر</button>
        </Link>
      </div>
      {/* Content */}
      <div className="p-4 border border-t-0 border-gray-200 bg-white text-black">
        {childrenArray[activeIndex]}
      </div>
    </div>
  );
};

export default Tabs;
