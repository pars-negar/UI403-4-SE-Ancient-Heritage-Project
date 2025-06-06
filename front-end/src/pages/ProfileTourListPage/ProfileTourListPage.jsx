import TourLeaderPanel from "../../components/UserPanel/TourLeaderPanel";
import ProfiletourListLeft from "../../components/LeftPanel/ProfiletourListLeft";

const ProfileTourListPage = () => {
  return (

    <div className="flex h-screen bg-gray-100" dir="rtl">

      <div className="w-[26.25rem] bg-white shadow-lg overflow-y-auto border-l border-gray-200">
        <TourLeaderPanel />
      </div>


      <div className="flex-1 overflow-y-auto">
        <ProfiletourListLeft />
      </div>

    </div>
  );
};

export default ProfileTourListPage;