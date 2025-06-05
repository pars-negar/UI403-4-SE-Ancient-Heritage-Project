import React, { useState } from 'react';
import { FaCreditCard, FaQuestionCircle, FaEnvelope, FaSyncAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PaymentSuccessModal from './PaymentSuccessModal';
import styles from './PaymentForm.module.css';

const PaymentForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cvv2, setCvv2] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [generatedSecurityCode, setGeneratedSecurityCode] = useState('');
    const [dynamicPassword, setDynamicPassword] = useState('');
    const [email, setEmail] = useState('');
    const [focusedField, setFocusedField] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // 'success' or 'fail'

    const navigate = useNavigate();

    const generateRandomSecurityCode = () => {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < 5; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setGeneratedSecurityCode(result);
    };

    React.useEffect(() => {
        generateRandomSecurityCode();
    }, []);

    const handleFocus = (fieldName) => setFocusedField(fieldName);
    const handleBlur = () => setFocusedField(null);

    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/\s/g, ''); // Remove existing spaces
        const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim(); // Add space every 4 digits
        setCardNumber(formattedValue);
    };

    const validateCardNumber = (number) => {
        const cleanNumber = number.replace(/\s/g, '');
        return cleanNumber.length === 16 && /^\d+$/.test(cleanNumber);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateCardNumber(cardNumber)) {
            alert('شماره کارت باید ۱۶ رقمی باشد.');
            return;
        }

        if (securityCode.toLowerCase() !== generatedSecurityCode.toLowerCase()) {
            alert('کد امنیتی وارد شده صحیح نیست.');
            return;
        }

        const paymentData = {
            cardNumber: cardNumber.replace(/\s/g, ''),
            cvv2,
            expMonth,
            expYear,
            dynamicPassword,
            email,
            securityCode
        };

        try {
            console.log('Sending data to backend:', paymentData);
            // Simulate API call to backend
            // Replace this with your actual backend API call (e.g., using axios or fetch)
            const response = await new Promise((resolve) => {
                setTimeout(() => {
                    // Simulate success or failure from backend
                    const success = Math.random() > 0.3; // 70% chance of success
                    if (success) {
                        resolve({ success: true, message: 'پرداخت با موفقیت انجام شد.' });
                    } else {
                        resolve({ success: false, message: 'پرداخت ناموفق بود. لطفاً دوباره تلاش کنید.' });
                    }
                }, 2000); // Simulate 2-second network delay
            });

            if (response.success) {
                setPaymentStatus('success');
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                    navigate('/rt'); // Redirect to /rt after modal closes
                }, 3000); // Show modal for 3 seconds
            } else {
                setPaymentStatus('fail');
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Payment submission error:', error);
            setPaymentStatus('fail');
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 3000);
        }
    };

    return (
        <div className={styles.pageStyle}>
            <div className={styles.formContainerStyle}>
                <h2 className={styles.titleStyle}>
                    اطلاعات کارت
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroupStyle}>
                        <label htmlFor="cardNumber" className={styles.labelStyle}>
                            شماره کارت
                        </label>
                        <div className={styles.inputIconContainerStyle}>
                            <div className={styles.inputIconStyle}>
                                <FaCreditCard />
                            </div>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                className={`${styles.inputWithIconStyle} ${focusedField === 'cardNumber' ? styles.inputFocused : ''}`}
                                placeholder="**** **** **** ****"
                                maxLength={19}
                                onFocus={() => handleFocus('cardNumber')}
                                onBlur={handleBlur}
                                required
                            />
                        </div>
                        {cardNumber.replace(/\s/g, '').length > 0 && cardNumber.replace(/\s/g, '').length !== 16 && (
                            <p className={styles.errorMessage}>شماره کارت باید ۱۶ رقمی باشد.</p>
                        )}
                    </div>
                    <div className={styles.flexRowStyle}>
                        <div className={styles.halfWidthStyle}>
                            <label htmlFor="cvv2" className={styles.labelStyle}>
                                CVV2
                            </label>
                            <div className={styles.inputIconContainerStyle}>
                                <div className={styles.inputIconStyle}>
                                    <FaQuestionCircle />
                                </div>
                                <input
                                    type="password"
                                    id="cvv2"
                                    name="cvv2"
                                    value={cvv2}
                                    onChange={(e) => setCvv2(e.target.value)}
                                    className={`${styles.inputWithIconStyle} ${focusedField === 'cvv2' ? styles.inputFocused : ''}`}
                                    maxLength="4"
                                    onFocus={() => handleFocus('cvv2')}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                        </div>
                        <div className={styles.halfWidthStyle}>
                            <label className={styles.labelStyle}>
                                تاریخ انقضا
                            </label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    name="expMonth"
                                    value={expMonth}
                                    onChange={(e) => setExpMonth(e.target.value)}
                                    className={`${styles.inputCenteredStyle} ${focusedField === 'expMonth' ? styles.inputFocused : ''}`}
                                    placeholder="ماه"
                                    maxLength="2"
                                    onFocus={() => handleFocus('expMonth')}
                                    onBlur={handleBlur}
                                    required
                                />
                                <input
                                    type="text"
                                    name="expYear"
                                    value={expYear}
                                    onChange={(e) => setExpYear(e.target.value)}
                                    className={`${styles.inputCenteredStyle} ${focusedField === 'expYear' ? styles.inputFocused : ''}`}
                                    placeholder="سال"
                                    maxLength="2"
                                    onFocus={() => handleFocus('expYear')}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.formGroupStyle}>
                        <label htmlFor="securityCode" className={styles.labelStyle}>
                            کد امنیتی
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div className={styles.captchaImageStyle}>
                                <span>{generatedSecurityCode}</span>
                            </div>
                            <input
                                type="text"
                                id="securityCode"
                                name="securityCode"
                                value={securityCode}
                                onChange={(e) => setSecurityCode(e.target.value)}
                                className={`${styles.inputCenteredStyle} ${focusedField === 'securityCode' ? styles.inputFocused : ''}`}
                                maxLength="5"
                                onFocus={() => handleFocus('securityCode')}
                                onBlur={handleBlur}
                                required
                            />
                            <button
                                type="button"
                                onClick={generateRandomSecurityCode}
                                className={styles.refreshCaptchaButton}
                                title="تغییر کد امنیتی"
                            >
                                <FaSyncAlt />
                            </button>
                        </div>
                    </div>
                    <div className={styles.formGroupStyle}>
                        <label htmlFor="dynamicPassword" className={styles.labelStyle}>
                            رمز اینترنتی کارت
                        </label>
                        <input
                            type="password"
                            id="dynamicPassword"
                            name="dynamicPassword"
                            value={dynamicPassword}
                            onChange={(e) => setDynamicPassword(e.target.value)}
                            className={`${styles.inputStyle} ${focusedField === 'dynamicPassword' ? styles.inputFocused : ''}`}
                            onFocus={() => handleFocus('dynamicPassword')}
                            onBlur={handleBlur}
                            required
                        />
                        <button
                            type="button"
                            className={styles.dynamicPasswordButtonStyle}
                        >
                            دریافت رمز پویا
                        </button>
                    </div>
                    <div className={styles.formGroupLastStyle}>
                        <label htmlFor="email" className={styles.labelStyle}>
                            ایمیل (اختیاری)
                        </label>
                        <div className={styles.inputIconContainerStyle}>
                            <div className={styles.inputIconStyle}>
                                <FaEnvelope />
                            </div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`${styles.inputWithIconStyle} ${focusedField === 'email' ? styles.inputFocused : ''}`}
                                placeholder="example@mail.com"
                                onFocus={() => handleFocus('email')}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>
                    <div className={styles.buttonsContainerStyle}>
                        <button
                            type="submit"
                            className={styles.primaryButtonStyle}
                        >
                            پرداخت
                        </button>
                        <button
                            type="button"
                            className={styles.secondaryButtonStyle}
                            onClick={() => console.log('Payment cancelled.')}
                        >
                            انصراف
                        </button>
                    </div>
                </form>
            </div>
            {showModal && (
                <PaymentSuccessModal
                    message={paymentStatus === 'success' ? 'پرداخت با موفقیت انجام شد.' : 'پرداخت ناموفق بود.'}
                    isSuccess={paymentStatus === 'success'}
                />
            )}
        </div>
    );
};

export default PaymentForm;