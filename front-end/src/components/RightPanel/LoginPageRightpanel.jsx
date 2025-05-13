import React from "react";
import axios from 'axios';
import { useState } from 'react';
import styles from "./right-panel.module.css";
import selfStyles from './LoginPageRightPanel.module.css'
import FormButton from "../FormButton/FormButton";
import { Link } from 'react-router-dom';
import { Form, InputGroup, FloatingLabel } from 'react-bootstrap';


import userIcon from '../../assets/icons/user.svg'
import passwordIcon from '../../assets/icons/password.svg'

const RightPanel = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username: username,
        password: password,
      });

      // ذخیره توکن‌ها در localStorage
      localStorage.setItem('token', response.data.token);
      console.log("Response:", response.data);

      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      alert("ورود با موفقیت انجام شد! توکن دریافت شد");
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);  // پیام از سرور
      } else {
        alert("خطایی در ورود رخ داد. لطفاً دوباره تلاش کنید.");
      }
    }
    
  };
  return (
    <div className={selfStyles.loginRightPanel}>
      <h1 className={ styles.formTitle }>ورود به حساب کاربری</h1>

      <Form onSubmit={handleSubmit} className={styles.inputGroup}>
        <div className={styles.formContainer}>
          <InputGroup>
            <InputGroup.Text className={ styles.inputGroupText }>
              <img src={ userIcon } alt="user-icon" className={styles.icon}/>
              <FloatingLabel controlId="floatingUsername" label="نام کاربری" className={`${styles.floatingLabel}`}>
                  <Form.Control
                      type="text"
                      placeholder="نام کاربری"
                      size="lg"
                      value={username}
                      className={styles.formControl}
                      onChange={(e) => setUsername(e.target.value)}
                  />
              </FloatingLabel>
            </InputGroup.Text>
          </InputGroup>

          <InputGroup>
            <InputGroup.Text className={ styles.inputGroupText }>
                <img src={ passwordIcon } alt="password-icon" className={styles.icon}/>
                <FloatingLabel controlId="floatingPassword" label="رمز عبور" className={`${styles.floatingLabel}`}>
                    <Form.Control
                        type="password"
                        placeholder="رمز عبور"
                        className={styles.formControl}
                        value={password}
                        size='lg'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FloatingLabel>
            </InputGroup.Text>
          </InputGroup>
        </div>
        <div className={ styles.formContainer }>
        <Link type='submit'>
            {/* <FormButton 
              buttonText="ورود" 
              buttonColor="--color-orange" 
              buttonColorHovered="--color-orange-hovered" 
              buttonTextColor="black"
              /> */}
              <button className={ `${styles.button} !mt-[2rem]` }>ورود</button>
        </Link>
        </div>
      </Form>   

    <div style={{ display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem"
                }}>
      <Link to="/passwordrecovery" className={ selfStyles.linkk }>
        رمز عبور را فراموش کرده‌اید؟
      </Link>
      <p>حساب کاربری ندارید؟ &nbsp; 
        <Link to="/loginsignup" className={ styles.signUpLink }>
          ثبت‌نام
        </Link>
      </p>
    </div>
  </div>
  );
};

export default RightPanel;
