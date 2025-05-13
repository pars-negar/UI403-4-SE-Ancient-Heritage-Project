import styles from './right-panel.module.css'
import selfStyles from './success-massage-right-panel.module.css';
import React from 'react';
import checkPic from '../../assets/images/Subtract.png';
import FormButton from '../FormButton/FormButton';
import { Link } from 'react-router-dom';


const PasswordChanged = () => {
  return (
    <div className={selfStyles.successContainer}>
      <img src={checkPic} alt="تغییر موفق" className={selfStyles.checkIcon} />
      <p className={selfStyles.successmessage}>رمز عبور شما با موفقیت تغییر کرد</p>
      {/* <FormButton 
          buttonText="صفحه ورود" 
          buttonColor="--color-orange" 
          buttonColorHovered="--color-orange-hovered" 
          buttonTextColor="black"
      />   */}
      <Link to='/loginsignup/login'>
        <button className={ styles.button }>صفحه ورود</button>
      </Link>
      </div> 
  );
};

export default PasswordChanged;