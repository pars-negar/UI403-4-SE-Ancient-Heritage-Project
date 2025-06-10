// import { useState } from "react";

const DropDownIcon = ({ className }) => {
    // const defualtColor = props.defualtColor;
    // const hoverColor = props.hoverColor;
    // const [color, setColor] = useState(defualtColor);
    return ( 
        
        <>
            <svg 
                width="18" 
                height="18" 
                viewBox="0 0 18 18" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={ className }
                // onMouseEnter={() => setColor(hoverColor)}
                // onMouseLeave={() => setColor(defualtColor)}
            >
            <g clipPath="url(#clip0_2091_1897)">
            <path 
                d="M0.642578 4.94981L8.54972 12.8569C8.60744 12.9184 8.67715 12.9675 8.75454 13.001C8.83194 13.0345 8.91538 13.0518 8.99972 13.0518C9.08406 13.0518 9.1675 13.0345 9.2449 13.001C9.3223 12.9675 9.39201 12.9184 9.44972 12.8569L17.3569 4.94981" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_2091_1897">
            <rect 
                width="18" 
                height="18" 
                fill="white" 
                transform="matrix(0 -1 1 0 0 18)"/>
            </clipPath>
            </defs>
            </svg>

        </>
     );
}
 
export default DropDownIcon;
