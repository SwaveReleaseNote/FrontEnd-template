import Card from 'components/card';
import CardMenu from 'components/card/CardMenu';
import React, { useEffect, useState } from 'react'
import { createColumnHelper, useReactTable } from '@tanstack/react-table';

type RowObj = {
  name: string;
  tech: any;
  date: string;
  progress: number;
};

export default function Version(props: { latestVersion: string }) {
  // 최신 버전 받아오기
  const { latestVersion } = props;

  const [major, setMajor] = useState<number>();
  const [minor, setMinor] = useState<number>();
  const [patch, setPatch] = useState<number>();

  // 버전 Major Minor Patch 파싱 후 세팅
  useEffect(() => {
    const split = latestVersion.split(".", 3);
    console.log(split);

    setMajor(+split[0]);
    setMinor(+split[1]);
    setPatch(+split[2]);
  }, []);

  const handleClickType = () => {
    // 색상 진하게

    // Version 저장

  }

  console.log(major, minor, patch);

  return (
    <Card extra={"w-full p-4 h-full mb-4"}>
      <div className=' flex flex-col items-center'>
        <header className="relative flex items-center justify-between pt-4">
          <div className="text-2xl font-bold text-navy-700 dark:text-white">
            Version Card Test
          </div>
        </header>
        {/* <hr className=' h-1 mt-3 mb-2 rounded bg-gray-200 dark:text-gray-400'/> */}
        <p className='mt-3 text-lg font-medium text-gray-800 dark:text-white'>Current Version
          <span className='text-blue-700 dark:text-blue-500'> {latestVersion}</span></p>
        <div className='grid grid-cols-2 w-[80%] text-center justify-between mt-5 mb-3 font-extrabold leading-none tracking-tight 
        dark:text-white text-gray-800'>
          <div className=''>
            TYPE
          </div>
          <div>
            NEXT VERSION
          </div>
        </div>
        <hr className='flex w-full mb-5 dark:text-gray-800' />
        {/* 선택지 부분 */}
        {/* TODO: Element로 만들어서 map으로 코드 단순화하기 */}
        <div className=' w-[80%] justify-between grid grid-cols-2 text-center m-'>
          <div className=' hover:cursor-pointer text-gray-400 grid-cols-1'>
            <div onClick={handleClickType}><button>Major</button></div>
            <div onClick={handleClickType}><button>Minor</button></div>
            <div onClick={handleClickType}><button>Patch</button></div>
          </div>
          <div className=' text-gray-400 grid-cols-2'>
            <div>
              <span>{major + 1}.0.1</span>
            </div>
            <div>
              <span>{major}.{minor + 1}.1</span>
            </div>
            <div>
              <span>{major}.{minor}.{patch + 1}</span>
            </div>
          </div>
        </div> 
       
      </div>
    </Card>
  )
}