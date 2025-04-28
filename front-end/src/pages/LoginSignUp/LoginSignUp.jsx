import LoginSignupLeftPanel from "../../components/LeftPanel/LoginSignUpLeftPanel";
import LoginSignUpRightPanel from "../../components/RightPanel/LoginSignUpRightPanel";
import styles from './log-sign-module.css'
const LoginSignup = () => {
    return (
        <div className={styles.logInSignUp}>
                <LoginSignUpRightPanel/>
                <LoginSignupLeftPanel/>
                
        </div>
    );
}
 
export default LoginSignup

