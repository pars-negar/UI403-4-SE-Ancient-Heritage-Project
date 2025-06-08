import TourLeaderPanel from "../../components/UserPanel/TourLeaderPanel";
import './profile-tour-leader.css'
import dropDownIcon from '../../assets/icons/dropdown.svg'

const ProfileTourLeader = () => {
    return ( 
        <>
            <div className="flex min-h-screen">
                <div>
                    <TourLeaderPanel />
                </div>
                <div className="bg-[var(--color-light-gray)] w-full flex flex-col justify-center items-center flex-grow p-[2rem]"> 
                    <hr className="bg-[--color-gray] w-full !mt-[2rem]"/>
                    <div className="flex justify-start items-center w-full mr-[16rem]"> 
                        <hr className='!w-[5px] !h-[2.75rem] border-none !bg-[var(--color-dark-blue)] opacity-100 rounded-[8px] !ml-[0.4375rem]'/>
                        <h3 className='!text-4xl' style={{fontFamily: 'Vazirmatn', fontWeight: 500}}>اطلاعات حساب کاربری</h3>
                    </div>
                    <div className="flex justify-center items-center w-[52.9375rem] h-full rounded-[30px] bg-white p-[1.5rem]">
                        <form action="submit" className="">
                            <div className="w-full flex flex-col gap-[1rem]" style={{ fontFamily: 'Vazirmatn', fontWeight: 700}}>
                                <div className="flex gap-[3rem]">
                                    <div className="flex flex-col gap-[0.3rem]">
                                        <label htmlFor="">نام</label>
                                        <input type="text" className="w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]"/>
                                    </div>
                                    <div className="flex flex-col gap-[0.3rem]">
                                        <label htmlFor="">نام خانوادگی</label>
                                        <input type="text" placeholder="محمدرضا مرادی" className="w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]"/>
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
                                        <input name="tel" type="tel" placeholder="09124785500" className="w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]"/>
                                    </div>
                                    <div className="flex flex-col gap-[0.3rem]">
                                        <label htmlFor="email">ایمیل(اختیاری)</label>
                                        <input name="email" type="email" className="w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]"/>
                                    </div>
                                </div>
                                <div className="flex gap-[3rem]">
                                    <div className="flex flex-col gap-[0.3rem]">
                                        <label htmlFor="">استان</label>
                                        <select className="appearance-none w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]">
                                            <option value="اصفهان">اصفهان</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-[0.3rem]">
                                        <label htmlFor="city">شهر</label>
                                        <span className="relative flex justify-between w-full">
                                            <select name="city" className="appearance-none w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]">
                                                <option value="اصفهان">اصفهان</option>
                                            </select>
                                            <img src={dropDownIcon} alt="dropdownicon" className="absolute left-[0.5rem] top-[0.75rem]" />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-[3rem]">
                                    <div className="flex flex-col gap-[0.3rem]">
                                        <label htmlFor="">نام شرکت</label>
                                        <input type="text" className="w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]"/>
                                    </div>
                                    <div className="flex flex-col gap-[0.3rem]">
                                        <label htmlFor="">شماره ثبت شرکت</label>
                                        <input type="text" className="w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]"/>
                                    </div>
                                </div>
                                <div className="flex gap-[3rem]">
                                    <div className="flex flex-col gap-[0.3rem]">
                                        <label htmlFor="">رمز عبور</label>
                                        <input type="password" className="w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]"/>
                                    </div>
                                    <div className="flex flex-col gap-[0.3rem]">
                                        <label htmlFor="">تایید رمز عبور</label>
                                        <input type="password" className="w-[18rem] h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]"/>
                                    </div>
                                </div>
                                 <div className="flex flex-col gap-[0.3rem]">
                                    <label htmlFor="">آدرس شرکت</label>
                                    <input type="text" className="w-full h-[2.5rem] border-[1.6px] border-black border-solid rounded-[8px]"/>
                                </div>
                                <div className="flex justify-end w-full profiletourleaderbutton">
                                    <div className="w-[10rem]">
                                        <button className="profiletourleaderbutton bg-[var(--color-dark-blue)] text-white !w-[10rem] !h-[3rem] flex justify-center items-center">ثبت اطلاعات</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default ProfileTourLeader;