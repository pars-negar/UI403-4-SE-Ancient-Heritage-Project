import React from "react";
import img from "../../assets/images/code.png"
 import styles from './verification.module.css';
 import LeftPanel from "../../components/LeftPanel/LeftPanel";
 import RightPanel from "../../components/RightPanel/verificationRightPanel";
 
 
 const VerificationPage = () => {
   return (
     <div className={styles.container}>
       <RightPanel />
       <LeftPanel rectanglesColor= "--color-orange" imageTitle={"مسجد"} imageUrl={img} />
     </div>
   );
 };
 
 export default VerificationPage;