import React, { useState } from 'react'

type releaseNote = {
    id: number;
    version: string;
};

export default function SidebarNote(props: any) {
    const [releaseNote, setReleaseNote] = useState<releaseNote>(props.myNote);

    console.log(releaseNote);

    return (
        <p className='leading-1 ml-4 flex'>{releaseNote.version}</p>
    )
}
