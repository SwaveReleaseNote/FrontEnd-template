/*eslint-disable*/
/**
 * @description 라벨 컴포넌트 : 라벨과 Text를 보여준다
 */
import React from 'react'
import newLabel from '../../assets/img/label/NEW.png'
import updateLabel from '../../assets/img/label/UPDATE.png'
import deleteLabel from '../../assets/img/label/DELETE.png'
import stopLabel from '../../assets/img/label/STOP.png'
import etcLabel from '../../assets/img/label/ETC.png'
import {useRecoilState} from "recoil";
import {noteFieldState} from "../../context/atom";

interface context {
    context: string,
    index: number,
    tag: string
}
interface block {
    contexts: context[],
    label: string
}
export default function LabelIndex(props: {contexts: context[], label: string}):JSX.Element {

    switch (props.label) {
        case 'new':
            return (<div className='my-10'>
                <span>
                    <img className='my-5 rounded-xl w-1/12 max-w-lg shadow-xl' src={newLabel} />
                </span>
                <div className='break-words w-full text-clip mt-2 px-2 inline-block'>
                    {props.contexts.map(context => (
                        <p>{context.context}</p>
                    ))}
                </div>
            </div>)
        case 'update':
            return (<div className='my-10'>
                <span>
                    <img className='my-5 rounded-xl w-1/12 max-w-lg shadow-xl' src={updateLabel} />
                </span>
                <div className=' break-words w-full text-clip mt-2 px-2 inline-block'>
                    {props.contexts.map(context => (
                        <p>{context.context}</p>
                    ))}
                </div>
            </div>)
        case 'delete':
            return (
                <div className='my-10'>
                <span>
                    <img className='my-5 rounded-xl w-1/12 max-w-lg shadow-xl' src={deleteLabel} />
                </span>
                <div className='break-words w-full text-clip mt-2 px-2 inline-block'>
                    {props.contexts.map(context => (
                        <p>{context.context}</p>
                    ))}
                </div>
            </div>
            )
        case 'stop':
            return (
                <div className='my-10'>
                <span>
                    <img className='my-5 rounded-xl w-1/12 max-w-lg shadow-xl' src={stopLabel} />
                </span>
                <div className='break-words w-full text-clip mt-2 px-2 inline-block'>
                    {props.contexts.map(context => (
                        <p>{context.context}</p>
                    ))}
                </div>
            </div>
            )
        case 'etc':
            return (
                <div className='my-10'>
                <span>
                    <img className='my-5 rounded-xl w-1/12 max-w-lg shadow-xl' src={etcLabel} />
                </span>
                <div className='break-words w-full text-clip mt-2 px-2 inline-block'>
                    {props.contexts.map(context => (
                        <p>{context.context}</p>
                    ))}
                </div>
            </div>
            )
    }
    // new, update, delete, stop, etc
    return (
        <div>
        </div>
    )
};
