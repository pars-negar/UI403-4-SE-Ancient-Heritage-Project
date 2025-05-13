import selfStyles from './user-sign-up-right-panel.module.css'
import styles from './right-panel.module.css'
import { Form, InputGroup, FloatingLabel } from 'react-bootstrap';
import FormButton from '../FormButton/FormButton';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



import userIcon from '../../assets/icons/user.svg'
import callIcon from '../../assets/icons/call.svg'
import emailIcon from '../../assets/icons/email.svg'
import passwordIcon from '../../assets/icons/password.svg'


const UserSignUpRightPanel = () => {
const [username, setUsername] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const navigate = useNavigate();


const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
        username,
        phone_number: phoneNumber,
        email,
        password
    };

    try {
        const response = await fetch('http://localhost:8000/api/userregister/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessages = Object.values(errorData).flat();
            setErrorMessage(errorMessages.join(' '));
            return;
        }
            
        localStorage.setItem("pendingPhoneNumber", phoneNumber);
        navigate('/verify-otp');
        // const data = await response.json();
        // alert('کد تأیید برای شما ارسال شد. لطفاً آن را وارد کنید.');
        // console.log(data); 
        localStorage.setItem("pendingPhoneNumber", phoneNumber);
        navigate('/verifyotp');

    } catch (error) {
        setErrorMessage('خطایی رخ داده است. لطفاً دوباره تلاش کنید.');
    }
};




return (
    <div className={selfStyles.userSignUpRightPanel}>
        <h1 className={styles.formTitle}>ثبت‌نام کاربر</h1>
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
                        <img src={ callIcon } alt="call-icon" className={styles.icon}/>
                        <FloatingLabel controlId="floatingPhoneNumber" label="شماره موبایل" className={styles.floatingLabel}>
                            <Form.Control
                                type="tel"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                placeholder="شماره موبایل"
                                className={styles.formControl}
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </FloatingLabel>
                    </InputGroup.Text>
                </InputGroup>

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
                
                <InputGroup>
                    <InputGroup.Text className={ styles.inputGroupText }>
                        <img src={ passwordIcon } alt="password-icon" className={styles.icon}/>
                        <FloatingLabel controlId="floatingPassword" label="رمز عبور" className={`${styles.floatingLabel}`}>
                            <Form.Control
                                type="password"
                                placeholder="رمز عبور"
                                className={styles.formControl}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FloatingLabel>
                    </InputGroup.Text>
                </InputGroup>
            </div>
            <p style={{ marginTop: "0.5rem", marginBottom: 0 }}>رمز عبور باید شامل 8 کارکتر و شامل حروف، اعداد و نماها باشد.</p>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <div className={styles.formContainer}>
                <Link to='/verify-otp'>
                    <button className={ styles.button }>تایید</button>
                </Link>
            </div>
        </Form>
    
            {/* <script>{
                document.getElementById("phone").addEventListener("input", function (event) {
                    this.value = this.value.replace(/\D/g, "")
                });}
            </script> */}
        </div>
    );
}
 
export default UserSignUpRightPanel;