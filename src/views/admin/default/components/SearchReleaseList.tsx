/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './scrollbar.css';

import { FiSearch } from 'react-icons/fi';
import LoadingComponent from './LoadingComponent ';

import New from 'assets/img/label/NEW.png';
import Delete from 'assets/img/label/DELETE.png';
import Update from 'assets/img/label/UPDATE.png';
import Stop from 'assets/img/label/STOP.png';
import Etc from 'assets/img/label/ETC.png';

import api from 'context/api';
import { useQuery } from 'react-query';

interface Props {
   searchRelease: {
      projectId: number;
      label: string;
   };
}

interface ReleaseList {
   label: string;
   releaseNoteId: number;
   context: string;
   version: string;
}

const SearchReleaseList: React.FC<Props> = ({ searchRelease }) => {
   const navigate = useNavigate();
   const [searchTerm, setSearchTerm] = useState('');
   const [filteredReleaseList, setFilteredReleaseList] = useState<ReleaseList[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   /* 릴리즈 노트 검색 했을 때 다른 페이지로 넘어갈지? 위의 글로버 바와 혼동 생길 수 있음
   const handleKeyDownSearchInput = (event: React.KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === 'Enter') {
         navigate('/admin/release/searchResult', {
            state: {
               searchTerm: { searchTerm },
            },
         });
         setSearchTerm('');
      }
   };
   */

   const handleChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setSearchTerm(event.target.value);
      console.log(searchTerm);
   };

   const labelToIconMap: Record<string, string> = {
      New,
      Delete,
      Update,
      Stop,
      Etc,
   };

   async function fetchData(): Promise<ReleaseList[]> {
      try {
         const response = await api.get(`project/${searchRelease.projectId}/release-note/label/filter`);
         return response.data;
      } catch (error: any) {
         console.error('Error fetching release list:', error);
         let status = error.code;
         if (error.response?.status != null) {
            status = error.response.status;
         }
         navigate(`../error?status=${status as string}`);
         return mockFetchReleaseList();
      }
   }

   function filterReleaseNotes(releaseNotes: ReleaseList[], searchTerm: string, label: string): ReleaseList[] {
      console.log("releaseNotes", releaseNotes[0].context[0]);
      const filteredNotes = releaseNotes.filter(release => release.label === label);

      return filteredNotes?.filter(release => release.context[0].toLowerCase().includes(searchTerm.toLowerCase()));
   }

   const releaseList = useQuery<ReleaseList[]>(['searchRelease', searchRelease.projectId], fetchData);

   useEffect(() => {
      if (releaseList.isSuccess) {
         // Filter the releaseList based on the label value
         const filteredNotes = filterReleaseNotes(releaseList.data, searchTerm, searchRelease.label);
         setFilteredReleaseList(filteredNotes);
         setIsLoading(false);
      }
   }, [releaseList.isSuccess, isLoading, searchRelease.label, searchTerm]);

   const mockFetchReleaseList = (): ReleaseList[] => {
      function generateRandomVersion(): string {
         const x = Math.floor(Math.random() * 10);
         const y = Math.floor(Math.random() * 10);
         const z = Math.floor(Math.random() * 10);
         return `${x}.${y}.${z}`;
      }
      // Simulate API response with mock data
      const mockResponse: ReleaseList[] = [
         {
            label: 'Delete',
            version: generateRandomVersion(),
            releaseNoteId: 1,
            context:
               '시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.',
         },
         {
            label: 'Delete',
            version: generateRandomVersion(),
            releaseNoteId: 2,
            context: '시스템 내에서 악성 코드를 삭제했습니다.',
         },
         {
            label: 'Delete',
            version: generateRandomVersion(),
            releaseNoteId: 3,
            context: '시스템 내에서 악성 코드를 삭제했습니다.',
         },
         {
            label: 'Delete',
            version: generateRandomVersion(),
            releaseNoteId: 4,
            context: '시스템 내에서 악성 코드를 삭제했습니다.',
         },
         {
            label: 'Delete',
            version: generateRandomVersion(),
            releaseNoteId: 5,
            context: '시스템 내에서 악성 코드를 삭제했습니다.',
         },
         {
            label: 'Delete',
            version: generateRandomVersion(),
            releaseNoteId: 6,
            context: '시스템 내에서 악성 코드를 삭제했습니다.',
         },
         {
            label: 'Delete',
            version: generateRandomVersion(),
            releaseNoteId: 7,
            context: '시스템 내에서 악성 코드를 삭제했습니다.',
         },
      ];

      return mockResponse;
   };

   function handleClickReleaseNote(releaseNoteId: number): void {
      // 추후 프론트 릴리즈 노트 보여주는 곳으로 맵핑
      const url = `/admin/project/releaseNote?releaseNoteId=${releaseNoteId}`;

      navigate(url);
      console.log('handleClickReleaseNote');
   }

   return (
      <div
         className={`!z-5 relative my-[5px] flex h-full w-full flex-col rounded-2xl bg-white bg-clip-border px-2 pb-6 pt-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none`}>
         <div className="flex h-[5vh] w-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white">
            <p className="pl-3 pr-2 text-xl">
               <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
            </p>
            <input
               value={searchTerm}
               onChange={handleChangeSearchInput}
               // onKeyDown={handleKeyDownSearchInput}
               type="text"
               placeholder="릴리즈 노트 검색"
               className="block h-full w-full rounded-3xl bg-lightPrimary text-sm text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white"
            />
         </div>

         <table className="mt-2">
            <thead>
               <tr className="!border-px !border-gray-400 text-gray-500">
                  <th className="border-b-[1px] border-gray-200 pb-2 pt-4 text-start">Search Result</th>
               </tr>
            </thead>
         </table>

         {isLoading ? (
            <LoadingComponent fontSize="m" />
         ) : (
            <div className="h-[70vh] overflow-y-auto overflow-x-hidden">
               <table>
                  <tbody>
                     {filteredReleaseList.length === 0 ? (
                        <tr>
                           <td className="py-2 pb-2 pr-4 pt-4 text-start dark:bg-navy-700" colSpan={2}>
                              <img
                                 src={labelToIconMap[searchRelease.label]}
                                 alt={searchRelease.label}
                                 className="h-[5vh] w-[10vh] rounded-xl"
                              />
                              <div className="mt-2 text-black-400 flex h-full w-full items-center justify-center gap-10 text-xl font-bold dark:text-white">
                                 검색된 릴리즈노트가 없습니다!!👻
                              </div>
                           </td>
                        </tr>
                     ) : (
                        filteredReleaseList.map(release => (
                           <tr
                              key={release.version}
                              onClick={() => {
                                 handleClickReleaseNote(release.releaseNoteId);
                              }}
                              className="m-1 mr-3 rounded-2xl p-1 text-blue-600 text-start hover:cursor-pointer hover:underline">
                              <td className="rounded-xl bg-white p-2 text-blue-600 text-start hover:cursor-pointer dark:bg-navy-700">
                                 <div>
                                    <p className="font-bold">Version: {release.version}</p>
                                    <img
                                       src={labelToIconMap[searchRelease.label]}
                                       alt={release.label}
                                       className="mb-1 mt-1 h-[5vh] w-[10vh] rounded-xl"
                                    />
                                 </div>
                                 <div className="h-[6vh] w-[30vh] overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-gray-800 dark:text-white">
                                    {release.context}
                                 </div>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   );
};

export default SearchReleaseList;
