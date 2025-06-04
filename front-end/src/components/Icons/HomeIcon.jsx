import { useState } from "react";

const HomeIcon = (props) => {
    const defualtColor = props.defualtColor;
    const hoverColor = props.hoverColor;
    const [color, setColor] = useState(defualtColor);
    return ( 
        <>
            <svg 
                width="28" 
                height="28" 
                viewBox="0 0 28 28" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                // style={{ color }}
                onMouseEnter={() => setColor(hoverColor)}
                onMouseLeave={() => setColor(defualtColor)}
            >
            <g clip-path="url(#clip0_2071_1517)">
            <path 
                d="M1 14L14 1L27 14" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
            />
            <path 
                d="M5 17V27H23V17" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
            />
            </g>
            <defs>
                <clipPath id="clip0_2071_1517">
                <rect width="28" height="28" fill="white"/>
                </clipPath>
            </defs>
            </svg>

        </>
     );
}
 
export default HomeIcon;