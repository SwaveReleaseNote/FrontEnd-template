import React from 'react'
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

export default function index() {
  const latestVersion = "3.6.5";
  console.log(latestVersion);
  return (
    <div className="h-full grid-cols-1 gap-5 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        
        {/* 버전, 날짜 생성 카드 */}
        <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
          
          <Version latestVersion={latestVersion}/> 
          <Date />
        </div>

        {/* Input Text */}
        <div>
          Input Text
        </div>
      </div>
      {/* right side section */}

      {/* <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
      </div> */}
    </div>
  )
}
