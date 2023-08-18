/*eslint-disable*/

import React, { MouseEvent, useEffect, useState } from 'react';
import api from '../../../context/api';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import projectsMockData from '../mockData/noteListData.json';
import noteMockData from '../../label/mockData/NoteFiledMockData.json';
import { RecoilLoadable, useRecoilState } from 'recoil';
import { noteFieldState, noteIdState, projectIdState } from '../../../context/atom';
import routes from '../../../routes';
import DashIcon from '../../icons/DashIcon';
import { MdOutlineShoppingCart } from 'react-icons/md';
import ReleaseNote from '../../../views/admin/marketplace';
import LoadingComponent from 'views/admin/default/components/LoadingComponent ';

interface Note {
   version: string;
   releaseNoteId: number;
}

interface Project {
   projectId: number;
   projectName: string;
   releaseNoteVersionList: Note[];
   isSubscribe: boolean;
}

interface Route {
   name: string;
   layout: string;
   path: string;
   icon: JSX.Element;
   component: JSX.Element;
   secondary: true;
}

function ProjectList(): JSX.Element {
   const location = useLocation();

   const noteRoute: Route = {
      name: 'Release Note',
      layout: '/admin',
      path: 'release-note',
      icon: <MdOutlineShoppingCart className="h-6 w-6" />,
      component: <ReleaseNote />,
      secondary: true,
   }; // ReleaseNote 컴포넌트

   const activeRoute = (routeName: string) => {
      return location.pathname.includes(routeName);
   };

   const [projects, setProjects] = useState<Project[]>();
   const [selectedProject, setSelectedProject] = useState<Project>();
   const [selectedProjectId, setSelectedProjectId] = useRecoilState(projectIdState);
   const [selectNote, setSelectNote] = useRecoilState(noteFieldState);
   const [selectNoteId, setSelectNoteId] = useRecoilState(noteIdState);
   const [isSelect, setIsSelect] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const navigate = useNavigate();

   // api 로 받아온 데이터를 projects에 넣어준다
   useEffect(() => {
      const fetchProjects = async (): Promise<void> => {
         try {
            const response = await api.get('project/release-note/version-list');
            const projectList = response.data;
            console.log('프로젝트 리스트를 받아옵니다');
            console.log('projectList', projectList);
            setProjects(projectList);
            setSelectedProject(projectList[0]);
         } catch (error) {
            console.error(error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchProjects().catch(error => {
         console.error('Error fetching project sidebar list:', error);
      });
   }, [location]);

   useEffect(() => {}, [isLoading]);

   // // Mock Data Test
   // useEffect(() => {
   //     setProjects(projectsMockData.projects)
   //     console.log("프로젝트 set 되는 useEffect 실행됨~")
   // }, []);

   const handleSelectProject = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      console.log('select 클릭함');
      projects?.map(p => {
         p.projectName === event.target.value ? setSelectedProject(p) : null;
         setSelectedProjectId(p.projectId);
      });
      setIsSelect(true);
   };

   const handleSelectNote = (id: number) => {
      console.log('선택된 노트의 id = ' + id);
      const queryString = `releaseNoteId=${id}`;
      const url = `/admin/release-note?${queryString}`;
      navigate(url);
   };

   return (
      <div className="bg-gray-50 dark:bg-gray-800">
         <ul className="space-y-2 font-medium">
            <li>
               {/* 프로젝트 리스트 옵션 부분 */}
               <select
                  className='text-2xl text-center w-[20vh] font-bold h-[5vh] border-rounded-xl'
                  onChange={event => handleSelectProject(event)}
                  placeholder="프로젝트를 선택해주세요"
                  value={selectedProject?.projectName}>
                  {projects?.map(projectOptions => (
                     <option
                        className="font-bold text-navy-700 dark:text-white leading-1 ml-4 flex"
                        value={projectOptions.projectName}
                        key={projectOptions.projectId}>
                        {projectOptions.projectName}
                     </option>
                  ))}
               </select>
            </li>

            <li>
               {/* TODO: 크기 고정해야합니다 */}
               <div className="text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"></div>
            </li>
         </ul>

         <div className="align-middle w-[20vh] h-[40vh] overflow-auto">
            {isLoading ? (
               <LoadingComponent />
            ) : (
               <div>
                  {/*릴리즈 노트 리스트*/}
                  {
                  selectedProject?.releaseNoteVersionList.map(note => (
                     <div>
                        <Link
                           onClick={() => handleSelectNote(note.releaseNoteId)}
                           key={note.releaseNoteId}
                           to={noteRoute.layout + '/' + noteRoute.path + '/' + note.releaseNoteId}>
                           <ul className="relative mb-3 flex hover:cursor-pointer">
                              <li className="flex cursor-pointer items-center ml-5 text-xl">
                                 <div className="m-2 font-bold text-brand-500 dark:text-white">
                                    {noteRoute.icon ? noteRoute.icon : <DashIcon />}{' '}
                                 </div>
                                 <div className="font-bold text-navy-700 dark:text-white">{note.version}</div>
                              </li>
                              {activeRoute(noteRoute.path + '/' + note.releaseNoteId) ? (
                                 <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
                              ) : null}
                           </ul>
                        </Link>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
}

export default ProjectList;
