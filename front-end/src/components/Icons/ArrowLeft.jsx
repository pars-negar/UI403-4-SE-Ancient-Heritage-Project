import { useState } from "react";

const ArrowLeft = (props) => {
    const defualtColor = props.defualtColor;
    const hoverColor = props.hoverColor;
    const className = props.className;
    const [color, setColor] = useState(defualtColor);
    return ( 
        <>
            <svg 
                width="30" 
                height="30" 
                viewBox="0 0 38 38" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => setColor(hoverColor)}
                onMouseLeave={() => setColor(defualtColor)}
                style={{ color: color }}
                className={ className }
            >
            <g clip-path="url(#clip0_845_676)">
            <path 
                d="M36.6431 19H1.35742" 
                stroke="currentColor" 
                stroke-width="6" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
            <path 
                d="M10.8574 9.5L1.35742 19L10.8574 28.5" 
                stroke="currentColor" 
                stroke-width="6" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_845_676">
            <rect width="38" height="38" fill="white"/>
            </clipPath>
            </defs>
            </svg>

        </>
     );
}
 
export default ArrowLeft;