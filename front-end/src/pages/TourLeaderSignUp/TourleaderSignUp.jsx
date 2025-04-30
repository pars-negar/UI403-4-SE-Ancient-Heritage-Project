import LeftPanel from "../../components/LeftPanel/LeftPanel";
import TourLeaderSignUpRightPanel from "../../components/RightPanel/TourLeaderSignUpRightPanel";
import styles from './tour-leader-sign-up.module.css'
import pic from '../../assets/images/left-panel-tourleader-sign-up.png';

const TourLeaderSignUp = () => {
    return ( 
        <div className={styles.tourLeaderSignUp}>
            <TourLeaderSignUpRightPanel />
            <LeftPanel 
                imageUrl= { pic }
                imageTitle="tour-leader-sign-up-form-image"
                rectanglesColor="--color-orange" />
        </div>
     );
}
 
export default TourLeaderSignUp;