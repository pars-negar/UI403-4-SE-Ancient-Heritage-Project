import LeftPanel from "../../components/LeftPanel/LeftPanel";
import PassRecoveryRightPanel from "../../components/RightPanel/PassRecoveryRightPanel"
import styles from './password-recovery.module.css'

const PasswordRecovery = () => {
    return (
        <div className={styles.passwordRecovery}>
            <PassRecoveryRightPanel />
            <LeftPanel imageUrl='./assets/images/passRecovery.png' imageTitle="نمای تخت جمشید" rectanglesColor="--color-orange" />
        </div>
    );
}
 
export default PasswordRecovery