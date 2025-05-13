import React, { useState } from "react";
import styles from "./right-panel.module.css"; 
import selfStyles from './PassRecoveryRightPanel.module.css'
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Form, InputGroup, FloatingLabel } from 'react-bootstrap';
import FormButton from "../FormButton/FormButton";


import emailIcon from '../../assets/icons/email.svg'

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
    <div className={selfStyles.passwordRecoveryRightPanel}>
      {/* Title */}
      <h2 className={styles.formTitle}>فراموشی رمز عبور</h2>
      <p>
        ایمیل خود را وارد کنید تا لینک بازیابی برای شما ارسال شود.
      </p>
      <Form className={styles.inputGroup}> 
        <div className={styles.formContainer}>
          <InputGroup>
            <InputGroup.Text className={ styles.inputGroupText }>
                <img src={ emailIcon } alt="email-icon" className={styles.icon}/>
                <FloatingLabel controlId="floatingEmail" label="ایمیل" className={`${styles.floatingLabel}`}>
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        className={styles.formControl}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FloatingLabel>
            </InputGroup.Text>
          </InputGroup>
          <Link type='submit' to='/verify-otp'>
              {/* <FormButton 
                buttonText="ارسال لینک" 
                buttonColor="--color-orange" 
                buttonColorHovered="--color-orange-hovered" 
                buttonTextColor="black"
                onClick={handleSendLink}
                /> */}
            <button onClick={ handleSendLink } className={ styles.button }>ارسال لینک</button>
          </Link>
        </div>
      </Form>


      {/* <input
        type="email"
        placeholder="ایمیل"
        className={styles.input}
        value={email}
        onChange={handleChange}
      /> */}


      <Link to="/loginsignup/login" className={ styles.signUpLink } >
        بازگشت به صفحه ورود
      </Link>
    </div>
  );
};

export default PassRecoveryRightPanel

