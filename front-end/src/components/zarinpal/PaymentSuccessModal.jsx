import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import styles from './PaymentForm.module.css';

const PaymentSuccessModal = ({ message, isSuccess }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={`${styles.modalContent} ${isSuccess ? styles.modalSuccess : styles.modalFail}`}>
                {isSuccess ? <FaCheckCircle className={styles.modalIconSuccess} /> : <FaTimesCircle className={styles.modalIconFail} />}
                <p className={styles.modalMessage}>{message}</p>
            </div>
        </div>
    );
};

export default PaymentSuccessModal;