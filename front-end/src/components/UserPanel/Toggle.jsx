import { useState } from 'react'
import travel from '../../assets/icons/travel.svg'
import arrowDown from '../../assets/icons/arrow-down.svg'

import ManageIcon from '../Icons/ManageIcon'
import DropDownIcon from '../Icons/DropDownIcon'

const Toggle = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${isOpen ? 'bg-[var(--color-orange-light)]' : ''} transition-colors h-auto`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className='relative 
                           h-[3.2875rem] 
                           flex 
                           gap-[0.6rem] 
                           items-center 
                           pr-[1.4375rem]  
                           !m-0 
                           !w-full
                           !text-[var(--color-gray)]
                         hover:text-black
                           hover:font-bold
                           cursor-pointer
                           group'
                >           
                {/* <img src={ travel } alt="travel" className='w-[1.625rem] h-[1.625rem]' /> */}
                <ManageIcon className="text-[var(--color-gray)] group-hover:text-black" />
                <span className='text-[var()] text-xl group-hover:text-black group-hover:font-bold'>مدیریت تورها</span>
                {/* <img src={ arrowDown } alt="arrow-down" className='absolute left-[1.1875rem]' /> */}
                <DropDownIcon className="text-[var(--color-gray)] group-hover:text-black absolute left-[1.1875rem]"/>

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