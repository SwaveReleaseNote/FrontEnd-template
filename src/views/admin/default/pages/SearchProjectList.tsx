import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import LoadingComponent from '../components/LoadingComponent ';
import api from 'context/api';
import NotificationPopup from '../components/NotificationPopup';

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

   const [searchResult, setSearchResult] = useState<SearchResult>();
   const [selectedCheckbox, setSelectedCheckbox] = useState('전체');
   const location = useLocation();
   const searchTerm = location.state.searchTerm;
   const [isLoading, setIsLoading] = useState(true);
   const [showRoleCheck, setShowRoleCheck] = useState(false);

   useEffect(() => {
      const fetchSearchResult = async (): Promise<void> => {
         try {
            const response = await api.post('project/search', {
               keyword: searchTerm,
            });

            const searchResult = response.data;
            setSearchResult(searchResult);
            setIsLoading(false);
         } catch (error) {
            console.error('Error fetching search result:', error);
            mockFetchSearchResult();
            setIsLoading(false);
         }
      };

      // Call the async function to fetch search result
      fetchSearchResult().catch(Error);
   }, [searchTerm]);

   useEffect(() => {
      console.log('selectedCheckbox:', selectedCheckbox);
      console.log('searchResult:', searchResult);
      console.log('searchTerm:', searchTerm);
      console.log('showRoleCheck:', showRoleCheck);
   }, [selectedCheckbox, searchResult, searchTerm, showRoleCheck]);

   useEffect(() => {
      console.log('showRoleCheck:', showRoleCheck);
   }, [showRoleCheck]);

   const mockFetchSearchResult = (): void => {
      // Simulate API response with mock data
      setSearchResult({
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
      });
      console.log('mock fetch search result');
   };

   const mockFetchUserRole = (): string => {
      return 'none';
   };

   const fetchUserRole = async (): Promise<string> => {
      try {
         const response = await api.get('user/role');
         return response.data;
      } catch (error) {
         console.error('Error fetching user role:', error);
         const mockResponse = mockFetchUserRole();
         return mockResponse;
      }
   };

   // 클릭한 유저의 권한을 확인해서 프로젝트의 대시보드에 접근할 권리가 없으면 구독을 할 수 있도록 알림창을 띄운다.
   const handleClickProjectName = async (projectId: number, projectName: string): Promise<void> => {
      try {
         // 백엔드로 권한확인
         const role = await fetchUserRole();
         if (role === 'none') {
            setShowRoleCheck(true);
         } else {
            const queryString = `projectId=${projectId}&role=${encodeURIComponent(role)}&projectName=${projectName}`;
            const url = `/admin/dashboard?${queryString}`;

            navigate(url);
            console.log('handleClickProjectCard');
         }
      } catch (error) {
         // Handle the error gracefully, for example, show an error message or log it.
         console.error('Error fetching user role:', error);
      }
   };

   const handleCheckboxChange = (value: string): void => {
      setSelectedCheckbox(value);
   };

   const renderProjects = (projects: ProjectInfo[], searchTerm: string, searchType: string): JSX.Element => {
      console.log('projects:', projects);
      console.log('searchType:', searchType);
      console.log('searchTerm:', searchTerm);

      const highlightSearchTerm = (text: string): string => {
         const regex = new RegExp(searchTerm, 'gi');
         return text.replace(regex, match => `<span style="color: red; font-weight: bold">${match}</span>`);
      };

      const handleClickYes = async (projectId: number, projectName: string): Promise<void> => {
         // Perform the project subscribe logic
         console.log('Click Yes Subscribe');
         try {
            await api.post(`project/subscribe`, { projectId });
            const queryString = `projectId=${projectId}&role=${encodeURIComponent(
               'Subscriber',
            )}&projectName=${projectName}`;
            const url = `/admin/dashboard?${queryString}`;
            navigate(url);
         } catch (error) {
            console.error('Error Subscribe project:', error);
            alert('Server error. Please try again.');
         } finally {
            setShowRoleCheck(false);
         }
      };

      const handleClickNo = (): void => {
         // Cancel the project deletion
         console.log('Project deletion canceled');
         setShowRoleCheck(false);
      };

      return (
         <div className="items-top flex">
            <div className="mt-3 text-l flex h-[7vh] w-[13vh] justify-center rounded-2xl bg-gray-100 p-3 font-bold dark:!bg-navy-600">
               {searchType}
               {/* 에 {searchTerm}가 포함된 프로젝트입니다. */}
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
                        <div className="">{renderProjects(searchResult?.titleSearch ?? [], searchTerm, '제목')}</div>
                        {/* <hr></hr> */}
                        <div>{renderProjects(searchResult?.descriptionSearch ?? [], searchTerm, '개요')}</div>
                        {/* <hr></hr> */}
                        <div>{renderProjects(searchResult?.managerSearch ?? [], searchTerm, '관리자')}</div>
                        {/* <hr></hr> */}
                        <div>{renderProjects(searchResult?.developerSearch ?? [], searchTerm, '개발자')}</div>
                        {/* <hr></hr> */}
                     </div>
                  )}
                  {selectedCheckbox === '제목' && renderProjects(searchResult?.titleSearch ?? [], searchTerm, '제목')}
                  {selectedCheckbox === '개요' &&
                     renderProjects(searchResult?.descriptionSearch ?? [], searchTerm, '개요')}
                  {selectedCheckbox === '관리자' &&
                     renderProjects(searchResult?.managerSearch ?? [], searchTerm, '관리자')}

                  {selectedCheckbox === '개발자' &&
                     renderProjects(searchResult?.developerSearch ?? [], searchTerm, '개발자')}
               </div>
            )}
         </div>
      </div>
   );
};

export default SearchProjectList;
