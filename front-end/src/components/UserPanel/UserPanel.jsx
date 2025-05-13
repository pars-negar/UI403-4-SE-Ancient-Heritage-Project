import Toggle from './Toggle'

import logo from '../../assets/icons/logo.svg'
import userAvatar from '../../assets/images/user-avatar.png'
import home from '../../assets/icons/home.svg'
import userProfile from '../../assets/icons/user-profile.svg'
import travel from '../../assets/icons/travel.svg'
import arrowDown from '../../assets/icons/arrow-down.svg'
import logout from '../../assets/icons/logout.svg'


const UserPanel = () => {
    return (
        <div className='w-[26.25rem]'>
            <div className='h-full w-full flex items-center pr-[0.5rem] pt-[0.5rem]'>
                <div className='relative flex items-center ml-[1.375rem]'>
                    <div className='w-[5.9357rem] h-[5.8125rem] rounded-full border !border-[var(--color-orange)]'></div>
                    <img src={ logo } alt="logo" className='absolute right-0 w-[5.59rem] h-[3.9375rem]' />
                </div>
                <hr className='!w-[5px] !h-[3.5rem] border-none !bg-[var(--color-orange)] opacity-100 rounded-[8px] !ml-[0.4375rem]'/>
                <h3 className='!text-4xl' style={{fontFamily: 'Vazirmatn', fontWeight: 500}}>پنل کاربری</h3>
            </div>
            <div className='flex flex-col justify-center w-full h-auto mt-[4.25rem] items-center'>
                <img src={ userAvatar } alt="user-avatar" className='w-[11.1875rem] h-[11.1875rem] rounded'/>
                <h4 className='!text-3xl !font-bold !mt-[0.875rem]' style={{fontFamily: 'Vazirmatn', fontFamily: 500}}>محمدرضا مرادی</h4>
                <h4 className='!text-2xl !mt-[0.635rem] !mb-[2.9375rem]' style={{fontFamily: 'Vazirmatn', fontStyle: 400}}>مسئول تور</h4>
            </div>
            <div className='w-[26.26rem]'>
                <div className='relative h-[3.2875rem] flex gap-[0.9375rem] items-center pr-[1.4375rem] border-b border-[var(--color-orange)]'>
                    <img src={ home } alt="home-icon" className='w-[1.625rem] h-[1.625rem]' />
                    <span className='text-[var()] text-xl'>صفحه اصلی</span>
                </div>
                <div className='relative h-[3.2875rem] flex gap-[0.9375rem] items-center pr-[1.4375rem]'>
                    <img src={ userProfile } alt="user-profile" className='w-[1.625rem] h-[1.625rem]' />
                    <span className='text-[var()] text-xl'>ویرایش اطلاعات</span>
                </div>
                {/* <button className='relative h-[3.2875rem] flex gap-[0.9375rem] items-center pr-[1.4375rem] text-black !m-0 !w-full'>
                 
                    <img src={ travel } alt="travel" className='w-[1.625rem] h-[1.625rem]' />
                    <span className='text-[var()] text-xl'>مدیریت تورها</span>
                    <img src={ arrowDown } alt="arrow-down" className='absolute left-[1.1875rem]' />
                </button> */}
                <Toggle />
                <div className='relative h-[3.2875rem] flex gap-[0.9375rem] items-center pr-[1.4375rem]'>
                    <img src={ logout } alt="logout" className='w-[1.625rem] h-[1.625rem]' />
                    <span className='text-[var()] text-xl'>حذف حساب کاربری</span>
                </div>
            </div>
        </div> 
     );
}
 
export default UserPanel;