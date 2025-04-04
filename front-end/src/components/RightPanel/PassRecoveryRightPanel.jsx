import React, { useState } from "react";
import styles from "./PassRecoveryRightPanel.module.css"; 

const PassRecoveryRightPanel = () => {
  // State to store the email input
  const [email, setEmail] = useState("");

  // Regex pattern for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle input change
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  // Handle sending the reset link
  const handleSendLink = () => {
    if (email.trim() === "") {
      alert("لطفاً ایمیل خود را وارد کنید!");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("لطفاً یک ایمیل معتبر وارد کنید!");
      return;
    }

    console.log("لینک بازیابی برای:", email);
    alert(`لینک بازیابی برای ${email} ارسال شد!`);
  };

  return (
    <div className={styles.container}>
      {/* Title */}
      <h2 className={styles.title}>فراموشی رمز عبور</h2>
      <p className={styles.description}>
        ایمیل خود را وارد کنید تا لینک بازیابی برای شما ارسال شود.
      </p>

      {/* Email input field */}
      <input
        type="email"
        placeholder="ایمیل"
        className={styles.input}
        value={email}
        onChange={handleChange}
      />

      {/* Send link button */}
      <button className={styles.sendButton} onClick={handleSendLink}>
        ارسال لینک
      </button>

      {/* Back to login button */}
      <button className={styles.backButton} onClick={() => alert("بازگشت به صفحه ورود")}>
        بازگشت به صفحه ورود
      </button>
    </div>
  );
};

export default PassRecoveryRightPanel;

