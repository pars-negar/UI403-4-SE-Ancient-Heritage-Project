import LeftPanel from "../../components/LeftPanel/LeftPanel";
import pic from '../../assets/images/left-panel-set-new-password.png';
import SuccessMassageRightPanel from "../../components/RightPanel/SuccessMassageRightPanel";
import styles from './success.module.css'
const SuccessMassage = () => {
    return ( 
        <div className={styles.success}>
            <SuccessMassageRightPanel />
            <LeftPanel 
                imageUrl= { pic }
                imageTitle="success-massage-image"
                rectanglesColor="--color-orange" />
        </div>
     );
}
 
export default SuccessMassage;