import Version from './components/Version';
import Date from './components/Date';
import SideMenubar from './components/SideMenubar';
import InputText from './components/InputText';
import React, {useState} from 'react';

export default function Index():JSX.Element {

  const mockLatestVersion = "3.6.5";
  const [showSideMenu, setShowSideMenu] = useState<boolean>(false)
  return (
    <div className="h-full grid-cols-1 gap-5 2xl:grid-cols-3">
      {/* 제목 자동으로 받아오기 */}
      <div className="ml-5 mt-5 text-2xl font-bold">
        <p> Release Note Version <span className="text-navy-600">4.0.1</span></p>
      </div>
      <div className="flex justify-between col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* Text 작성 파트 */}
        <InputText />

      </div>
    </div>
  )
}
