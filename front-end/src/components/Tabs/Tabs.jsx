import { useState, Children } from "react";

const Tabs = ({ labels = [], children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const childrenArray = Children.toArray(children);

  return (
    <div className="w-full max-w-2xl">
      {/* Header */}
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

      {/* Content */}
      <div className="p-4 border border-t-0 border-gray-200 bg-white text-black">
        {childrenArray[activeIndex]}
      </div>
    </div>
  );
};

export default Tabs;
