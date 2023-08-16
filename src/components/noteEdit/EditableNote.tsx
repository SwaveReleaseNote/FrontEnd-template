/*eslint-disable*/
import React, {useState} from "react"
import Version from "../../views/admin/note/components/Version";
import Date from "../../views/admin/note/components/Date";
import SideMenubar from "../../views/admin/note/components/SideMenubar";
import InputText from "./InputText";

function EditableNote() {

    const mockLatestVersion = "3.6.5"

    return (
        <div className="h-full grid-cols-3 gap-5 2xl:grid-cols-3">
            {/*제목 자동으로 받아오기*/}
            <div className="flex items-center justify-between">
                <p className="ml-5 mt-5 text-2xl font-bold"> Release Note Version <span
                    className="text-navy-600">4.0.1</span></p>
                <div>
                    <SideMenubar width={350}>
                        <div className="mt-5 flex-col justify-center h-auto ">
                            <Version latestVersion={mockLatestVersion}/>
                            <Date/>
                        </div>
                    </SideMenubar>
                </div>
            </div>

            {/*사이드 메뉴 바 : 버전 날짜 생성 카*/}

            {/*text 작성 부분*/}
            <div className="flex justify-between col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
                <InputText/>
            </div>

        </div>
    )
}

export default EditableNote;
