import styles from './success-massage.module.css';
import checkPic from '../../assets/images/Subtract.png';

export default function SuccessMassageRightPanel() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <img src={checkPic} alt="تیک موفقیت" className={styles.icon} />
        </div>
        <p className={styles.message}>
          رمز عبور شما با موفقیت تغییر کرد
        </p>
        <button className={styles.button}>
          صفحه ورود
        </button>
      </div>
    </div>
  );
}
