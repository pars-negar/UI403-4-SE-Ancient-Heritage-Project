import React from 'react';
import styles from './SearchBox.module.css';
import FormButton from './FormButton/FormButton';

function SearchBox() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>جستجوی تور</h2>
      <div className={styles.form}>
        <select className={styles.input}>
          <option value="">مبدا(شهر)</option>
        </select>
        <select className={styles.input}>
          <option value="">مقصد(شهر)</option>
        </select>
        <input type="date" className={styles.input} placeholder="تاریخ رفت" />
        <input type="date" className={styles.input} placeholder="تاریخ برگشت" />
        </div>
        <div className={styles.button}>
        <FormButton buttonText='جستجو' buttonColor='#205781' buttonTextColor='white' buttonColorHovered="#092840"/>
        </div>
      
    </div>
  );
}

export default SearchBox;
