import UserPanel from "../../components/UserPanel/UserPanel";
import CreateTourForm from '../../components/LeftPanel/CreateTourForm';

const TourAdminPage = () => {
  return (
    <div className="!flex !h-screen !bg-gray-100" dir="rtl">
      {/* UserPanel Placeholder - کد اصلی UserPanel شما اینجا قرار می‌گیرد */}
      <div className="!w-[26.25rem] !bg-white !shadow-lg !overflow-y-auto !border-l !border-gray-200">
        <UserPanel />
        <div className="!p-6">
          <p className="!text-center">محتوای UserPanel</p>
        </div>
      </div>

      {/* Form Area */}
      <div className="!flex-1 !overflow-y-auto">
        <CreateTourForm />
      </div>
    </div>
  );
};

export default TourAdminPage;