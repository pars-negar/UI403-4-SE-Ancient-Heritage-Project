import React from 'react';
import styles from './SearchBox.module.css';
import FormButton from '../FormButton/FormButton';

function SearchBox() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>جستجوی تور
        <span 
          className='inline-block w-[0.3rem] h-[3rem] bg-[var(--color-dark-blue)] absolute right-[-0.625rem] rounded-2xl'>
        </span>
      </h2>
      <div className='flex mt-[4rem] gap-[5rem]'>
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
        <div>
          <button className='bg-[var(--color-dark-blue)] !w-[8rem] !h-[3rem] !p-0 text-base' style={{fontFamily: 'Gandom', fontWeight: 0}}>جستجو</button>
        </div>
      </div>
      
    </div>
  );
}

export default SearchBox;