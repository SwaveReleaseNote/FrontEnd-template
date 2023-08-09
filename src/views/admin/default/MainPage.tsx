// import MiniCalendar from 'components/calendar/MiniCalendar';
// import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
// import TotalSpent from 'views/admin/default/components/TotalSpent';
// import PieChartCard from 'views/admin/default/components/PieChartCard';


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecentRelease from './components/RecentRelease';
import ProjectCard from './components/ProjectCard';

import LoadingComponent from './components/LoadingComponent ';
import api from 'context/api';
import { useQuery } from 'react-query';

enum UserRole {
   Subscriber = 'Subscriber',
   Developer = 'Developer',
   Manager = 'Manager',
   None = 'None'
}

interface Project {
   id: number;
   role: UserRole;
   name: string;
   description: string;
   createDate: string;
   count: number;
   version: string;
}

const MainPage = (): JSX.Element => {
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(true);

   const FIRST_PAGE = 1;
   const [limit] = useState(3);
   const [manageDevelopPage, setManageDevelopPage] = useState(FIRST_PAGE);
   const [subscribePage, setSubscribePage] = useState(FIRST_PAGE);
   const manageDevelopOffset = (manageDevelopPage - FIRST_PAGE) * limit;
   const subscribeOffset = (subscribePage - FIRST_PAGE) * limit;

   const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
   const [managerDeveloperProjectList, setManagerDeveloperProjectList] = useState<Project[]>([]);
   const [subscriberProjectList, setSubscriberProjectList] = useState<Project[]>([]);

   const displayedManageDevelopList = managerDeveloperProjectList.slice(
      manageDevelopOffset,
      manageDevelopOffset + limit,
   );
   const displayedSubscribeList = subscriberProjectList.slice(subscribeOffset, subscribeOffset + limit);

   const fetchProjects = async (): Promise<Project[]> => {
      try {
         const response = await api.get(`projects`);
         return response.data;
      } catch (error) {
         console.error('Error fetching project List:', error);
         console.log('Mocking data');
         return mockFetchProjectList();
      }
   };

   const mockFetchProjectList = (): Project[] => {
      // Simulate API response with mock data
      const mockFetchedProjectList = [
         {
            id: 1,
            role: UserRole.Manager,
            name: 'Manager1',
            description: '사내 릴리즈 노트 공유 시스템',
            createDate: 'Wed Jul 12 2023',
            version: '3.6.7',
            count: 5,
         },
         {
            id: 2,
            role: UserRole.Manager,
            name: 'Manager2',
            description: '사내 릴리즈 노트 공유 시스템',
            createDate: 'Wed Jul 12 2023',
            version: '3.6.7',
            count: 5,
         },
         {
            id: 3,
            role: UserRole.Developer,
            name: 'Developer1',
            description: '사내 릴리즈 노트 공유 시스템',
            createDate: 'Wed Jul 12 2023',
            version: '3.6.7',
            count: 5,
         },
         {
            id: 4,
            role: UserRole.Developer,
            name: 'Developer2',
            description: '사내 릴리즈 노트 공유 시스템',
            createDate: 'Wed Jul 12 2023',
            version: '3.6.7',
            count: 5,
         },
         {
            id: 5,
            role: UserRole.Developer,
            name: 'Developer3',
            description: '사내 릴리즈 노트 공유 시스템',
            createDate: 'Wed Jul 12 2023',
            version: '3.6.7',
            count: 5,
         },
         {
            id: 6,
            role: UserRole.Developer,
            name: 'Developer4',
            description: '사내 릴리즈 노트 공유 시스템',
            createDate: 'Wed Jul 12 2023',
            version: '3.6.7',
            count: 5,
         },
         {
            id: 7,
            role: UserRole.Developer,
            name: 'Developer5',
            description: '사내 릴리즈 노트 공유 시스템',
            createDate: 'Wed Jul 12 2023',
            version: '3.6.7',
            count: 5,
         },
         {
            id: 8,
            role: UserRole.Subscriber,
            name: '사내 릴리즈 노트 공유 시스템',
            description: '사내 릴리즈 노트 공유 시스템',
            createDate: 'Wed Jul 12 2023',
            version: '3.6.7',
            count: 5,
         },
      ];
      return mockFetchedProjectList;
   };

   const projectListQuery = useQuery<Project[]>('projects', fetchProjects);

   useEffect(() => {
      if (projectListQuery.isSuccess) {
         setManagerDeveloperProjectList(
            projectListQuery.data.filter(
               (project: { role: string }) => project.role === UserRole.Manager || project.role === UserRole.Developer,
            ),
         );

         setSubscriberProjectList(
            projectListQuery.data.filter((project: { role: string }) => project.role === UserRole.Subscriber),
         );
         setIsLoading(false);
      }
   }, [projectListQuery.isSuccess, isLoading]);

   const handleClickListTabButton = (): void => {
      console.log('Button Cliked');
      setManageDevelopPage(FIRST_PAGE);
      setSubscribePage(FIRST_PAGE);
      setIsSubscribeOpen(!isSubscribeOpen);
   };

   function handleClickPageButton(change: number): void {
      const manageDevelopLastPage = Math.ceil(managerDeveloperProjectList.length / limit) ?? FIRST_PAGE;
      const subscribeLastPage = Math.ceil(subscriberProjectList.length / limit) ?? FIRST_PAGE;
      if (!isSubscribeOpen) {
         if (manageDevelopPage + change < FIRST_PAGE) {
            setManageDevelopPage(manageDevelopLastPage);
         } else if (manageDevelopPage + change > manageDevelopLastPage) {
            setManageDevelopPage(FIRST_PAGE);
         } else {
            setManageDevelopPage(manageDevelopPage + change);
         }
      } else {
         if (subscribePage + change < FIRST_PAGE || manageDevelopPage + change > subscribeLastPage) {
            setSubscribePage(subscribeLastPage);
         } else if (subscribePage + change > subscribeLastPage) {
            setManageDevelopPage(FIRST_PAGE);
         } else {
            setSubscribePage(subscribePage + change);
         }
      }
   }

   function handleClickProjectCreateButton(): void {
      console.log('project create button clicked');
      navigate('/admin/project/create');
   }

   return (
      <div>
         <div className="pt-3">
            <div>
               <button
                  onClick={handleClickListTabButton}
                  className={`dark:text-white ml-10 rounded-t-3xl font-bold border-l-4 border-r-4 border-t-4 hover:border-indigo-200 ${
                     isSubscribeOpen
                        ? 'bg-white-200  dark:!bg-navy-600'
                        : 'border-l-4  border-r-4 border-t-4 border-indigo-200 bg-gray-100 dark:!bg-navy-700'
                  } p-2`}>
                  Develop
               </button>
               <button
                  onClick={handleClickListTabButton}
                  className={`dark:text-white ml-4 rounded-t-3xl font-bold border-l-4 border-r-4 border-t-4 hover:border-indigo-200 ${
                     isSubscribeOpen
                        ? 'border-l-4  border-r-4 border-t-4 border-indigo-200 bg-gray-100 dark:!bg-navy-700'
                        : 'bg-white-200  dark:!bg-navy-600'
                  } p-2`}>
                  Subsribe
               </button>
            </div>

            <div className="items-right absolute right-[4.5%] top-[17%]">
               <button
                  onClick={handleClickProjectCreateButton}
                  type="button"
                  className="text-black mb-2 mr-2 rounded-3xl bg-gray-200 px-5 py-2.5 text-sm font-bold hover:bg-gray-300 focus:ring-4 focus:ring-blue-300 dark:bg-navy-400 dark:text-white">
                  만들기
               </button>
            </div>
         </div>
         {/* Project Card List */}
         <div className="flex h-[450px] justify-center rounded-3xl bg-gray-100 pt-5 dark:!bg-navy-700">
            <div className="flex items-center">
               <button
                  onClick={() => {
                     handleClickPageButton(-1);
                  }}
                  type="button"
                  className="absolute left-[5%] ml-5 rounded-full bg-indigo-400 p-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:!bg-navy-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg
                     className="h-4 w-4 rotate-180 transform"
                     aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 14 10">
                     <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                     />
                  </svg>
                  <span className="sr-only">Icon description</span>
               </button>
            </div>

            <div className="flex items-center">
               {/* Add Skeleton Loading */}
               {isLoading ? (
                  <div>
                     <LoadingComponent />
                  </div>
               ) : (
                  <div>
                     {!isSubscribeOpen ? (
                        displayedManageDevelopList.length > 0 ? (
                           <div className="flex h-full w-full items-center justify-center gap-10">
                              {displayedManageDevelopList.map(project => (
                                 <ProjectCard
                                    key={project.id}
                                    projectId={project.id}
                                    projectName={project.name}
                                    projectDescription={project.description}
                                    projectMemberNumber={project.count}
                                    projectRecentRelease={project.version}
                                    projectCreateDate={project.createDate}
                                    projectRole={project.role}
                                 />
                              ))}
                           </div>
                        ) : (
                           <div className="text-black-400 flex h-full w-full items-center justify-center gap-10 text-4xl font-bold dark:text-white">
                              참여한 프로젝트가 없습니다!!👻
                           </div>
                        )
                     ) : displayedSubscribeList.length > 0 ? (
                        <div className="flex h-full w-full items-center justify-center gap-10">
                           {displayedSubscribeList.map(project => (
                              <ProjectCard
                                 key={project.id}
                                 projectId={project.id}
                                 projectName={project.name}
                                 projectDescription={project.description}
                                 projectMemberNumber={project.count}
                                 projectRecentRelease={project.version}
                                 projectCreateDate={project.createDate}
                                 projectRole={project.role}
                              />
                           ))}
                        </div>
                     ) : (
                        <div className="flex h-full w-full items-center justify-center gap-10 text-4xl font-bold dark:text-white">
                           구독한 프로젝트가 없습니다!!👻
                        </div>
                     )}
                  </div>
               )}
            </div>

            <div className="flex items-center">
               <button
                  onClick={() => {
                     handleClickPageButton(1);
                  }}
                  type="button"
                  className="absolute right-[5%] mr-5 rounded-full bg-indigo-300 p-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:!bg-navy-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg
                     className="h-4 w-4"
                     aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 14 10">
                     <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                     />
                  </svg>
                  <span className="sr-only">Icon description</span>
               </button>
            </div>
         </div>

         <div>
            <RecentRelease />
         </div>

        
      </div>
   );
};

export default MainPage;