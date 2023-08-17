/*eslint-disable*/
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import PieChartCard from '../components/PieChartCard2';
import MemberStatusCard from '../components/MemberStatusCard';
import RecentComment from '../components/RecentComment';
import SearchRelease from '../components/SearchRelease';
import { useQuery } from 'react-query';
import api from 'context/api';
// import {useRecoilState, useSetRecoilState} from "recoil";
// import project from "../../profile/components/Project";
// import {projectIdState} from "../../../../context/atom";

enum UserRole {
   Subscriber = 'Subscriber',
   Developer = 'Developer',
   Manager = 'Manager',
   None = 'None',
}

// 프론트에서 역할 이름을 주지 말고
// project Id만 주고 이 프로젝트에서의 역할이 뭔지, 프로젝트 이름, 개요, isDeleted 여부 받아서 처리하기

const ProjectDashboard: React.FC = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const searchParams = new URLSearchParams(location.search);
   const projectId: string | null = searchParams.get('projectId');
   const projectName = searchParams.get('projectName');

   // const [getProjectId, setGetProjectId] = useRecoilState(projectIdState);

   const fetchUserRole = async (projectId: number): Promise<UserRole> => {
      try {
         const response = await api.get(`project/${projectId}/role`);
         return response.data;
      } catch (error: any) {
         console.error('Error fetching user role:', error);
         let status = error.code;
         if (error.response?.status != null) {
            status = error.response.status;
         }
         navigate(`../error?status=${status as string}`);
         return mockFetchUserRole();
      }
   };

   const mockFetchUserRole = (): UserRole => {
      return UserRole.Manager;
   };

   // Use the useQuery hook to fetch data
   const checkUserRoleQuery = useQuery(
      ['checkRole', projectId],
      async () => await fetchUserRole(parseInt(projectId ?? '')),
   );

   useEffect(() => {
      if (checkUserRoleQuery.isSuccess) {
         console.log(checkUserRoleQuery.data);
      }
      
      // setGetProjectId(projectId);
      
   }, [checkUserRoleQuery.isSuccess]);

   const handleClickManageButton = async (
      event: React.MouseEvent<HTMLButtonElement>,
      projectId: number,
   ): Promise<void> => {
      event.stopPropagation();
      navigate(`/admin/project/manage?projectId=${projectId}`);
      console.log('handleClickManageButton');
   };

   return (
      <>
         {checkUserRoleQuery.data === UserRole.None ? (
            <div className="mt-40 flex justify-center text-4xl font-bold text-red-600">
               Oops! 당신은 이 프로젝트를 볼 권한이 없습니다.
            </div>
         ) : (
            <div>
               <div className="h-100% mt-4 flex w-auto justify-end gap-5 rounded-[20px] bg-white bg-clip-border p-6 text-4xl font-bold shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none sm:overflow-x-auto">
                  <p className="w-[110vh] overflow-hidden h-[6vh]">{projectName}</p>
                  {checkUserRoleQuery.data === UserRole.Manager && (
                     <button
                        onClick={event => {
                           event.stopPropagation();
                           handleClickManageButton(event, Number(projectId)).catch(error => {
                              console.error('error click manage button', error);
                           });
                        }}
                        className="text-xl w-[30vh]">
                        프로젝트 관리⚙️
                     </button>
                  )}
               </div>
               <div className="mt-4 grid grid-cols-3 gap-5 rounded-[20px]">
                  <div className="col-span-1">
                     <MemberStatusCard
                        projectId={{
                           id: parseInt(projectId ?? ''),
                        }}
                     />
                  </div>
                  <div className="col-span-1">
                     <PieChartCard
                        projectId={{
                           id: parseInt(projectId ?? ''),
                        }}
                     />
                  </div>
                  <div className="row-span-2">
                     <SearchRelease
                        projectId={{
                           id: parseInt(projectId ?? ''),
                        }}
                     />
                  </div>
                  <div className="col-span-2">
                     <RecentComment
                        projectId={{
                           id: parseInt(projectId ?? ''),
                        }}
                     />
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default ProjectDashboard;
