import { useState } from 'react';
import styles from './form-button.module.css';
import Button from 'react-bootstrap/Button';


const FormButton = (props) => {
    const buttonText = props.buttonText;
    const buttonColor = props.buttonColor;
    const buttonColorHovered = props.buttonColorHovered;
    const buttonTextColor = props.buttonTextColor;

    const [isHovered, setIsHavered] = useState(false);

    return ( 
        <div className={ styles.formButton}>
            <div className={ styles.buttonGroup }>
                <Button style={{ backgroundColor: isHovered ? buttonColorHovered : buttonColor,
                                color: buttonTextColor
                                }} className={"formButton"}
                    onMouseEnter={() => setIsHavered(true)}
                    onMouseLeave={() => setIsHavered(false)}
                    >{ buttonText }
                </Button>
                {/* <p className="mt-2">
                    قبلا ثبت‌نام کرده‌اید؟ <a href="/login">ورود</a>
                </p> */}
            </div>
        </div>
     );
}
 
export default FormButton;