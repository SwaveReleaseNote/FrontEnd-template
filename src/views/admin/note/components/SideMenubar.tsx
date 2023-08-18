import React, { useEffect, useRef, useState } from 'react';

interface SideMenuProps {
    width: number;
    children: React.ReactNode
}

// todo: 사이드 바 메뉴 닫았다가 킬 경우 선택했던 값들이 사라지는 문제

export default function SideMenubar(props: SideMenuProps): JSX.Element {
    const width: number = props.width;
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(width);
    const side = useRef<HTMLDivElement>(null);

    const handleSideMenubarOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        if (!isOpen) {
            setX(width);
            setOpen(true);
        } else {
            setX(width);
            setOpen(false);
        }
    };

    const handleSideMenubarClose = (event: MouseEvent): void => {
        const sideArea = side.current;
        const sideChildren = side.current?.contains(event.target as Node);
        if (isOpen && (sideArea !== null && sideChildren !== null)) {
            setX(width);
            setOpen(false);
        }
    };
    

    useEffect(() => {
        window.addEventListener('click', handleSideMenubarClose);
        return () => {
            window.removeEventListener('click', handleSideMenubarClose);
        };
    }, []);

    return (
        <div ref={side} className='mt-5 fixed ease-in-out'
             style={{ width: `${width}px`, height: '100%', transform: `translatex(${-xPosition}px)`}}>
            <button onClick={handleSideMenubarOpen}
                    className='text-2xl'
            >
                {isOpen
                    ? <span className='top-0'>X</span>
                    : <span>⚙️</span>}
            </button>
            <div className='relative'>{isOpen && props.children}</div>
        </div>
    );
}
