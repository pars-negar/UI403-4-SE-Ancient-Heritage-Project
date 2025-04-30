import LeftPanel from "../../components/LeftPanel/LeftPanel";
import SetNewPasswordRightPanel from "../../components/RightPanel/SetNewPasswordRightPanel"
import styles from './password-recovery.module.css'

const PasswordRecovery = () => {
    return (
        <div className={styles.passwordRecovery}>
            <SetNewPasswordRightPanel />
            <LeftPanel imageUrl='./assets/images/passRecovery.png' imageTitle="نمای تخت جمشید" rectanglesColor="--color-orange" />
        </div>
    );
}
 
export default PasswordRecovery