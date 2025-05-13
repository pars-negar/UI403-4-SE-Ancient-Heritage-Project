import React from "react";
import pic from "../../assets/images/left-panel-verification.png"
 import styles from './verification.module.css';
 import LeftPanel from "../../components/LeftPanel/LeftPanel";
 import RightPanel from "../../components/RightPanel/verificationRightPanel";
 
 
 const VerificationPage = () => {
   return (
     <div className={styles.container}>
       <RightPanel />
       <LeftPanel rectanglesColor= "--color-orange" imageTitle={"مسجد"} imageUrl={pic} />
     </div>
   );
 };
 
 export default VerificationPage;