import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TourLeaderPanel from "../../components/UserPanel/TourLeaderPanel";
import CreateTourForm from '../../components/LeftPanel/CreateTourForm';

const TourAdminPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      // اگر توکن نیست مستقیم به لاگین بفرست
      navigate('/LoginSignUp');
      return;
    }

    fetch('http://127.0.0.1:8000/api/users/oneuser/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('خطا در دریافت اطلاعات کاربر');
        return res.json();
      })
      .then(data => {
        if (data.role !== 'tour_manager') {
          // اگر نقش غیر مجاز بود به صفحه ارور یا صفحه اصلی بفرست
          navigate('/unauthorized');
        } else {
          setLoading(false); // دسترسی تأیید شد، صفحه لود می‌شود
        }
      })
      .catch(() => {
        // اگر خطا بود یا توکن نامعتبر بود به لاگین بفرست
        navigate('/LoginSignUp');
      });
  }, [token, navigate]);

  if (loading) {
    // نمایش لودر یا متن در حال لود شدن تا تأیید شود
    return <div>در حال بررسی دسترسی...</div>;
  }

  return (
    <div className="!flex !h-screen !bg-gray-100" dir="rtl">
      <div className="!w-[26.25rem] !bg-white !shadow-lg !overflow-y-auto !border-l !border-gray-200">
        <TourLeaderPanel />
      </div>
      <div className="!flex-1 !overflow-y-auto">
        <CreateTourForm token={token} />
      </div>
    </div>
  );
};

export default TourAdminPage;
