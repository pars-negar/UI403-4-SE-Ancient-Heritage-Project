import React, { useState } from "react";
import styles from "./PassRecoveryRightPanel.module.css";

function PassRecoveryRightPanel() {
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendLink = () => {
    if (email.trim() === "") {
      alert("لطفاً ایمیل خود را وارد کنید!"); 
      return;
    }
    console.log("لینک بازیابی برای:", email);
    alert(`لینک بازیابی برای ${email} ارسال شد!`);
  };

  return (
    <div className={styles.container}>
      {/*title*/}
      <h2 className={styles.title}>فراموشی رمز عبور</h2>
      <p className={styles.description}>
        ایمیل خود را وارد کنید تا لینک بازیابی برای شما ارسال شود.
      </p>

      {/*email input */}
      <input
        type="email"
        placeholder="ایمیل"
        className={styles.input}
        value={email} 
        onChange={handleChange}
      />

      {/* send link button*/}
      <button className={styles.sendButton} onClick={handleSendLink}>
        ارسال لینک
      </button>

      {/*back button*/}
      <button className={styles.backButton} onClick={() => alert("بازگشت به صفحه ورود")}>
        بازگشت به صفحه ورود
      </button>
    </div>
  );
  }
  export default PassRecoveryRightPanel