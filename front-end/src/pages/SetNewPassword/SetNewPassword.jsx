import LeftPanel from "../../components/LeftPanel/LeftPanel";
import SetNewPasswordRightPanel from "../../components/RightPanel/SetNewPasswordRightPanel";
import styles from './set-new-password.module.css'
import pic from '../../assets/images/left-panel-set-new-password.png';

const SetNewPassword = () => {
    return ( 
        <div className={styles.setNewPassword}>
            <SetNewPasswordRightPanel />
            <LeftPanel 
                imageUrl= { pic }
                imageTitle="set-new-password-image"
                rectanglesColor="--color-orange" />
        </div>
     );
}
 
export default SetNewPassword;