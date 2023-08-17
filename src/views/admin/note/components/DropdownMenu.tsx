/* eslint-disable */
import {filterDropdownOptions} from 'context/atom';
import {type KeyboardEvent, useRef, type MouseEvent, useState, useEffect, SetStateAction} from 'react'
import React from 'react';
import {useRecoilState} from 'recoil';

interface DropdownMenuProps {
    cursorPosition: { top: number; left: number };
    onClose: () => void;
}

export default function DropdownMenu(props: DropdownMenuProps): JSX.Element {
    const [dropdownOptions, setDropdownOptions] = useRecoilState(filterDropdownOptions);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const cursorPosition = props.cursorPosition;
    const handleChoiceLabelKeyPress = (event: KeyboardEvent<HTMLDivElement>): void => {
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

    const handleSelectLavelkeyPress = (event: KeyboardEvent<HTMLDivElement>): void => {
        console.log("빈 함수여서 에러 생겨서 콘솔 로그");
    }

    const handleSelectLavelClickEvent = (event: MouseEvent<HTMLDivElement>): void => {
        switch (buttonRef.current?.textContent) {
            case "H1":

                break;
            case "H2":

                break;
            case "H3":

                break;
            case "P":

                break;
            default:
                props.onClose();
                break;
        }
    }

    return (
        <div
            style={{position: 'absolute', top: cursorPosition.top, left: cursorPosition.left}}
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
                {dropdownOptions.map(option => (
                    <button ref={buttonRef} className='hover:bg-navy-50'>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    )
}
