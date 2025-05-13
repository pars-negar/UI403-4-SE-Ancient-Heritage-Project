import { useState } from 'react'
import travel from '../../assets/icons/travel.svg'
import arrowDown from '../../assets/icons/arrow-down.svg'

const Toggle = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${isOpen ? 'bg-[var(--color-orange-light)]' : ''} transition-colors h-auto`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className='relative h-[3.2875rem] flex gap-[0.9375rem] items-center pr-[1.4375rem] text-black !m-0 !w-full'>           
                <img src={ travel } alt="travel" className='w-[1.625rem] h-[1.625rem]' />
                <span className='text-[var()] text-xl'>مدیریت تورها</span>
                <img src={ arrowDown } alt="arrow-down" className='absolute left-[1.1875rem]' />
            </button>

            {isOpen && (
              <div className="h-auto flex flex-col">
                <div className='flex justify-center w-full items-center pr-[1.0625rem]'>
                    <a href="/tours/list" className="pr-[1.9375rem] no-underline text-lg px-[0.5rem] py-[0.75rem] text-black hover:bg-[var(--color-orange)] w-[22.5rem] h-[3.1875rem]">
                    لیست تورها
                    </a>
                </div>
                <div className='flex justify-center w-full items-center pr-[1.0625rem]'>
                    <a href="/tours/create" className="pr-[1.9375rem] no-underline text-lg px-[0.5rem] py-[0.75rem] text-black hover:bg-[var(--color-orange)] w-[22.5rem] h-[3.1875rem]">
                        ایجاد تور جدید
                    </a>
                </div>
                
              </div>
            )}
        </div>
      );
}
 
export default Toggle;