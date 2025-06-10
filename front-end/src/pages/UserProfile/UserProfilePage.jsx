import UserPanel from "../../components/UserPanel/UserPanel";
import dropDownIcon from '../../assets/icons/dropdown.svg';
import userAvatar from '../../assets/images/user-avatar.png';
import { useEffect, useState } from "react";

const UserProfilePage = () => {
    const baseUrl = "http://127.0.0.1:8000";
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
          const token = localStorage.getItem('access_token');
          if (!token) {
            console.error('توکن وجود ندارد.');
            setLoading(false);
            return;
          }
    
          try {
            const response = await fetch(`${baseUrl}/api/users/oneuser/`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
    
            if (response.ok) {
              const data = await response.json();
              setUserData(data);
            } else {
              console.error('دریافت اطلاعات کاربر ناموفق بود.');
            }
          } catch (err) {
            console.error('خطا در دریافت اطلاعات:', err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUserData();
      }, []);

    return (
    <div className="flex h-screen">
        <div>
            <UserPanel />
        </div>
        
        <div className="bg-[var(--color-light-gray)] w-full flex flex-col items-center flex-grow p-8 overflow-y-auto">
            
            <div className="w-[52.9375rem]">
                <div className="flex justify-start items-center w-full mb-4"> 
                    <hr className='!w-[5px] !h-[2.75rem] border-none !bg-[var(--color-dark-blue)] opacity-100 rounded-[8px] !ml-[0.4375rem]'/>
                    <h3 className='!text-4xl' style={{fontFamily: 'Vazirmatn', fontWeight: 500}}>پروفایل من</h3>
                </div>

                <div className="bg-[#205781] text-white p-4 flex justify-between items-center rounded-t-[30px]">
                    <div className="flex items-center gap-4">
                        <img
                            src={userData && userData.profile_image ? `${baseUrl}${userData.profile_image}` : userAvatar}
                            alt="آواتار کاربر"
                            className="w-[8.75rem] h-[8.75rem] rounded-full" 
                        />
                        <div className="flex flex-col items-end">
                            <p className="text-lg font-semibold" style={{fontFamily: 'Vazirmatn'}}>
                                {userData ? userData.username : 'نامشخص'}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-center items-center w-full rounded-b-[30px] bg-white p-[2.5rem]">
                    <form action="submit" className="">
                        <div className="w-full flex flex-col gap-[1rem]" style={{ fontFamily: 'Vazirmatn', fontWeight: 700}}>
                            <div className="flex gap-[3rem]">
                                <div className="flex flex-col gap-[0.3rem]">
                                    <label htmlFor="">نام</label>
                                    <input type="text" className="w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]"/>
                                </div>
                                <div className="flex flex-col gap-[0.3rem]">
                                    <label htmlFor="">نام خانوادگی</label>
                                    <input type="text" className="w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]"/>
                                </div>
                            </div>
                            <div className="flex gap-[3rem]">
                                <div className="flex flex-col gap-[0.3rem]">
                                    <label htmlFor="">کد ملی</label>
                                    <input type="text" className="w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]"/>
                                </div>
                                <div className="flex flex-col gap-[0.3rem]">
                                    <label htmlFor="date">تاریخ تولد</label>
                                    <input type="date" className="w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]"/>
                                </div>
                            </div>
                            <div className="flex gap-[3rem]">
                                <div className="flex flex-col gap-[0.3rem]">
                                    <label htmlFor="phone">شماره موبایل</label>
                                    <input name="tel" type="tel" className="w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]"/>
                                </div>
                                <div className="flex flex-col gap-[0.3rem]">
                                    <label htmlFor="email">ایمیل(اختیاری)</label>
                                    <input name="email" type="email" className="w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]"/>
                                </div>
                            </div>
                            <div className="flex gap-[3rem]">
                                <div className="flex flex-col gap-[0.3rem]">
                                    <label htmlFor="">استان</label>
                                    <select className="appearance-none w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px] pr-2">
                                        <option value="اصفهان">اصفهان</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-[0.3rem]">
                                    <label htmlFor="city">شهر</label>
                                    <span className="relative flex justify-between w-full">
                                        <select name="city" className="appearance-none w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px] pr-2">
                                            <option value="اصفهان">اصفهان</option>
                                        </select>
                                        <img src={dropDownIcon} alt="dropdownicon" className="absolute left-[0.5rem] top-[0.75rem]" />
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-[3rem] mt-4">
                                <div className="flex flex-col gap-[0.3rem]">
                                    <label htmlFor="">رمز عبور</label>
                                    <input type="password" className="w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]"/>
                                </div>
                                <div className="flex flex-col gap-[0.3rem]">
                                    <label htmlFor="">تایید رمز عبور</label>
                                    <input type="password" className="w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]"/>
                                </div>
                            </div>
                            <div className="flex justify-end w-full mt-4">
                                <div className="w-[10rem]">
                                    <button className="bg-[var(--color-dark-blue)] text-white !w-[10rem] !h-[3rem] flex justify-center items-center rounded-lg">ثبت اطلاعات</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="h-8"></div>
            </div>
        </div>
    </div>
    );
}

export default UserProfilePage;