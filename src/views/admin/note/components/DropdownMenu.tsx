import React from 'react'
import Dropdown from 'components/dropdown';
import { IoMdInformationCircleOutline, IoMdNotificationsOutline } from 'react-icons/io';
import navbarimage from "assets/img/layout/Navbar.png";
import { BsArrowBarUp } from 'react-icons/bs';

interface DropdownMenuProps {
    cursorPosition: { top: number; left: number };
    onClose: () => void;
}

export default function DropdownMenu(props: DropdownMenuProps) {
    const cursorPosition = props.cursorPosition;

    return (
        <div
            style={{ position: 'absolute', top: cursorPosition.top, left: cursorPosition.left }}
        >
            <div className=' transition-all ease-in-out flex flex-col z-10 bg-lightPrimary divide-y divide-gray-200 rounded-lg shadow-md w-44 dark:bg-gray-700' >
                <button className='hover:bg-navy-50'>
                    new
                </button>
                <button className='hover:bg-navy-50'>
                    update
                </button>
                <button className='hover:bg-navy-50'>
                    stop
                </button>
                <button className='hover:bg-navy-50'>
                    delete
                </button>
                <button className='hover:bg-navy-50'>
                    etc
                </button>
            </div>
        </div>
    )
}
