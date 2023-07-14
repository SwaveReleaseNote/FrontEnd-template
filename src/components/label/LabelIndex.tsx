/**
 * @description 라벨 컴포넌트 : 라벨과 Text를 보여준다
 */
import React from 'react'
import { useRecoilState } from 'recoil'
import { labelState } from '../../context/atom'
import newLabel from '../../assets/img/label/NEW.png'
import updateLabel from '../../assets/img/label/UPDATE.png'
import deleteLabel from '../../assets/img/label/DELETE.png'
import stopLabel from '../../assets/img/label/STOP.png'
import etcLabel from '../../assets/img/label/ETC.png'

export default function LabelIndex(props: any) {
    const block = props.NoteFieldBlock;

    switch (block.label) {
        case 'new':
            return (<div className='my-10'>
                <span>
                    <img className='my-5 rounded-xl w-1/12 max-w-lg shadow-xl' src={newLabel} />
                </span>
                <div className='break-words w-full text-clip mt-2 px-2 inline-block'>
                    <p>{block.text}</p>
                </div>
            </div>)
        case 'update':
            return <div className='my-10'>
                <span>
                    <img className='my-5 rounded-xl w-1/12 max-w-lg shadow-xl' src={updateLabel} />
                </span>
                <div className=' break-words w-full text-clip mt-2 px-2 inline-block'>
                    <p>{block.text}</p>

                </div>
            </div>
        case 'delete':
            return <div className='my-10'>
                <span>
                    <img className='my-5 rounded-xl w-1/12 max-w-lg shadow-xl' src={deleteLabel} />
                </span>
                <div className='break-words w-full text-clip mt-2 px-2 inline-block'>
                    <p>{block.text}</p>
                </div>
            </div>
        case 'stop':
            return <div className='my-10'>
                <span>
                    <img className='my-5 rounded-xl w-1/12 max-w-lg shadow-xl' src={stopLabel} />
                </span>
                <div className='break-words w-full text-clip mt-2 px-2 inline-block'>
                    <p>{block.text}</p>
                </div>
            </div>
        case 'etc':
            return <div className='my-10'>
                <span>
                    <img className='my-5 rounded-xl w-1/12 max-w-lg shadow-xl' src={etcLabel} />
                </span>
                <div className='break-words w-full text-clip mt-2 px-2 inline-block'>
                    <p>{block.text}</p>
                </div>
            </div>
    }
    // new, update, delete, stop, etc
    return (
        <div>
            test
        </div>
    )
};
