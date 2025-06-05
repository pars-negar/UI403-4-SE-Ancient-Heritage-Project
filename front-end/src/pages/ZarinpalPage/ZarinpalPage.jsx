import React from 'react';
import PaymentForm from '../../components/zarinpal/PaymentForm';

const ZarinpalPage = () => {
    return (
        <div className="zarinpal-page-container">
            <h1>درگاه پرداخت زرین‌پال</h1>
            <p>لطفاً اطلاعات کارت خود را وارد کنید.</p>
            <PaymentForm />
        </div>
    );
};

export default ZarinpalPage;