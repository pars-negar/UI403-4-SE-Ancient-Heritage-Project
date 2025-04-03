import LeftPanel2 from "../../components/LeftPanel/LeftPanel2";
import PassRecoveryRightPanel from "../../components/RightPanel/PassRecoveryRightPanel"
import styles from './password-recovery.module.css'

const PasswordRecovery = () => {
    return (
        <div className={styles.passwordRecovery}>
            <LeftPanel2 imageUrl='./assets/images/passRecovery.png' imageTitle="نمای تخت جمشید" rectanglesColor="#205781" />
            <PassRecoveryRightPanel />
        </div>
    );
}
 
export default PasswordRecovery