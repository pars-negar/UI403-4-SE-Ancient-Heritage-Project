import React, { useState } from "react";
import selfStyles from './verfication-right-panel.module.css';
import styles from './right-panel.module.css';
import CodeInput from "../CodeInput/CodeInput";
import FormButton from "../FormButton/FormButton";

const RightPanel = () => {
  const [code, setCode] = useState(Array(6).fill(""));

  const phoneNumber = localStorage.getItem("pendingPhoneNumber");

  const handleCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleSubmit = async () => {
    if (!phoneNumber) {
      alert("شماره تلفن یافت نشد.");
      console.log("Phone Number not found in localStorage.");
      return;
    }

    const isCodeComplete = code.every((digit) => digit !== "");
    if (!isCodeComplete) {
      alert("لطفاً همه ارقام کد را وارد کنید.");
      return;
    }

    const fullCode = code.join("");
    console.log("Phone Number:", phoneNumber);
    console.log("OTP Code:", fullCode);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/verify-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          otp_code: fullCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "کد اشتباه است.");
        return;
      }

      alert("ثبت‌نام با موفقیت انجام شد!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <div className={selfStyles.rightPanel}>
      <h2 className={selfStyles.header}>تأیید شماره تلفن</h2>
      <p className={selfStyles.instruction}>لطفاً کدی که به شماره شما ارسال شده را وارد کنید.</p>

      <CodeInput code={code} onCodeChange={handleCodeChange} />

      <button className={styles.button} onClick={handleSubmit}>تایید</button>

      <a href="/signup" className={styles.signUpLink}>ویرایش شماره موبایل</a>
      <a href="#" className={styles.signUpLink}>ارسال مجدد کد</a>
    </div>
  );
};

export default RightPanel;
