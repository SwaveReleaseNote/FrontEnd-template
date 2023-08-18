/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import Version from '../../views/admin/note/components/Version';
import Date from '../../views/admin/note/components/Date';
import SideMenubar from '../../views/admin/note/components/SideMenubar';
import InputText from './InputText';
import { useRecoilState, useRecoilValue } from 'recoil';
import { blockState, createNoteFieldForm, dateState, noteFieldState, projectIdState } from '../../context/atom';
import api from '../../context/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface context {
   context: string;
   index: number;
   tag: string;
}

interface block {
   contexts: context[];
   label: string;
}

interface note {
   blocks: block[];
   releaseDate: string;
   version: string;
}

function EditableNote() {
   const navigate = useNavigate();
   const [updateVersion, setUpdateVersion] = useState<string>('');
   const [recentVersion, setRecentVersion] = useState<string>('');
   const [noteFieldForm, setNoteFieldForm] = useRecoilState(createNoteFieldForm);
   const [date, setDate] = useRecoilState(dateState);
   const [blocks, setBlocks] = useRecoilState(blockState);
   const [projectId, setProjectId] = useRecoilState(projectIdState);

   const [note, setNote] = useState<note>({
      blocks: [
         {
            contexts: [
               {
                  context: '',
                  index: 0,
                  tag: '',
               },
            ],
            label: '',
         },
      ],
      releaseDate: '',
      version: '',
   });

   const fetchLatestNote = async (): Promise<void> => {
      console.log("projectId", projectId);
      try {
         const response = await api.get(`project/${projectId}/last-release-note`);
         const lastReleaseVersion = response.data.version;
         console.log('fetchData : ', lastReleaseVersion);

         // 릴리즈노트가 없다면
         if (lastReleaseVersion === '') {
            setRecentVersion('0.0.0');
         } else {
            setRecentVersion(lastReleaseVersion);
         }
      } catch (error) {
         console.log(error);
         setRecentVersion('0.0.0');
      } finally {
         console.log('최신 릴리즈 노트 버전 : ', recentVersion);
      }
   };

   // recoil 에 버전 데이터 넣기 todo : useEffect 로 전체 갈아끼우자
   useEffect(() => {
      const tmpNote = {
         blocks: blocks,
         releaseDate: date,
         version: updateVersion,
      };
      setNote(tmpNote);
      setNoteFieldForm(note);
      fetchLatestNote();
      console.log("updateVersion", updateVersion);
   }, [blocks, updateVersion, date]);

   const handleClickCreateButton = (event: React.MouseEvent<HTMLButtonElement>) => {
      console.log(noteFieldForm);
   };

   const handleSubmitNote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      try {
         console.log(JSON.stringify(projectId, null, '\t'));
         console.log(JSON.stringify(noteFieldForm, null, '\t'));
         const response = await api.post(`project/${projectId}/release-note`, noteFieldForm);
         console.log(response.data);
      } catch (error) {
         console.log(error);
      } finally {
         navigate('../default');
      }
   };

   return (
      <div className="flex-col w-full h-full grid-cols-3 gap-5 2xl:grid-cols-3">
         {/*제목 자동으로 받아오기*/}
         <form onSubmit={event => handleSubmitNote(event)}>
            <div className="flex items-center justify-between">
               <p className="ml-5 mt-5 text-2xl font-bold">
                  {' '}
                  Release Note Version <span className="text-navy-600">{updateVersion}</span>
               </p>
               <div>
                  <SideMenubar width={350}>
                     <div className="mt-5 flex-col justify-center h-auto ">
                        <Version
                           recentVersion={recentVersion}
                           updateVersion={updateVersion}
                           setUpdateVersion={setUpdateVersion}
                        />
                        <Date />
                     </div>
                  </SideMenubar>
               </div>
            </div>

            {/*사이드 메뉴 바 : 버전 날짜 생성 카*/}

            {/*text 작성 부분*/}
            <div className="flex justify-between col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
               <InputText />
            </div>
            <button
               type="submit"
               className="flex justify-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
               작성 완료
            </button>
         </form>
      </div>
   );
}

export default EditableNote;
