import React, { useState } from "react";
import styles from "./PassRecoveryRightPanel.module.css"; 
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


const PassRecoveryRightPanel = () => {

  // State to store the email input
  const [email, setEmail] = useState("");

  // loading state
  const [loading, setLoading] = useState(false); 

// error state
  const [error, setError] = useState(""); 

  // Regex pattern for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();
  // Handle input change
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  // Handle sending the reset link
  const handleSendLink = async () => {
    if (email.trim() === "") {
      alert("لطفاً ایمیل خود را وارد کنید!");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("لطفاً یک ایمیل معتبر وارد کنید!");
      return;
    }
    setLoading(true); // Request is being sent
    setError(""); // Clear any previous errors

    try {
      // Send the request to the backend API for password recovery link
      const response = await axios.post("http://localhost:8000/api/auth/password/reset/", { email });
      
      if (response.status === 200) {
        alert(`لینک بازیابی رمز عبور برای ${email} ارسال شد!`);
      }
    } catch (err) {
      setError("خطا در ارسال لینک بازیابی. لطفاً دوباره تلاش کنید.");
      console.error("Error sending reset link:", err);
    } finally {
      setLoading(false); // Loading is complete
    }
  

    console.log("لینک بازیابی برای:", email);
    alert(`لینک بازیابی برای ${email} ارسال شد!`);
  };

  return (
    <div className={styles.passwordRecoveryRightPanel}>
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
        </button >
        {/* Back to login button */} <button className={styles.backButton} onClick={() => navigate("/login")}>
          بازگشت به صفحه ورود
        </button>
     
    </div>
  );
};

export default PassRecoveryRightPanel

