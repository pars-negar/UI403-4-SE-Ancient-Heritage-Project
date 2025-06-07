import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Form, InputGroup, FloatingLabel } from "react-bootstrap";

import styles from "./right-panel.module.css";
import selfStyles from "./LoginPageRightPanel.module.css";

import userIcon from "../../assets/icons/user.svg";
import passwordIcon from "../../assets/icons/password.svg";
import CustomAlert from "../alert/CustomAlert"; // کامپوننت آلارم سفارشی

const RightPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/login/",
        {
          username: username,
          password: password,
        }
      );

      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      navigate("/"); // ورود موفق → برو به صفحه اصلی یا کاربری
    } catch (error) {
      if (error.response?.data?.error) {
        setAlertMessage(error.response.data.error);
      } else {
        setAlertMessage("خطایی در ورود رخ داد. لطفاً دوباره تلاش کنید.");
      }
      setShowAlert(true);
    }
  };

  return (
    <div className={selfStyles.loginRightPanel}>
      <h1 className={styles.formTitle}>ورود به حساب کاربری</h1>

      <Form onSubmit={handleSubmit} className={styles.inputGroup}>
        <div className={styles.formContainer}>
          <InputGroup>
            <InputGroup.Text className={styles.inputGroupText}>
              <img src={userIcon} alt="user-icon" className={styles.icon} />
              <FloatingLabel
                controlId="floatingUsername"
                label="نام کاربری"
                className={styles.floatingLabel}
              >
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
            <InputGroup.Text className={styles.inputGroupText}>
              <img
                src={passwordIcon}
                alt="password-icon"
                className={styles.icon}
              />
              <FloatingLabel
                controlId="floatingPassword"
                label="رمز عبور"
                className={styles.floatingLabel}
              >
                <Form.Control
                  type="password"
                  placeholder="رمز عبور"
                  className={styles.formControl}
                  value={password}
                  size="lg"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>
            </InputGroup.Text>
          </InputGroup>
        </div>

        <div className={styles.formContainer}>
          <button
            type="submit"
            className={`${styles.button} !mt-[2rem]`} // Tailwind margin top
          >
            ورود
          </button>
        </div>
      </Form>

      {showAlert && (
        <CustomAlert
          message={alertMessage}
          type="error"
          onClose={() => setShowAlert(false)}
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Link to="/passwordrecovery" className={selfStyles.linkk}>
          رمز عبور را فراموش کرده‌اید؟
        </Link>
        <p>
          حساب کاربری ندارید؟ &nbsp;
          <Link to="/loginsignup" className={styles.signUpLink}>
            ثبت‌نام
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RightPanel;
