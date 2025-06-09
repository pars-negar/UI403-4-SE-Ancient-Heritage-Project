import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import TourLeaderPanel from '../../components/UserPanel/TourLeaderPanel'
import TourInformation from '../../components/TourInformation/TourInformation'
import DeleteTourModal from './DeleteTourModal'; 

const ProfileTourInfoForTourLeader = () => {
    const { id, category } = useParams();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDeleteTourClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDeleteTour = () => {
        console.log("Tour deletion confirmed!");
        // اینجا می‌تونی منطق حذف تور رو اضافه کنی، مثلاً فراخوانی یک API
        setIsDeleteModalOpen(false);
    };

    return ( 
        <div className='flex flex-col bg-[var(--color-light-gray)]'>
            <div className='flex justify-between w-full'>
                <div className='bg-white !max-h-[80rem]'>
                    <TourLeaderPanel />
                </div>
                <div className='flex flex-col justify-center w-full'>
                    <hr className='-mx-9 bg-[var(--color-gray)] !mt-[4rem]'/>
                    <div className='flex gap-[0.5rem] items-center text-center mr-[4rem]'>
                        <hr className="!w-[5px] !h-[3.5rem] border-none !bg-[var(--color-dark-blue)] opacity-100 rounded-[8px] !ml-[0.4375rem]" />
                        <h3 className="!text-4xl !mb-[1.125rem]" style={{ fontFamily: 'Vazirmatn', fontWeight: 500 }}>اطلاعات تور اصفهان</h3>
                    </div>
                    <div className='flex justify-center'>
                        <TourInformation/>
                    </div>
                </div>
            </div>
            <div className='flex gap-[1rem] mt-[2rem] mr-[25rem] mb-[15rem]'>
                <button className='bg-[var(--color-dark-blue)] rounded-[13px] !w-[10rem] whitespace-nowrap !h-[2.5rem] flex items-center justify-center !text-xl m-0' style={{ fontFamily: 'Gandom'}}>ویرایش تور</button>
                <button 
                    className='text-black bg-[var(--color-orange)] rounded-[13px] !w-[10rem] whitespace-nowrap !h-[2.5rem] flex items-center justify-center !text-xl m-0' 
                    style={{ fontFamily: 'Gandom'}}
                    onClick={handleDeleteTourClick}
                >
                    حذف تور
                </button>
                <a href="/trp"><button className='bg-[var(--color-dark-blue)] rounded-[13px] !w-[10rem] whitespace-nowrap !h-[2.5rem] flex items-center justify-center !text-xl m-0' style={{ fontFamily: 'Gandom'}}>مشاهده خریداران</button></a>
            </div>
            <DeleteTourModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onDeleteConfirm={handleConfirmDeleteTour}
            />
        </div>
      );
}
 
export default ProfileTourInfoForTourLeader;