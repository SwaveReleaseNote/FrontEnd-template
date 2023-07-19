import React, { useState, useRef, useEffect } from 'react'
import NoteField from 'components/note/NoteField'
import tableDataDevelopment from "../tables/variables/tableDataDevelopment";
import tableDataCheck from "../tables/variables/tableDataCheck";
import CheckTable from "../tables/components/CheckTable";
import tableDataColumns from "../tables/variables/tableDataColumns";
import tableDataComplex from "../tables/variables/tableDataComplex";
import DevelopmentTable from "../tables/components/DevelopmentTable";
import ColumnsTable from "../tables/components/ColumnsTable";
import ComplexTable from "../tables/components/ComplexTable";
import Version from './components/Version';
import Date from './components/Date';
import SideMenubar from './components/SideMenubar';

export default function index() {

  const mockLatestVersion = "3.6.5";
    
  return (
    <div className="h-full grid-cols-1 gap-5 2xl:grid-cols-3">
      <div className="flex justify-between col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <div className='mt-5 w-full'>
          <textarea placeholder='test'></textarea>
        </div>
        {/* 버전, 날짜 생성 카드 */}
        <SideMenubar width={280}>
          <div className="mt-5 flex-row justify-center h-auto ">
            <Version latestVersion={mockLatestVersion}/> 
            <Date />
          </div>
        </SideMenubar>
      </div>
    </div>
  )
}
