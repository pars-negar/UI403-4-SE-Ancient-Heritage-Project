import LeftPanel2 from "../../components/LeftPanel/LeftPanel2";
import UserSignUpRightPanel from "../../components/RightPanel/UserSignUpRightPanel";
import styles from './user-sign-up-page.module.css'

const UserSignUpPage = () => {
    const red = "#e68a2efb";
    return (
        <div className={ styles.userSignUpPage }>
            <LeftPanel2 imageUrl='./assets/images/user-sign-up-form-image.png' imageTitle="something" rectanglesColor="#e68a2efb" />
            <UserSignUpRightPanel />
        </div>
    );
}
 
export default UserSignUpPage;