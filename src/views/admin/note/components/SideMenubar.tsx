import React, { Children, useEffect, useRef, useState } from 'react'

export default function SideMenubar(props: any) {
    const width: number = props.width;
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(-width);
    const side = useRef<any>();

    const handleSideMenubarOpen = () => {
        if (xPosition < 0) {
            setX(0);
            setOpen(true);
        } else {
            setX(-280);
            setOpen(false);
        }
    };

    const handleSideMenubarClose = async (event: { target: any; }) => {
        let sideArea = side.current;
        let sideCildren = side.current.contains(event.target);
        if (isOpen && (!sideArea || !sideCildren)) {
            await setX(-280);
            await setOpen(false);
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleSideMenubarClose);
        return () => {
            window.removeEventListener('click', handleSideMenubarClose);
        };
    })

    return (
        <div ref={side} className='relative mt-5 justify-end flex w-[${-width}px]' style={{transform : 'translatex(${-xPosition}px)'}}>
            <button onClick={handleSideMenubarOpen} className='text-2xl'>
                {isOpen 
                ? <span className=' top-0'>X</span> 
                : <span>⚙️</span>}
            </button>
            <div>
                {isOpen && props.children}
            </div>
        </div>
    )
}
