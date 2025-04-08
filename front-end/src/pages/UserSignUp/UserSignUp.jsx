import LeftPanel from "../../components/LeftPanel/LeftPanel";
import UserSignUpRightPanel from "../../components/RightPanel/UserSignUpRightPanel";
import styles from './user-sign-up.module.css'

const UserSignUpPage = () => {
    const red = "#e68a2efb";
    return (
        <div className={ styles.userSignUp}>
            <LeftPanel imageUrl='./assets/images/user-sign-up-form-image.png' imageTitle="something" rectanglesColor="#e68a2efb" />
            <UserSignUpRightPanel />
        </div>
    );
}
 
export default UserSignUpPage;