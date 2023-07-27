import React, { useState } from 'react'

interface releaseNote {
    id: number;
    version: string;
}

// TODO: 제대로 안담기는 문제 해결 필요
// TODO: Major, Minor, Patch 에 따라 분리과정 필요

export default function SidebarNote(props: any): JSX.Element {
    const [releaseNote] = useState<releaseNote>(props.myNote);

    console.log(releaseNote);

    return (
        <p className='leading-1 ml-4 flex'>{releaseNote.version}</p>
    )
}
