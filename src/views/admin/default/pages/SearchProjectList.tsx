/*eslint-disable*/

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';

import LoadingComponent from '../components/LoadingComponent ';
import api from 'context/api';
import NotificationPopup from '../components/NotificationPopup';

enum UserRole {
   Subscriber = 'Subscriber',
   Developer = 'Developer',
   Manager = 'Manager',
   None = 'None',
}

interface TeamMember {
   userId: number;
   username: string;
   userDepartment: string;
}

interface ProjectInfo {
   id: number;
   name: string;
   description: string;
   managerId: number;
   managerName: string;
   managerDepartment: string;
   teamMembers: TeamMember[];
}

interface SearchResult {
   titleSearch: ProjectInfo[];
   descriptionSearch: ProjectInfo[];
   managerSearch: ProjectInfo[];
   developerSearch: ProjectInfo[];
}

const SearchProjectList: React.FC = () => {
   const navigate = useNavigate();
   const [selectedCheckbox, setSelectedCheckbox] = useState('전체');
   const location = useLocation();
   const [searchTerm, setSearchTerm] = useState('');
   const [showRoleCheck, setShowRoleCheck] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const queryClient = useQueryClient();

   const [searchResults, setSearchResults] = useState<SearchResult | null>(null);

   const fetchSearchResults = async (searchTerm: string): Promise<SearchResult> => {
      try {
         setSearchTerm(searchTerm || '');
         console.log('백에서 데이터 가져오기', searchTerm);
         const response = await api.post(`search/${searchTerm}/open`);
         console.log(response.data);
         return response.data;
      } catch (error: any) {
         console.error('Error fetching search result:', error);
         let status = error.code;
         if (error.response?.status != null) {
            status = error.response.status;
         }
         // navigate(`../error?status=${status as string}`);
         console.log(status);
         return mockFetchSearchResult();
      }
   };

   const fetchUserRole = async (projectId: number): Promise<UserRole> => {
      try {
         const response = await api.get(`project/${projectId}/role`);
         console.log(JSON.stringify(response.data, null, '\t'));
         return response.data;
      } catch (error: any) {
         console.error('Error fetching user role:', error);
         let status = error.code;
         if (error.response?.status != null) {
            status = error.response.status;
         }
         // navigate(`../error?status=${status as string}`);
         console.log(status);
         return mockFetchUserRole();
      }
   };

   const mockFetchUserRole = (): UserRole => {
      return UserRole.None;
   };

   const mockFetchSearchResult = (): SearchResult => {
      // Simulate API response with mock data
      const mockResponse: SearchResult = {
         titleSearch: [],
         descriptionSearch: [
            {
               id: 4,
               name: '개요 검색 프로젝트 1',
               description: '멍멍이 관리 프로젝트',
               managerId: 1,
               managerName: '김기현',
               managerDepartment: 'Project Manager',
               teamMembers: [
                  { userId: 2, username: '김성국', userDepartment: 'Architecture' },
                  { userId: 3, username: '함건욱', userDepartment: 'Backend' },
               ],
            },
            {
               id: 5,
               name: '개요 검색 프로젝트 2',
               description: '멍멍이 밥주기 프로젝트',
               managerId: 2,
               managerName: '함건욱',
               managerDepartment: 'Backend',
               teamMembers: [
                  { userId: 2, username: '김성국', userDepartment: 'Architecture' },
                  {
                     userId: 3,
                     username: '김기현',
                     userDepartment: 'Project Manager',
                  },
               ],
            },
            {
               id: 6,
               name: '개요 검색 프로젝트 3',
               description: '멍멍이 vs 고양이',
               managerId: 3,
               managerName: '함건욱',
               managerDepartment: 'Backend',
               teamMembers: [
                  { userId: 2, username: '김성국', userDepartment: 'Architecture' },
                  {
                     userId: 3,
                     username: '김기현',
                     userDepartment: 'Project Manager',
                  },
               ],
            },
         ],
         managerSearch: [
            {
               id: 7,
               name: '관리자 검색 프로젝트 1',
               description: '관리자 검색 프로젝트 1',
               managerId: 1,
               managerName: '멍멍이',
               managerDepartment: 'Project Manager',
               teamMembers: [
                  { userId: 2, username: '김성국', userDepartment: 'Architecture' },
                  { userId: 3, username: '함건욱', userDepartment: 'Backend' },
               ],
            },
         ],
         developerSearch: [
            {
               id: 10,
               name: '개발자 검색 프로젝트 1',
               description: '개발자 검색 프로젝트 1',
               managerId: 1,
               managerName: '김기현',
               managerDepartment: 'Project Manager',
               teamMembers: [
                  { userId: 2, username: '멍멍이', userDepartment: 'Architecture' },
                  { userId: 3, username: '함건욱', userDepartment: 'Backend' },
               ],
            },
            {
               id: 11,
               name: '개발자 검색 프로젝트 2',
               description: '개발자 검색 프로젝트 2',
               managerId: 2,
               managerName: '함건욱',
               managerDepartment: 'Backend',
               teamMembers: [
                  { userId: 2, username: '김성국', userDepartment: 'Architecture' },
                  {
                     userId: 3,
                     username: '멍멍이',
                     userDepartment: 'Project Manager',
                  },
               ],
            },
            {
               id: 12,
               name: '개발자 검색 프로젝트 3',
               description: '개발자 검색 프로젝트 3',
               managerId: 3,
               managerName: '함건욱',
               managerDepartment: 'Backend',
               teamMembers: [
                  { userId: 2, username: '멍멍이', userDepartment: 'Architecture' },
                  {
                     userId: 3,
                     username: '김기현',
                     userDepartment: 'Project Manager',
                  },
               ],
            },
         ],
      };

      return mockResponse;
   };

   // Use the useQuery hook to fetch data
   // const searchResultQuery = useQuery(['searchResults', searchTerm], async () => await fetchSearchResults(searchTerm));

   useEffect(() => {
      if (location.state.searchTerm != null) {
         setSearchTerm(location.state.searchTerm);
         console.log('검색 결과 페이지', location.state.searchTerm);
         const fetchData = async () => {
            setIsLoading(true);
            const results = await fetchSearchResults(location.state.searchTerm);
            setSearchResults(results);
            setIsLoading(false);
         };
         fetchData();
      }
   }, [isLoading, searchTerm, location.state.searchTerm, ]);

   const handleClickProjectName = async (projectId: number, projectName: string): Promise<void> => {
      try {
         console.log('click project', projectId);
         console.log('click project', projectName);
         const userRoleResponse = await fetchUserRole(projectId);
         if (userRoleResponse === UserRole.None) {
            setShowRoleCheck(true);
         } else {
            const queryString = `projectId=${projectId}&projectName=${projectName}`;
            const url = `/admin/dashboard?${queryString}`;

            navigate(url);
         }
      } catch (error: any) {
         console.error('Error fetching user role:', error);
         let status = error.code;
         if (error.response?.status != null) {
            status = error.response.status;
         }
         navigate(`../error?status=${status as string}`);
         alert('Server error. Please try again.');
      }
   };

   const handleCheckboxChange = (value: string): void => {
      setSelectedCheckbox(value);
   };

   const handleClickYes = async (projectId: number, projectName: string): Promise<void> => {
      try {
         console.log('projectId', projectId);
         console.log('projectName', projectName);
         const response = await api.post(`project/${projectId}/subscribe`);
         console.log('response', response);
         const queryString = `projectId=${projectId}&projectName=${projectName}`;
         const url = `/admin/dashboard?${queryString}`;
         await queryClient.refetchQueries('projects');
         navigate(url);
      } catch (error: any) {
         console.error('Error Subscribe project:', error);
         let status = error.code;
         if (error.response?.status != null) {
            status = error.response.status;
         }
         navigate(`../error?status=${status as string}`);
      } finally {
         setShowRoleCheck(false);
      }
   };

   const handleClickNo = (): void => {
      setShowRoleCheck(false);
   };

   const renderProjects = (projects: ProjectInfo[], searchTerm: string, searchType: string): JSX.Element => {
      const highlightSearchTerm = (text: string): string => {
         const regex = new RegExp(searchTerm, 'gi');
         return text.replace(regex, match => `<span style="color: red; font-weight: bold">${match}</span>`);
      };

      return (
         <div className="flex">
            <div className="text-l flex items-center h-[5vh] w-[13vh] justify-center rounded-2xl bg-gray-100 p-3 font-bold dark:!bg-navy-600">
               {searchType}
            </div>
            <div className="m-3 w-[100vh] rounded-3xl bg-gray-0 p-5 dark:!bg-navy-600">
               {projects.length > 0 ? (
                  projects.map(project => (
                     <div className="rounded-xl bg-gray-0 p-3 dark:!bg-navy-900" key={project.id}>
                        {showRoleCheck && (
                           <NotificationPopup
                              message="이 프로젝트를 구독하시겠습니까?"
                              subMessage="이 프로젝트를 볼 권한이 없습니다."
                              onConfirm={async () => {
                                 await handleClickYes(project.id, project.name);
                              }}
                              onCancel={handleClickNo}
                           />
                        )}
                        <h2 className="hover:underline hover:text-blue-600 text-2xl">
                           {/* 프로젝트 제목: */}
                           <span
                              onClick={() => {
                                 void handleClickProjectName(project.id, project.name);
                              }}
                              className="text-blue-600 hover:cursor-pointer dark:text-blue-500"
                              dangerouslySetInnerHTML={{
                                 __html: searchType === '제목' ? highlightSearchTerm(project.name) : project.name,
                              }}
                           />
                        </h2>
                        <div className="mt-2 flex gap-5 overflow-hidden">
                           <p className="ml-4 w-[40vh] h-[4vh] overflow-ellipsis">
                              {/* 프로젝트 개요: */}
                              <span
                                 dangerouslySetInnerHTML={{
                                    __html:
                                       searchType === '개요'
                                          ? highlightSearchTerm(project.description)
                                          : project.description,
                                 }}
                              />
                           </p>
                           <p>
                              관리자:
                              <span
                                 className="p-1"
                                 dangerouslySetInnerHTML={{
                                    __html:
                                       searchType === '관리자'
                                          ? highlightSearchTerm(project.managerName)
                                          : project.managerName,
                                 }}
                              />
                           </p>
                           <p>
                              팀원:
                              {project.teamMembers.map(member => (
                                 <span
                                    className="p-1"
                                    key={member.userId}
                                    dangerouslySetInnerHTML={{
                                       __html:
                                          searchType === '개발자'
                                             ? highlightSearchTerm(member.username)
                                             : member.username,
                                    }}
                                 />
                              ))}
                           </p>
                        </div>
                        <hr className="mt-1"></hr>
                     </div>
                  ))
               ) : (
                  <div className="text-black-400 flex h-full w-full items-center justify-center gap-10 text-2xl font-bold">
                     {searchTerm} 가 {searchType}에 포함된 프로젝트가 없습니다!!👻
                  </div>
               )}
            </div>
         </div>
      );
   };

   return (
      <div className="items-center justify-center !z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none">
         <header className="relative mt-10 flex items-center justify-center pt-4">
            <div className="mb-10 flex text-4xl font-bold text-navy-700 dark:text-white">
               {searchTerm}에 대한 검색 결과
            </div>
         </header>
         {/* 검색 분류 */}
         <div className="text-1xl flex justify-center gap-3 font-bold">
            <label className="text-gray-900 dark:text-white">
               <input
                  type="checkbox"
                  checked={selectedCheckbox === '전체'}
                  onChange={() => {
                     handleCheckboxChange('전체');
                  }}
                  className="mr-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
               />
               전체
            </label>
            <label className="text-gray-900 dark:text-white">
               <input
                  type="checkbox"
                  checked={selectedCheckbox === '제목'}
                  onChange={() => {
                     handleCheckboxChange('제목');
                  }}
                  className="mr-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
               />
               제목
            </label>
            <label className="text-gray-900 dark:text-white">
               <input
                  type="checkbox"
                  checked={selectedCheckbox === '개요'}
                  onChange={() => {
                     handleCheckboxChange('개요');
                  }}
                  className="mr-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
               />
               개요
            </label>
            <label className="text-gray-900 dark:text-white">
               <input
                  type="checkbox"
                  checked={selectedCheckbox === '관리자'}
                  onChange={() => {
                     handleCheckboxChange('관리자');
                  }}
                  className="mr-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
               />
               관리자
            </label>
            <label className="text-gray-900 dark:text-white">
               <input
                  type="checkbox"
                  checked={selectedCheckbox === '개발자'}
                  onChange={() => {
                     handleCheckboxChange('개발자');
                  }}
                  className="mr-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
               />
               개발자
            </label>
         </div>
         {/* 검색 분류 표시 */}
         <div className="w-[60vh] m-10 flex justify-center rounded-3xl bg-gray-100 pb-5 pt-5 dark:!bg-navy-600">
            <p className="text-xl font-bold">{selectedCheckbox}를 선택하셨습니다</p>
         </div>
         <div className="bg-gray-500 w-[80%] h-[0.2vh] mb-10"></div>
         {/* 프로젝트 검색 결과 리스트 */}
         <div className="flex justify-center">
            {isLoading ? (
               <LoadingComponent />
            ) : (
               <div className="flex justify-center">
                  {selectedCheckbox === '전체' && (
                     <div className="">
                        <div className="">
                           {renderProjects(searchResults?.titleSearch ?? [], searchTerm, '제목')}
                        </div>
                        <div>
                           {renderProjects(searchResults?.descriptionSearch ?? [], searchTerm, '개요')}
                        </div>
                        <div>{renderProjects(searchResults?.managerSearch ?? [], searchTerm, '관리자')}</div>
                        <div>
                           {renderProjects(searchResults?.developerSearch ?? [], searchTerm, '개발자')}
                        </div>
                     </div>
                  )}
                  {selectedCheckbox === '제목' &&
                     renderProjects(searchResults?.titleSearch ?? [], searchTerm, '제목')}
                  {selectedCheckbox === '개요' &&
                     renderProjects(searchResults?.descriptionSearch ?? [], searchTerm, '개요')}
                  {selectedCheckbox === '관리자' &&
                     renderProjects(searchResults?.managerSearch ?? [], searchTerm, '관리자')}

                  {selectedCheckbox === '개발자' &&
                     renderProjects(searchResults?.developerSearch ?? [], searchTerm, '개발자')}
               </div>
            )}
         </div>
      </div>
   );
};

export default SearchProjectList;
