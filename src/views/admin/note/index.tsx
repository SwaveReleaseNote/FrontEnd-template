import React, { useState, useRef, useEffect, Component, KeyboardEvent, ChangeEvent, useLayoutEffect, FormEvent } from 'react'
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
import InputText from './components/InputText';

export default function Index() {

  const mockLatestVersion = "3.6.5";

  return (
    <div className="h-full grid-cols-1 gap-5 2xl:grid-cols-3">
      {/* 제목 자동으로 받아오기 */}
      <div className="ml-5 mt-5 text-2xl font-bold">
        <p> Release Note Version <span className="text-navy-600">4.0.1</span></p>
      </div>
      <div className="flex justify-between col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* Text 작성 파트 */}
        <InputText />
        {/* 버전, 날짜 생성 카드 사이드 메뉴 바 */}
        <SideMenubar width={280}>
          <div className="mt-5 flex-row justify-center h-auto ">
            <Version latestVersion={mockLatestVersion} />
            <Date />
          </div>
        </SideMenubar>
      </div>
    </div>
  )
}
