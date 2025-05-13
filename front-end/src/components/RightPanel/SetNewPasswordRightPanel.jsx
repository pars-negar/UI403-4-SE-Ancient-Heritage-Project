import FormButton from "../FormButton/FormButton";
import { Link } from 'react-router-dom';
import { Form, InputGroup, FloatingLabel } from 'react-bootstrap';
import styles from "./right-panel.module.css";
import selfStyles from './set-new-password-right-panel.module.css'

const SetNewPassword = () => {
    return ( 
        <div className={ selfStyles.setNewPasswordRightPanel }>
            <h1 className={ styles.formTitle }>تنظیم رمز عبور جدید</h1>
            {/* onSubmit={handleSubmit} */}
            <div className="formContainer">
                <Form className={styles.inputGroup}>
                    <div className={styles.formContainer}>

                    <InputGroup>
                        <InputGroup.Text className={ styles.inputGroupText }>
                            <FloatingLabel controlId="floatingPassword" label=" رمز عبور جدید" className={`${selfStyles.floatingLabel}`}>
                                <Form.Control
                                    type="password"
                                    placeholder="رمز عبور"
                                    className={selfStyles.formControl}
                                    // value={password}
                                    size='lg'
                                    // onChange={(e) => setPassword(e.target.value)}
                                />
                            </FloatingLabel>
                        </InputGroup.Text>
                    </InputGroup>

                    <InputGroup>
                        <InputGroup.Text className={ styles.inputGroupText }>
                        <FloatingLabel controlId="floatingUsername" label="تکرار رمز عبور جدید" className={`${selfStyles.floatingLabel}`}>
                            <Form.Control
                                type="text"
                                placeholder="نام کاربری"
                                size="lg"
                                // value={username}
                                className={selfStyles.formControl}
                                // onChange={(e) => setUsername(e.target.value)}
                            />
                        </FloatingLabel>
                        </InputGroup.Text>
                    </InputGroup>
                    <Link type='submit' to='/success'>
                        {/* <FormButton 
                            buttonText="تایید" 
                            buttonColor="--color-orange" 
                            buttonColorHovered="--color-orange-hovered" 
                            buttonTextColor="black"
                            /> */}
                        <button className={ styles.button }>تایید</button>
                    </Link>
                    </div>
                </Form>   
            </div>

            <div style={{ display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem"
                        }}>
            
            <Link to="/loginsignup/login" className={ styles.signUpLink } style={{ marginTop: "1rem" }}>
            بازگشت به صفحه ورود
            </Link>
            
            </div>
        </div>
     );
}
 
export default SetNewPassword;