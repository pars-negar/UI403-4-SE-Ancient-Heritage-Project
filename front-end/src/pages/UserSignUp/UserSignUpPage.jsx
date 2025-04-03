import LeftPanel2 from "../../components/LeftPanel/LeftPanel2";
import UserSignUpRightPanel from "../../components/UserSignUpRightPanel/UserSignUpRightPanel";


const UserSignUpForm = () => {
    return (
        <div className="UserSignUpPage">
            <LeftPanel2 imageUrl='./assets/images/user-sign-up-form-image.png' imageTitle="something" rectanglesColor="#e68a2efb" />
            {/* <UserSignUpRightPanel /> */}
        </div>
    );
}
 
export default UserSignUpForm;