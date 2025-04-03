import styles from './user-sign-up-right-panel.module.css'

const UserSignUpRightPanel = () => {
    return (  
        <div className={ styles.userSignUpRightPanel }>
            <h1>ثبت‌نام کاربر</h1>
            <form action="submit">
                <input type="text" placeholder='نام کاربری'/>
                <input type="number" placeholder='شماره موبایل' />
                <input type="email" placeholder='ایمیل'/>
                <input type="password" placeholder='رمز عبور'/>
            </form>
        </div>
    );
}
 
export default UserSignUpRightPanel;