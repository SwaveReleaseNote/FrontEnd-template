import React, { useEffect, useRef, useState } from 'react';

export default function SideMenubar(props: { width: number; children: React.ReactNode }): JSX.Element {
    const width: number = props.width;
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(-width);
    const side = useRef<HTMLDivElement>(null);

    const handleSideMenubarOpen = (): void => {
        if (xPosition < 0) {
            setX(0);
            setOpen(true);
        } else {
            setX(-280);
            setOpen(false);
        }
    };

    const handleSideMenubarClose = (event: MouseEvent): void => {
        const sideArea = side.current;
        const sideCildren = side.current?.contains(event.target as Node);
        if (isOpen && (sideArea !== null && sideCildren !== null)) {
            setX(-280);
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
        <div ref={side} className='relative mt-5 justify-end flex' style={{ transform: `translatex(${-xPosition}px)` }}>
            <button onClick={handleSideMenubarOpen} className='text-2xl'>
                {isOpen ? <span className='top-0'>X</span> : <span>⚙️</span>}
            </button>
            <div>{isOpen && props.children}</div>
        </div>
    );
}
