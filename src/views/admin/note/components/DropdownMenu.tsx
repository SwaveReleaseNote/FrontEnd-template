import React, { KeyboardEvent, useRef, MouseEvent } from 'react'
import Dropdown from 'components/dropdown';
import { IoMdInformationCircleOutline, IoMdNotificationsOutline } from 'react-icons/io';
import navbarimage from "assets/img/layout/Navbar.png";
import { BsArrowBarUp } from 'react-icons/bs';
import { ENETDOWN } from 'constants';

interface DropdownMenuProps {
    cursorPosition: { top: number; left: number };
    onClose: () => void;
}

export default function DropdownMenu(props: DropdownMenuProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const cursorPosition = props.cursorPosition;

    const handleChoiceLabelKeyPress = (event : KeyboardEvent<HTMLDivElement>) => {
        // if(event.key === 'Home') { // 방향키 왼족
        //     console.log('왼')
        // }
        // else if(event.key === 'PageUp') { // 위쪽
        //     console.log('위')
        // }
        // else if(event.key === 'PageDown') { // 아래쪽
        //     console.log('아래')
        // }
        // else if(event.key === 'End') { // 오른쪽
        //     console.log('오')
        // }
    }

    const handleSelectLavelkeyPress = (event : KeyboardEvent<HTMLDivElement>) => {

    }

    const handleSelectLavelClickEvent = (event: MouseEvent<HTMLDivElement>) => {
        console.log(event.target)
        console.log(buttonRef.current.textContent)
    }

    return (
        <div
            style={{ position: 'absolute', top: cursorPosition.top, left: cursorPosition.left }}
        >
            <div
                className=' transition-all ease-in-out flex flex-col z-10 bg-lightPrimary divide-y divide-gray-200 rounded-lg shadow-md w-44 dark:bg-gray-700'
                onKeyDown={(event) => {
                    handleChoiceLabelKeyPress(event)
                    handleSelectLavelkeyPress(event)
                }}
                onClick={(event) => {
                    handleSelectLavelClickEvent(event)
                }}
            >
                <button ref={buttonRef} className='hover:bg-navy-50'>
                    new
                </button>
                <button ref={buttonRef} className='hover:bg-navy-50'>
                    update
                </button>
                <button ref={buttonRef} className='hover:bg-navy-50'>
                    stop
                </button>
                <button ref={buttonRef} className='hover:bg-navy-50'>
                    delete
                </button>
                <button ref={buttonRef} className='hover:bg-navy-50'>
                    etc
                </button>
            </div>
        </div>
    )
}
