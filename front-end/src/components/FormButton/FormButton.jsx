import styles from './form-button.module.css';
import Button from 'react-bootstrap/Button';

const FormButton = (props) => {
    const buttonText = props.buttonText;
    const buttonColor = props.buttonColor;
    const buttonTextColor = props.buttonTextColor;
    return ( 
        <div className={ styles.formButton}>
            <div className={ styles.buttonGroup }>
                <Button style={{ backgroundColor: buttonColor, color: buttonTextColor}} className={"formButton"}>{ buttonText }</Button>
                <p className="mt-2">
                    قبلا ثبت‌نام کرده‌اید؟ <a href="/login">ورود</a>
                </p>
            </div>
        </div>
     );
}
 
export default FormButton;