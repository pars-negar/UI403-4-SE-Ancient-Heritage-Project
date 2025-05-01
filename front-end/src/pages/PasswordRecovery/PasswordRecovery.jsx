import LeftPanel from "../../components/LeftPanel/LeftPanel";
import PassRecoveryRightPanel from "../../components/RightPanel/PassRecoveryRightPanel"
import styles from './password-recovery.module.css'
import pic from '../../assets/images/left-panel-password-recovery.png'

const PasswordRecovery = () => {
    return (
        <div className={ styles.passwordRecovery }>
            <PassRecoveryRightPanel />
            <LeftPanel imageUrl={ pic } imageTitle="نمای تخت جمشید" rectanglesColor="--color-orange" />
        </div>
    );
}
 
export default PasswordRecovery