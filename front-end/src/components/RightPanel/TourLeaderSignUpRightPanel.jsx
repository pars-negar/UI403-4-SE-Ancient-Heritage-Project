import styles from './tour-leader-sign-up-right-panel.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import FormButton from '../FormButton/FormButton';
import globalStyles from '../../styles/base.module.css'

const TourLeaderSignUpRightPanel = () => {
    return (  
        <div className={ styles.tourLeaderSignUpRightPanel}>
            <h1 className={ styles.formTitle}>ثبت‌نام مسئول تور</h1>
            <Form action="submit">

                <FloatingLabel
                    controlId="floatingPassword"
                    label="نام کاربری"
                    className={`${styles.tourLeaderFloatingLabel} mb-3`}
                >
                    <Form.Control type="text" placeholder="نام کاربری" size='lg'className={ styles.formControl }/>
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingPhoneNumber"
                    label="شماره موبایل"
                    className={`${styles.tourLeaderFloatingLabel} mb-3`}
                >
                    <Form.Control type="tel" pattern="[0-9]*" inputmode="numeric" placeholder="شماره موبایل" className={ styles.formControl }/>
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="ایمیل"
                    className={`${styles.tourLeaderFloatingLabel} mb-3`}
                >
                    <Form.Control type="email" placeholder="name@example.com" className={ styles.formControl }/>
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingPassword"
                    label="نام شرکت"
                    className={`${styles.tourLeaderFloatingLabel} mb-3`}
                >
                    <Form.Control type="text" placeholder="نام شرکت" size='lg'className={ styles.formControl }/>
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingPassword"
                    label="آدرس شرکت"
                    className={`${styles.tourLeaderFloatingLabel} mb-3`}
                >
                    <Form.Control type="text" placeholder="آدرس شرکت" size='lg'className={ styles.formControl }/>
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingPassword"
                    label="شماره ثبت شرکت"
                    className={`${styles.tourLeaderFloatingLabel} mb-3`}
                >
                    <Form.Control type="text" placeholder="شماره ثبت شرکت" size='lg'className={ styles.formControl }/>
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingPassword"
                    label="رمز عبور"
                    className={`${styles.tourLeaderFloatingLabel} mb-3`}
                >
                    <Form.Control type="password" placeholder="رمز عبور" className={ styles.formControl }/>
                    <Form.Text className="text-muted">
                        رمز عبور باید شامل 8 کارکتر و شامل حروف، اعداد و نماها باشد.
                    </Form.Text>
                </FloatingLabel>
            </Form>
            <FormButton buttonText='ثبت‌نام' buttonColor='#FB8101' buttonTextColor='black' buttonColorHovered="#D96F00"/>
            {/* <script>{
                document.getElementById("phone").addEventListener("input", function (event) {
                    this.value = this.value.replace(/\D/g, "")
                });}
            </script> */}
        </div>
    );
}
 
export default TourLeaderSignUpRightPanel;