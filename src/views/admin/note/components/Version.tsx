/*eslint-disable*/
import Card from 'components/card';
import React, {SetStateAction, useEffect, useState} from 'react'
import {useRecoilState} from "recoil";
import {createNoteFieldForm} from "../../../../context/atom";

// 선언하고 사용안한 오류
// interface RowObj {
//   name: string;
//   tech: any;
//   date: string;
//   progress: number;
// }

export default function Version(props: {
    recentVersion: string,
    updateVersion: string,
    setUpdateVersion: React.Dispatch<SetStateAction<string>>
}): JSX.Element {
    // 최신 버전 받아오기
    const {updateVersion} = props;

    const [noteField, setNoteField] = useRecoilState(createNoteFieldForm)
    const [isActiveMajor, setIsActiveMajor] = useState<boolean>(false)
    const [isActiveMinor, setIsActiveMinor] = useState<boolean>(false)
    const [isActivePatch, setIsActivePatch] = useState<boolean>(false)
    const [major, setMajor] = useState<number>(0);
    const [minor, setMinor] = useState<number>(0);
    const [patch, setPatch] = useState<number>(0);

    // 버전 Major Minor Patch 파싱 후 세팅
    useEffect(() => {
        console.log("useEffect", major, minor, patch);
        console.log("props.recentVersion", props.recentVersion);
        const split = props.recentVersion.split(".", 3);
        console.log(split);

        setMajor(+split[0]);
        setMinor(+split[1]);
        setPatch(+split[2]);
    }, []);

    const nextMajor = (major + 1).toString() + '.0.1'
    const nextMinor = major.toString() + '.' + (minor + 1).toString() + '.1';
    const nextPatch = major.toString() + '.' + minor.toString() + '.' + (patch + 1).toString();

    // note field 에 선택한 next version 누르기
    const handleClickNextVersion = (nextVersion: string, event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        switch (nextVersion) {
            case 'Major':
                props.setUpdateVersion(nextMajor)
                break;
            case 'Minor':
                props.setUpdateVersion(nextMinor)
                break;
            case 'Patch':
                props.setUpdateVersion(nextPatch)
                break;
        }
    }

    const handleClickMajor = (event: React.MouseEvent<HTMLButtonElement>) => {
        // 색상 진하게
        if (isActiveMinor || isActivePatch) {
            setIsActiveMinor(false)
            setIsActivePatch(false)
        }
        setIsActiveMajor(true)

        handleClickNextVersion('Major', event)
    }

    const handleClickMinor = (event: React.MouseEvent<HTMLButtonElement>) => {
        // 색상 진하게
        if (isActiveMajor || isActivePatch) {
            setIsActiveMajor(false)
            setIsActivePatch(false)
        }
        setIsActiveMinor(true)

        handleClickNextVersion('Minor', event)

    }

    const handleClickPatch = (event: React.MouseEvent<HTMLButtonElement>) => {
        // 색상 진하게
        if (isActiveMinor || isActiveMajor) {
            setIsActiveMinor(false)
            setIsActiveMajor(false)
        }
        setIsActivePatch(true)
        handleClickNextVersion('Patch', event)

    }

    return (
        <Card extra={"w-full p-4 h-full mb-4"}>
            <div className=' flex flex-col items-center'>
                <header className="relative flex items-center justify-between pt-4">
                    <div className="text-2xl font-bold text-navy-700 dark:text-white">
                        Select Next Version
                    </div>
                </header>
                {/* <hr className=' h-1 mt-3 mb-2 rounded bg-gray-200 dark:text-gray-400'/> */}
                <p className='mt-3 text-lg font-medium text-gray-800 dark:text-white'>Current Version
                    <span className='text-blue-700 dark:text-blue-500'> {props.recentVersion}</span></p>
                <div className='grid grid-cols-2 w-[80%] text-center justify-between mt-5 mb-3 font-extrabold leading-none tracking-tight
        dark:text-white text-gray-800'>
                    <div className=''>
                        TYPE
                    </div>
                    <div>
                        NEXT VERSION
                    </div>
                </div>
                <hr className='flex w-full mb-5 dark:text-gray-800'/>
                {/* 선택지 부분 */}
                {/* TODO: Element로 만들어서 map으로 코드 단순화하기 */}
                <div className=' w-[80%] justify-between grid grid-cols-2 text-center m-'>
                    <div className=' hover:cursor-pointer text-gray-400 grid-cols-1'>
                        <div>
                            <button
                                onClick={event => handleClickMajor(event)}
                                className={`${isActiveMajor ? 'font-bold text-blue-900' : null} hover:text-blue-900 `}
                            >
                                Major
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={event => handleClickMinor(event)}
                                className={`${isActiveMinor ? 'font-bold text-blue-900' : null} hover:text-blue-900 `}
                            >
                                Minor
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={event => handleClickPatch(event)}
                                className={`${isActivePatch ? 'font-bold text-blue-900' : null} hover:text-blue-900 `}
                            >
                                Patch
                            </button>
                        </div>
                    </div>
                    <div className=' text-gray-400 grid-cols-2'>
                        <div className={`${isActiveMajor ? 'font-bold text-blue-900' : null} hover:text-blue-900 `}>
                            <span>{nextMajor}</span>
                        </div>
                        <div className={`${isActiveMinor ? 'font-bold text-blue-900' : null} hover:text-blue-900 `}>
                            <span>{nextMinor}</span>
                        </div>
                        <div className={`${isActivePatch ? 'font-bold text-blue-900' : null} hover:text-blue-900 `}>
                            <span>{nextPatch}</span>
                        </div>
                    </div>
                </div>

            </div>
        </Card>
    )
}