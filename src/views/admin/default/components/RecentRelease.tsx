import Card from '../../../../components/card';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from './LoadingComponent ';
import api from 'context/api';

import New from 'assets/img/label/NEW.png';
import Update from 'assets/img/label/UPDATE.png';
import Delete from 'assets/img/label/DELETE.png';
import Stop from 'assets/img/label/STOP.png';
import Etc from 'assets/img/label/ETC.png';

interface Contexts {
   context: string;
   index: number;
   tag: string;
}

interface Blocks {
   contexts: Contexts[];
   label: string;
}

interface Comment {
   context: string;
   lastModifiedDate: string;
   name: string;
   releaseNoteId: number;
   version: string;
}

interface RecentReleaseNote {
   count: number;
   creator: string;
   lastModified: string;
   liked: number;
   releaseDate: string;
   releaseNoteId: number;
   summary: string;
   version: string;
   comment: Comment[];
   blocks: Blocks[];
   // 어떤 프로젝트의 릴리즈 노트인지?
}

const RecentRelease = (): JSX.Element => {
   const [recentReleaseNote, setRecentReleaseNote] = useState<RecentReleaseNote | any>(); // Set initial state as undefined
   const [isLoading, setIsLoading] = useState(true);
   const navigate = useNavigate();

   // fetch All Members
   const fetchRecentReleaseNote = async (): Promise<void> => {
      try {
         const response = await api.get(`project/release-note/recent-release-note`);

         console.log('recentRelease: ', JSON.stringify(response.data, null, '\t'));
         setRecentReleaseNote(response.data);
      } catch (error) {
         console.error('Error fetching recent release note:', error);
         console.log('Mocking');
         mockFetchRecentRelease();
      } finally {
         setIsLoading(false); // Set loading state to false after fetching
      }
   };

   const mockFetchRecentRelease = (): void => {
      // Simulate API response with mock data
      const mockResponse: RecentReleaseNote = {
         blocks: [
            {
               contexts: [
                  {
                     context:
                        'Added support for new Wasm runtimes: slight, spin, and wasmtime. Users can download Wasm runtimes on demand when the containerd image store is enabled.',
                     index: 2,
                     tag: 'H1',
                  },
                  {
                     context: 'Added Rust server support to Docker init.',
                     index: 3,
                     tag: 'H1',
                  },
                  {
                     context:
                        'Beta release of the Builds view that lets you inspect builds and manage builders. This can be found in the Features in Development tab in Settings.',
                     index: 4,
                     tag: 'H1',
                  },
               ],
               label: 'New',
            },
            {
               contexts: [
                  {
                     context: 'Buildx v0.10.4',
                     index: 6,
                     tag: 'H1',
                  },
                  {
                     context: 'Compose 2.17.2',
                     index: 7,
                     tag: 'H1',
                  },
                  {
                     context: 'Containerd v1.6.18, which includes fixes for CVE-2023-25153 and CVE-2023-25173.',
                     index: 8,
                     tag: 'H1',
                  },
               ],
               label: 'Update',
            },
         ],
         comment: [
            {
               context: 'ASUS도 너프 해야한다.',
               lastModifiedDate: '2023-07-08',
               name: '김성국',
               releaseNoteId: 25,
               version: '1.0.0',
            },
            {
               context: 'ASUS도 너프 해야한다.',
               lastModifiedDate: '2023-07-08',
               name: '김성국',
               releaseNoteId: 25,
               version: '1.0.0',
            },
            {
               context: 'ASUS도 너프 해야한다.',
               lastModifiedDate: '2023-07-08',
               name: '김성국',
               releaseNoteId: 25,
               version: '1.0.0',
            },
            {
               context: 'ASUS도 너프 해야한다.',
               lastModifiedDate: '2023-07-08',
               name: '김성국',
               releaseNoteId: 25,
               version: '1.0.0',
            },
         ],
         count: 3,
         creator: '전강훈',
         lastModified: '2023-07-09',
         liked: 15,
         releaseDate: '2023-07-08',
         releaseNoteId: 1,
         summary: 'DELL의 성능을 조정했습니다.',
         version: '1.0.0',
      };

      setRecentReleaseNote(mockResponse);
   };

   // First Rendering
   useEffect(() => {
      console.log('Recent Release Page rendered');
      fetchRecentReleaseNote().catch(error => {
         console.error('error fetch data', error);
      });
   }, []);

   function handleClickRecentRelease(releaseNoteId: number): void {
      // 추후 프론트 릴리즈 노트 보여주는 곳으로 맵핑
      const url = `/admin/project/releaseNote?releaseNoteId=${releaseNoteId}`;

      navigate(url);
      console.log('handleClickRecentRelease');
   }

   const labelToIconMap: Record<string, string> = {
      New,
      Delete,
      Update,
      Stop,
      Etc,
   };

   return (
      <>
         {isLoading ? (
            <LoadingComponent fontSize="m" />
         ) : (
            <Card extra={'w-full h-full p-3 mt-2'}>
               <div className="mb-8 mt-2 w-full">
                  <p className="text-xl font-bold text-navy-700 dark:text-white">
                     <p className="text-4xl">🆕Recent Release Note</p>
                  </p>
                  {recentReleaseNote !== '' ? (
                     <div className="m-5">
                        <p
                           onClick={() => {
                              handleClickRecentRelease(recentReleaseNote?.releaseNoteId);
                           }}
                           className="text-3xl font-bold text-blue-600 hover:cursor-pointer hover:underline dark:text-white">
                           <h1 className="h-auto text-5xl font-extrabold leading-none tracking-tight text-navy-700 dark:text-white">
                              <span className="text-blue-700 dark:text-blue-500">{recentReleaseNote?.version}</span>{' '}
                              Release Note
                           </h1>
                        </p>
                        <p className="ml-10 mt-4 text-xl font-bold dark:text-white">{recentReleaseNote?.summary}</p>
                        <div className=" text-gray-500 mt-5 mb-2">
                           <p className="text-l font-bold dark:text-white">작성자: {recentReleaseNote?.creator}</p>
                           <p className="text-l font-bold dark:text-white">
                              최종 수정: {recentReleaseNote?.lastModified}
                           </p>
                           <p className="text-l font-bold dark:text-white">
                              배포 날짜: {recentReleaseNote?.releaseDate}
                           </p>
                        </div>
                        <div className="overflow-y-scroll">
                           {recentReleaseNote?.blocks?.length > 0 ? (
                              recentReleaseNote?.blocks?.map((block: Blocks) => (
                                 <div className="m-4 mt-8 w-[95%]" key={block.label}>
                                    <img
                                       src={labelToIconMap[block.label]}
                                       alt={block.label}
                                       className="h-[5vh] w-[10vh] rounded-xl"
                                    />
                                    {block.contexts.length > 0 ? (
                                       block.contexts.map((context: Contexts) => (
                                          <div className="ml-10 mt-4 w-[90%]" key={context.index}>
                                             <p className="text-l font-bold text-navy-700 dark:text-white">
                                                • {context.context}
                                             </p>
                                             <p className="text-l font-bold text-navy-700 dark:text-white">
                                                {/* {context.tag} */}
                                             </p>
                                          </div>
                                       ))
                                    ) : (
                                       <p>작성된 내용이 없습니다</p>
                                    )}
                                 </div>
                              ))
                           ) : (
                              <p>작성된 블록이 없습니다</p>
                           )}
                        </div>
                        <p className="mt-10 mb-2 text-xl font-bold text-navy-700 dark:text-white">
                           👍{recentReleaseNote.liked}
                        </p>
                        <div className="overflow-y-scroll w-full h-[30vh]">
                           {recentReleaseNote?.comment?.length > 0 ? (
                              recentReleaseNote?.comment?.map((comment: Comment) => (
                                 <div className="mb-8 mt-2" key={comment.lastModifiedDate}>
                                    <p className="text-l  font-bold text-navy-700 dark:text-white">
                                       {comment.name}: {comment.context}
                                    </p>
                                    <p className="mt-2  text-base text-gray-600">{comment.lastModifiedDate}</p>
                                 </div>
                              ))
                           ) : (
                              <p>댓글이 없습니다</p>
                           )}
                        </div>
                     </div>
                  ) : (
                     <div className="w-[100%] h-[20vh] flex items-center justify-center text-3xl font-bold">
                        작성된 릴리즈 노트가 없습니다..😭
                     </div>
                  )}
               </div>
            </Card>
         )}
      </>
   );
};

export default RecentRelease;
