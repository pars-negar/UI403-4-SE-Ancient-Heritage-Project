import LeftPanel from "../../components/LeftPanel/LeftPanel";
import TourLeaderSignUpRightPanel from "../../components/RightPanel/TourLeaderSignUpRightPanel";
import styles from './tour-leader-sign-up.module.css'

const TourLeaderSignUp = () => {
    return ( 
        <div className={styles.tourLeaderSignUp}>
            <LeftPanel 
                imageUrl='./assets/images/tour-leader-sign-up-form-image.png'
                imageTitle="tour-leader-sign-up-form-image"
                rectanglesColor="#FB8101" />
            <TourLeaderSignUpRightPanel />
        </div>
     );
}
 
export default TourLeaderSignUp;