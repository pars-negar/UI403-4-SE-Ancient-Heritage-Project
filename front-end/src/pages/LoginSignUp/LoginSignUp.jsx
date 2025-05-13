import LoginSignupLeftPanel from "../../components/LeftPanel/LoginSignUpLeftPanel";
import LoginSignUpRightPanel from "../../components/RightPanel/LoginSignUpRightPanel";
import './log-sign-module.css'
const LoginSignup = () => {
    return (
        <div className='logInSignUp'>
                <LoginSignUpRightPanel/>
                <LoginSignupLeftPanel/>
                
        </div>
    );
}
 
export default LoginSignup

