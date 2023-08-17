/*eslint-disable*/
import React, {useEffect, useState} from "react"
import Version from "../../views/admin/note/components/Version";
import Date from "../../views/admin/note/components/Date";
import SideMenubar from "../../views/admin/note/components/SideMenubar";
import InputText from "./InputText";
import {useRecoilState, useRecoilValue} from "recoil";
import {blockState, createNoteFieldForm, dateState, noteFieldState, projectIdState} from "../../context/atom";
import api from "../../context/api";
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface context {
    context: string,
    index: number,
    tag: string
}

interface block {
    contexts: context[],
    label: string
}

interface note {
    blocks : block[],
    releaseDate : string,
    version: string
}

function EditableNote() {
    const navigate = useNavigate();
    const [latestVersion, setLatestVersion] = useState<string>('');
    const [noteFieldForm, setNoteFieldForm] = useRecoilState(createNoteFieldForm)
    const [date, setDate] = useRecoilState(dateState);
    const [blocks, setBlocks] = useRecoilState(blockState)
    const [note, setNote] = useState<note>({
        blocks: [{
            contexts: [{
                context: '',
                index: 0,
                tag: ''
            }],
            label:''
        }],
        releaseDate: '',
        version: ''
    });

    const fetchLatestNote = async () : Promise<void> => {
        try {
            const response =  await api.get('project/release-note/recent-release-note')
            const fetchData = response.data
            setLatestVersion(fetchData)

            console.log("최신 릴리즈 노트 버전 : ", latestVersion)
        }
        catch (error) {
            console.log(error)
        }

        fetchLatestNote().catch(error => {
            console.log(error)
        })
    }

    // recoil 에 버전 데이터 넣기 todo : useEffect 로 전체 갈아끼우자
    useEffect(() => {
        const tmpNote = {
            blocks: blocks,
            releaseDate: date,
            version: latestVersion
        }
        setNote(tmpNote)
        setNoteFieldForm(note)
    }, [blocks, latestVersion, date]);

    const handleClickCreateButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(noteFieldForm)
    }

    const [projectId, setProjectId] = useRecoilState(projectIdState)

    const handleSubmitNote = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const response = await api.post(`project/${projectId}/release-note`, noteFieldForm)
            console.log(response.data)

            navigate('../')
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex-col w-full h-full grid-cols-3 gap-5 2xl:grid-cols-3">
            {/*제목 자동으로 받아오기*/}
            <form
                onSubmit={event => handleSubmitNote(event)}
            >
                <div className="flex items-center justify-between">
                    <p className="ml-5 mt-5 text-2xl font-bold"> Release Note Version <span
                        className="text-navy-600">{latestVersion}</span></p>
                    <div>
                        <SideMenubar width={350}>
                            <div className="mt-5 flex-col justify-center h-auto ">
                                <Version currentVersion={'3.6.5'} latestVersion={latestVersion} setLatestVersion={setLatestVersion}/>
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
                <button
                    type="submit"
                    className="flex justify-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                    작성 완료
                </button>
            </form>
        </div>
    )
}

export default EditableNote;
