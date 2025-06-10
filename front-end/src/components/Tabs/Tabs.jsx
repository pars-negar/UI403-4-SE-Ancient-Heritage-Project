import { useState, Children } from "react";
import { Link } from "react-router-dom";

const Tabs = ({ labels = [], children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const childrenArray = Children.toArray(children);

  return (
    <div className="w-full">
      <div className="flex justify-between w-full" style={{marginTop: "90px", padding: "0px 390px"}}>
        <div className="flex text-right flex-row-reverse">
          {labels.map((label, index) => (
              <div className="flex gap-[0.5rem] whitespace-nowrap text-right m-0">
              {/* <hr className="!w-[5px] !h-[3.5rem] border-none !bg-[var(--color-orange)] opacity-100 rounded-[8px]" /> */}
              <div style={
                    {
                      borderRight: "4px solid orange",
                      height: "30px",
                      marginTop: "25px"
                    }
                  }>
                <button
                  key={label}
                  onClick={() => setActiveIndex(index)}
                  className={`py-0 pe-1 ps-5  ${
                  activeIndex === index
                      ? "text-black"
                      : "text-black"
                  }`}
                  style={
                    {
                     fontSize: "18px",
                     fontWeight: "bold",
                     fontFamily:"vazirmatn"
                    }
                  }
                  
              >
                  {label}
              </button>
              </div>
              </div>
          ))}
        </div>
        {/* <Link to={`/tour/${tour.id}`}> */}
        {/* <Link to="/tourlistonly">
          <button className=" bg-[#ffffff] text-[#f58119]"
          style={{width:"100%", border: "2px solid #f58119", color: "#f58119", padding: "10px 12px", fontSize: "16px", fontFamily: "vazirmatn"}}>مشاهده بیشتر</button>
        </Link> */}
      </div>
      {/* Content */}
      <div className="p-4   bg-white text-black">
        {childrenArray[activeIndex]}
      </div>
    </div>
  );
};

export default Tabs;
