import UserPanel from "../../components/UserPanel/UserPanel";

const ProfileTourLeader = () => {
    return ( 
        <>
            <div className="flex">
                <div>
                    <UserPanel />
                </div>
                <div className="bg-[var(--color-light-gray)] w-full h-[100vh] flex flex-col justify-center items-center"> 
                    <div className="flex "> 
                        <hr className='!w-[5px] !h-[3.5rem] border-none !bg-[var(--color-orange)] opacity-100 rounded-[8px] !ml-[0.4375rem]'/>
                        <h3 className='!text-4xl' style={{fontFamily: 'Vazirmatn', fontWeight: 500}}>پنل کاربری</h3>
                    </div>
                    <div className="w-[52.9375rem] h-[40rem] rounded-[30px] bg-white">
                        <form action="submit">

                        </form>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default ProfileTourLeader;