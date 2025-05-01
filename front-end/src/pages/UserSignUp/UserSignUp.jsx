import LeftPanel from "../../components/LeftPanel/LeftPanel";
import UserSignUpRightPanel from "../../components/RightPanel/UserSignUpRightPanel";
import styles from './user-sign-up.module.css'
import pic from '../../assets/images/left-panel-user-sign-up.png'

const UserSignUpPage = () => {
    const red = "#e68a2efb";
    return (
        <div className={ styles.userSignUp}>
            <UserSignUpRightPanel />
            <LeftPanel imageUrl={pic} imageTitle="something" rectanglesColor="--color-orange" />
        </div>
    );
}
 
export default UserSignUpPage;