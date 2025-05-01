import styles from './success-massage-right-panel.module.css';
import React from 'react';
import checkPic from '../../assets/images/Subtract.png';
import FormButton from '../FormButton/FormButton';

const PasswordChanged = () => {
  return (
    <div className={styles.successContainer}>
      <img src={checkPic} alt="تغییر موفق" className={styles.checkIcon} />
      <p className={styles.successmessage}>رمز عبور شما با موفقیت تغییر کرد</p>
      <FormButton 
          buttonText="صفحه ورود" 
          buttonColor="--color-orange" 
          buttonColorHovered="--color-orange-hovered" 
          buttonTextColor="black"
      />  
      </div> 
  );
};

export default PasswordChanged;

