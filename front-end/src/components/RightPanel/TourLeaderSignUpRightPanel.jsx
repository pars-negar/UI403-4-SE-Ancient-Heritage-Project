import styles from './tour-leader-sign-up-right-panel.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import FormButton from '../FormButton/FormButton';
import { useState } from 'react';
import axios from 'axios';
import globalStyles from '../../styles/base.module.css'
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
        <div className={styles.tourLeaderSignUpRightPanel}>
            <h1 className={styles.formTitle}>ثبت‌نام مسئول تور</h1>
            <Form onSubmit={handleSubmit}>
                <FloatingLabel label="نام کاربری" className={`${styles.tourLeaderFloatingLabel} mb-3`}>
                    <Form.Control name="username" type="text" value={formData.username} onChange={handleChange} className={styles.formControl} />
                </FloatingLabel>

                <FloatingLabel label="شماره موبایل" className={`${styles.tourLeaderFloatingLabel} mb-3`}>
                    <Form.Control name="phone_number" type="tel" value={formData.phone_number} onChange={handleChange} className={styles.formControl} />
                </FloatingLabel>

                <FloatingLabel label="ایمیل" className={`${styles.tourLeaderFloatingLabel} mb-3`}>
                    <Form.Control name="email" type="email" value={formData.email} onChange={handleChange} className={styles.formControl} />
                </FloatingLabel>

                <FloatingLabel label="نام شرکت" className={`${styles.tourLeaderFloatingLabel} mb-3`}>
                    <Form.Control name="company_name" type="text" value={formData.company_name} onChange={handleChange} className={styles.formControl} />
                </FloatingLabel>

                <FloatingLabel label="آدرس شرکت" className={`${styles.tourLeaderFloatingLabel} mb-3`}>
                    <Form.Control name="company_address" type="text" value={formData.company_address} onChange={handleChange} className={styles.formControl} />
                </FloatingLabel>

                <FloatingLabel label="شماره ثبت شرکت" className={`${styles.tourLeaderFloatingLabel} mb-3`}>
                    <Form.Control name="company_registration_number" type="text" value={formData.company_registration_number} onChange={handleChange} className={styles.formControl} />
                </FloatingLabel>

                <FloatingLabel label="رمز عبور" className={`${styles.tourLeaderFloatingLabel} mb-3`}>
                    <Form.Control name="password" type="password" value={formData.password} onChange={handleChange} className={styles.formControl} />
                    <Form.Text className="text-muted">
                        رمز عبور باید شامل 8 کارکتر و شامل حروف، اعداد و نماها باشد.
                    </Form.Text>
                </FloatingLabel>

                <FormButton
                    buttonText='ثبت‌نام'
                    buttonColor='#FB8101'
                    buttonTextColor='black'
                    buttonColorHovered="#D96F00"
                />
            </Form>

            {message && <p className="text-success mt-3">{message}</p>}
            {error && <p className="text-danger mt-3">{error}</p>}
        </div>
    );
};

export default TourLeaderSignUpRightPanel;