import React, { useState } from "react";
import styles from '../styles/code.module.css';
import CodeInput from "./CodeInput";

const RightPanel = () => {
  const [code, setCode] = useState(Array(6).fill(""));

  const handleCodeChange = (index, value) => {
    let newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  const handleSubmit = () => {
    if (isCodeComplete) {
      window.location.href = "https://www.google.com"; // تغییر آدرس دلخواه
    }
  };

  return (
    <div className={styles.rightPanel}>
      <h2 className={styles.header}>تأیید شماره تلفن</h2>
      <p className={styles.instruction}>لطفاً کدی که به شماره شما ارسال شده را وارد کنید.</p>
      <CodeInput code={code} onCodeChange={handleCodeChange} />
      <button className={styles.confirmBtn} onClick={handleSubmit} disabled={!isCodeComplete}>
        تأیید
      </button>
      <a href="https://www.google.com" className={styles.editNumber}>ویرایش شماره موبایل</a>
      <a href="https://www.google.com" className={styles.resendCode}>ارسال مجدد کد</a>
    </div>
  );
};

export default RightPanel;
