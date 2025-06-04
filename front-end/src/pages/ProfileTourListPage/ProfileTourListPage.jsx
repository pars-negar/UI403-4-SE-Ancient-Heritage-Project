import UserPanel from "../../components/UserPanel/UserPanel";
import ProfiletourListLeft from "../../components/LeftPanel/ProfiletourListLeft";

const ProfileTourListPage = () => {
  return (

    <div className="flex h-screen bg-gray-100" dir="rtl">

      <div className="w-[26.25rem] bg-white shadow-lg overflow-y-auto border-l border-gray-200">
        <UserPanel />
      </div>


      <div className="flex-1 overflow-y-auto">
        <ProfiletourListLeft />
      </div>

    </div>
  );
};

export default ProfileTourListPage;