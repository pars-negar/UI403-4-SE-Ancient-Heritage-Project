import styles from './form-button.module.css';

const FormButton = (props) => {
    const buttonText = props.buttonText;
    const buttonColor = props.buttonColor;
    const buttonTextColor = props.buttonTextColor;
    return ( 
        <div className={ styles.formButton}>
            <button style={{ backgroundColor: buttonColor, color: buttonTextColor}} className={"formButton"}>{ buttonText }</button>
        </div>
     );
}
 
export default FormButton;