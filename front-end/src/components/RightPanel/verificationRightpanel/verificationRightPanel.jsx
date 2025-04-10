import React, { useState } from "react";
import styles from '../../../pages/verificationPage/code.module.css';
import CodeInput from "./CodeInput";
import FormButton from "../../FormButton/FormButton";

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
      window.location.href = "/"; // تغییر آدرس دلخواه
    }
  };

  return (
    <div className={styles.rightPanel}>
      <h2 className={styles.header}>تأیید شماره تلفن</h2>
      <p className={styles.instruction}>لطفاً کدی که به شماره شما ارسال شده را وارد کنید.</p>
      <CodeInput code={code} onCodeChange={handleCodeChange} />
      {/* <button className={styles.confirmBtn} onClick={handleSubmit} disabled={!isCodeComplete}> */}
      <FormButton buttonText="تائید" buttonColor='#FB8101' buttonTextColor='black' buttonColorHovered="#D96F00"/>
        {/* تأیید
      </button> */}
      <a href="https://www.google.com" className={styles.editNumber}>ویرایش شماره موبایل</a>
      <a href="https://www.google.com" className={styles.resendCode}>ارسال مجدد کد</a>
    </div>
  );
};

export default RightPanel;
