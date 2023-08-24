/*eslint-disable*/
import React, {useEffect} from "react";
import NoteField from "components/note/NoteField";
import {useRecoilState, useRecoilValue} from "recoil";
import {noteFieldState, noteIdState} from "../../../context/atom";
import data from "../../../components/label/mockData/NoteFiledMockData.json"
import api from "../../../context/api";
import { useLocation } from "react-router-dom";

const ReleaseNote = (): JSX.Element => {
    const [selectNote, setSelectNote] = useRecoilState(noteFieldState)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const releaseNoteId: string | null = searchParams.get('releaseNoteId');

    // 리코일을 사용하여 릴리즈 노트 클릭했을때 해당 릴리즈 노트로 가도록 설정
    useEffect(() => {
        const fetchNote = async (): Promise<void> => {
            try {
                console.log("releaseNoteId", releaseNoteId);
                const response = await api.get(`project/release-note/${releaseNoteId}`)
                const fetchData = response.data
                setSelectNote(fetchData)

                console.log(releaseNoteId + " 릴리즈 노트 데이터 가져옴")

                // todo: 라우팅 해주자?
            } catch (error) {
                console.error(error)
            }
        }

        fetchNote().catch(error => {
            console.log(error)
        });

    }, [releaseNoteId]);

    console.log("여기까지는 리렌더링 아님~")
    return (
        <div className="h-full grid-cols-1 gap-5 2xl:grid-cols-3">
            <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
                <div className=" z-20 grid grid-cols-1">
                    <NoteField note={selectNote.version}/>
                </div>
            </div>
            {/* right side section */}

            {/* <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
      </div> */}
        </div>
    );
};

export default ReleaseNote;