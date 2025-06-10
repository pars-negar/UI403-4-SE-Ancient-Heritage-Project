// ProfileTourInfoForTourLeader.jsx
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TourLeaderPanel from '../../components/UserPanel/TourLeaderPanel';
import TourInformation from '../../components/TourInformation/TourInformation';
import DeleteTourModal from './DeleteTourModal';
import axios from 'axios';

const ProfileTourInfoForTourLeader = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access_token");  // یا "authToken"

  useEffect(() => {
    const fetchTour = async () => {
      if (!token) {
        alert('لطفاً وارد شوید');
        navigate('/login');
        return;
      }
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/homepage/dashboard/tours/${id}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTourData(res.data);
      } catch (err) {
        if (err.response?.status === 404) {
          alert("تور پیدا نشد یا دسترسی ندارید");
          navigate("/not-authorized");
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id, navigate, token]);

  const openModal = () => setIsDeleteModalOpen(true);
  const closeModal = () => setIsDeleteModalOpen(false);
  const confirmDelete = () => {
    console.log("حذف تأیید شد");
    setIsDeleteModalOpen(false);
  };

  if (loading) return <div className="text-center mt-10">در حال بارگذاری...</div>;

  return (
    <div className='flex flex-col bg-[var(--color-light-gray)]'>
      <div className='flex justify-between w-full'>
        <div className='bg-white !max-h-[80rem]'><TourLeaderPanel /></div>
        <div className='flex flex-col justify-center w-full'>
          <hr className='-mx-9 bg-[var(--color-gray)] !mt-[4rem]'/>
          <div className='flex gap-[0.5rem] items-center text-center mr-[4rem]'>
            <hr className="!w-[5px] !h-[3.5rem] border-none !bg-[var(--color-dark-blue)] opacity-100 rounded-[8px] !ml-[0.4375rem]" />
            <h3 className="!text-4xl !mb-[1.125rem]" style={{ fontFamily: 'Vazirmatn', fontWeight: 500 }}>
              اطلاعات تور {tourData?.tour_name || ''}
            </h3>
          </div>
          <div className='flex justify-center'><TourInformation tour={tourData} /></div>
        </div>
      </div>

      <div className='flex gap-[1rem] mt-[2rem] mr-[25rem] mb-[15rem]'>
        <button className='bg-[var(--color-dark-blue)] rounded-[13px] !w-[10rem] !h-[2.5rem] flex items-center justify-center !text-xl' style={{ fontFamily: 'Gandom' }}>ویرایش تور</button>
        <button className='text-black bg-[var(--color-orange)] rounded-[13px] ...' style={{ fontFamily: 'Gandom' }} onClick={openModal}>حذف تور</button>
        <a href="/trp"><button className='bg-[var(--color-dark-blue)] rounded-[13px] ...' style={{ fontFamily: 'Gandom' }}>مشاهده خریداران</button></a>
      </div>

      <DeleteTourModal isOpen={isDeleteModalOpen} onClose={closeModal} onDeleteConfirm={confirmDelete} />
    </div>
  );
};

export default ProfileTourInfoForTourLeader;
