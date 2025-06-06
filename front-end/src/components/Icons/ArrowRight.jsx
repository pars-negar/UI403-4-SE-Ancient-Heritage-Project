import { useState } from "react";

const ArrowRight = (props) => {
    const defualtColor = props.defualtColor;
    const hoverColor = props.hoverColor;
    const className = props.className;
    const [color, setColor] = useState(defualtColor);
    return ( 
        <>
            <svg 
                width="30" 
                height="30" 
                viewBox="0 0 39 39" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => setColor(hoverColor)}
                onMouseLeave={() => setColor(defualtColor)}
                style={{ color: color }}
                className={ className }
                >
            <g clip-path="url(#clip0_845_681)">
            <path 
                d="M1.48462 19.0087L36.7695 19.2461" 
                stroke="currentColor" 
                stroke-width="6" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
            <path 
                d="M27.2063 28.6822L36.77 19.2463L27.3341 9.68261" 
                stroke="currentColor" 
                stroke-width="6" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_845_681">
            <rect 
                width="38" 
                height="38" 
                fill="white" 
                transform="translate(37.999 38.2549) rotate(-179.615)"/>
            </clipPath>
            </defs>
            </svg>

        </>
     );
}
 
export default ArrowRight;