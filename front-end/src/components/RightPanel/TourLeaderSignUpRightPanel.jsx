import styles from './right-panel.module.css'
import selfStyles from './tour-leader-sign-up-right-panel.module.css'
import { Form, InputGroup, FloatingLabel } from 'react-bootstrap';
import FormButton from '../FormButton/FormButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import globalStyles from '../../styles/base.module.css'

import userIcon from '../../assets/icons/user.svg'
import callIcon from '../../assets/icons/call.svg'
import emailIcon from '../../assets/icons/email.svg'
import companyIcon from '../../assets/icons/company.svg'
import addressIcon from '../../assets/icons/address.svg'
import registrationNumberIcon from '../../assets/icons/registration-number.svg'
import passwordIcon from '../../assets/icons/password.svg'

const TourLeaderSignUpRightPanel = () => {
    const [formData, setFormData] = useState({
        username: '',
        phone_number: '',
        email: '',
        company_name: '',
        company_address: '',
        company_registration_number: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await axios.post('http://localhost:8000/api/tourregister/', formData);

            setMessage(response.data.message);
        } catch (err) {
            if (err.response?.data) {
                const errors = Object.values(err.response.data).flat().join(' | ');
                setError(errors);
            } else {
                setError("خطا در ارتباط با سرور");
            }
        }
    };

    return (
        <div className={selfStyles.tourLeaderSignUpRightPanel}>
            <h1 className={ styles.formTitle }>ثبت‌نام مسئول تور</h1>
            <p style={{fontFamily: 'Vazirmatn', fontWeight: 400}}>مسئول گرامی اطلاعات شرکت را با دقت تکمیل کنید.</p>
            <Form onSubmit={handleSubmit} className={styles.inputGroup}>
                <div className={styles.formContainer}>
                    <InputGroup>
                        <InputGroup.Text className={ styles.inputGroupText }>
                            <img src={ userIcon } alt="user-icon" className={ styles.icon }/>
                            <FloatingLabel label="نام کاربری" className={`${styles.floatingLabel}`}>
                                <Form.Control 
                                    name="username"
                                    type="text" 
                                    placeholder="نام کاربری"
                                    size="lg"
                                    value={formData.username} 
                                    onChange={handleChange}
                                    className={styles.formControl}
                                    />
                            </FloatingLabel>
                        </InputGroup.Text>
                    </InputGroup>
                    
                    <InputGroup>
                        <InputGroup.Text className={ styles.inputGroupText }>
                            <img src={ callIcon } alt="call-icon" className={ styles.icon }/>
                            <FloatingLabel label="شماره موبایل" className={`${styles.floatingLabel}`}>
                                <Form.Control 
                                    name="phone_number" 
                                    type="tel" 
                                    value={formData.phone_number} 
                                    onChange={handleChange}
                                    placeholder='شماره موبایل'
                                    size='lg'
                                    className={styles.formControl}
                                    />
                            </FloatingLabel>
                        </InputGroup.Text>
                    </InputGroup>

                    <InputGroup>
                        <InputGroup.Text className={ styles.inputGroupText }>
                            <img src={ emailIcon } alt="email-icon" className={ styles.icon }/>
                            <FloatingLabel label="ایمیل" className={`${styles.floatingLabel}`}>
                                <Form.Control 
                                    name="email" 
                                    type="email" 
                                    value={formData.email} 
                                    onChange={handleChange}
                                    placeholder='ایمیل'
                                    size='lg'
                                    className={styles.formControl}
                                    />
                            </FloatingLabel>
                        </InputGroup.Text>
                    </InputGroup>

                    <InputGroup>
                        <InputGroup.Text className={ styles.inputGroupText }>
                            <img src={ companyIcon } alt="company-icon" className={ styles.icon }/>
                            <FloatingLabel label="نام شرکت" className={`${styles.floatingLabel}`}>
                                <Form.Control 
                                    name="company_name"
                                    type="text" 
                                    value={formData.company_name} 
                                    onChange={handleChange} 
                                    placeholder='نام شرکت'
                                    size='lg'
                                    className={styles.formControl}
                                    />
                            </FloatingLabel>
                        </InputGroup.Text>
                    </InputGroup>
                    
                    <InputGroup>
                        <InputGroup.Text className={ styles.inputGroupText }>
                            <img src={ addressIcon } alt="address-icon" className={ styles.icon }/>
                            <FloatingLabel label="آدرس شرکت" className={`${styles.floatingLabel}`}>
                                <Form.Control 
                                    name="company_address" 
                                    type="text" 
                                    value={formData.company_address} 
                                    onChange={handleChange} 
                                    placeholder='آدرس شرکت'
                                    size='lg'
                                    className={styles.formControl}
                                    />
                            </FloatingLabel>
                        </InputGroup.Text>
                    </InputGroup>

                    <InputGroup>
                        <InputGroup.Text className={ styles.inputGroupText }>
                            <img src={ registrationNumberIcon } alt="registration-number-icon" className={ styles.icon }/>
                            <FloatingLabel label="شماره ثبت شرکت" className={`${styles.floatingLabel}`}>
                                <Form.Control 
                                    name="company_registration_number" 
                                    type="text" 
                                    value={formData.company_registration_number} 
                                    onChange={handleChange} 
                                    placeholder='شماره ثبت شرکت'
                                    size='lg'
                                    className={styles.formControl}
                                    />
                            </FloatingLabel>
                        </InputGroup.Text>
                    </InputGroup>

                    <InputGroup>
                        <InputGroup.Text className={ styles.inputGroupText }>
                            <img src={ callIcon } alt="user-icon" className={ styles.icon }/>
                            <FloatingLabel label="رمز عبور" className={`${styles.floatingLabel}`}>
                                <Form.Control 
                                    name="password" 
                                    type="password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    placeholder='رمز عبور'
                                    size='lg'
                                    className={styles.formControl}
                                    />
                            </FloatingLabel>
                        </InputGroup.Text>
                    </InputGroup>
                </div>
                <p style={{ marginTop: "0.5rem", marginBottom: 0, fontFamily: 'Vazirmatn', fontWeight: 400}}>رمز عبور باید شامل 8 کارکتر و شامل حروف، اعداد و نماها باشد.</p>
                <div className={ styles.formContainer }>
                    <Link type='submit' to='/verify-otp'>
                        <button className={ styles.button }>ثبت‌نام</button>
                    </Link>
                </div>
            </Form>
            <p style={{ marginTop: "0.5rem", marginBottom: 0, fontFamily: 'Vazirmatn', fontWeight: 300}}>قبلا ثبت‌نام کرده‌اید؟ &nbsp; 
            <Link to="/loginsignup/login" className={ `${styles.signUpLink}` }>
                ورود
            </Link>
            </p>

            {message && <p className="text-success mt-3">{message}</p>}
            {error && <p className="text-danger mt-3">{error}</p>}
        </div>
    );
};

export default TourLeaderSignUpRightPanel;