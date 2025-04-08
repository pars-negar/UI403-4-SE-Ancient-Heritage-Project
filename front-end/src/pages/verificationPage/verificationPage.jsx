import React from "react";
import img from "../../assets/images/code.png"
 import styles from './code.module.css';
 import LeftPanel from "../../components/LeftPanel/LeftPanel";
 import RightPanel from "../../components/RightPanel/verificationRightpanel/verificationRightPanel";
 
 
 const VerificationPage = () => {
   return (
     <div className={styles.container}>
       <LeftPanel rectanglesColor={"#e68a2efb"} imageTitle={"مسجد"} imageUrl={img} />
       <RightPanel />
     </div>
   );
 };
 
 export default VerificationPage;