import React, { type ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import imgSrc from 'assets/img/profile/banner2.png';
import Card from 'components/card';
import NotificationPopup from '../components/NotificationPopup';
import api from 'context/api';
import { useMutation, useQueryClient } from 'react-query';

enum UserRole {
   Subscriber = 'Subscriber',
   Developer = 'Developer',
   Manager = 'Manager',
   None = 'None',
}

interface ProjectCardProps {
   projectId: number;
   projectName: string;
   projectDescription: string;
   projectMemberNumber: number;
   projectRecentRelease: string;
   projectCreateDate: string;
   projectRole: UserRole;
}

function ProjectCard({
   projectId,
   projectName,
   projectDescription,
   projectMemberNumber,
   projectRecentRelease,
   projectCreateDate,
   projectRole,
}: ProjectCardProps): ReactElement {
   const banner = imgSrc as string;
   const navigate = useNavigate();
   const [showConfirmation, setShowConfirmation] = useState(false);
   const queryClient = useQueryClient();

   function handleClickProjectCard(projectId: number, projectRole: string): void {
      const queryString = `projectId=${projectId}&projectName=${projectName}`;
      const url = `/admin/dashboard?${queryString}`;
      navigate(url);
   }

   const deleteProjectMutation = useMutation(async () => await api.delete(`project/${projectId}/drop`), {
      onSuccess: async () => {
         setShowConfirmation(false);

         await queryClient.refetchQueries('projects').then(() => {
            navigate('../');
         });
      },
      onError: error => {
         console.error('Error deleting project:', error);
         alert('서버 에러 입니다. 다시 시도하세요.');
      },
   });
   const handleClickManageButton = async (
      event: React.MouseEvent<HTMLButtonElement>,
      projectId: number,
   ): Promise<void> => {
      event.stopPropagation();
      navigate(`/admin/project/manage?projectId=${projectId}`);
   };

   const handleClickYes = async (): Promise<void> => {
      deleteProjectMutation.mutate();
   };

   const handleClickNo = (): void => {
      setShowConfirmation(false);
   };

   const handleClickProjectDeleteButton = (): void => {
      setShowConfirmation(true);
   };

   return (
      <div>
         {showConfirmation && (
            <NotificationPopup
               message="이 프로젝트에서 탈퇴하시겠습니까??"
               subMessage="주의"
               onConfirm={handleClickYes}
               onCancel={handleClickNo}
            />
         )}
         <div
            className="hover:cursor-pointer m-1 w-[40vh] rounded-3xl p-2 hover:bg-indigo-100 dark:hover:bg-gray-800 focus:ring-1 focus:ring-blue-300"
            onClick={() => {
               handleClickProjectCard(projectId, projectRole);
            }}>
            <Card extra={'items-center p-[16px] bg-cover'}>
               <div className="relative bottom-[1%] left-[43%]">
                  {projectRole === UserRole.Manager ? (
                     <button
                        className="text-xl"
                        onClick={event => {
                           event.stopPropagation();
                           handleClickManageButton(event, projectId).catch(error => {
                              console.error('error', error);
                           });
                        }}>
                        ⚙️
                     </button>
                  ) : (
                     <button
                        className="text-l"
                        onClick={event => {
                           event.stopPropagation();
                           handleClickProjectDeleteButton();
                        }}>
                        ❌
                     </button>
                  )}
               </div>
               {/* Background and profile */}
               <div
                  className="relative mt-1 flex h-[10vh] w-full justify-center rounded-xl bg-cover"
                  style={{ backgroundImage: `url(${banner})` }}>
                  <div className="absolute right-[2%] top-[1%]">
                     {projectRole === UserRole.Manager && (
                        <>
                           {/* <MdStar className="mr-2 text-3xl text-yellow-500" /> */}
                           <p className="text-2xl">👑</p>
                        </>
                     )}
                  </div>
                  <div className="bg-white-400 absolute left-[0%] flex h-full w-full items-center overflow-hidden overflow-ellipsis whitespace-nowrap rounded-3xl border-none border-white dark:!border-navy-700">
                     {/* <img className="h-full w-full rounded-full" src={avatar} alt="" /> */}
                     <p className="ml-5 text-2xl font-bold text-white dark:text-white overflow-hidden overflow-ellipsis">
                        {projectName}
                     </p>
                  </div>
                  <div className="absolute right-[-5%] top-[70%] flex h-[47px] w-[47px] items-center justify-center rounded-full border-[4px] border-white bg-blue-400 dark:!border-navy-700 dark:!bg-navy-700">
                     {/* <img className="h-full w-full rounded-full" src={avatar} alt="" /> */}
                     <p className="text-2xl font-bold text-white dark:text-white">{projectMemberNumber}</p>
                  </div>
               </div>

               {/* 프로젝트 개요 */}
               <div className="mt-8 flex flex-col items-center justify-center">
                  <h1 className="text-l text-center h-[5vh] w-[30vh] overflow-hidden font-bold text-navy-700 dark:text-white">
                     {projectDescription}
                  </h1>
                  <p className="text-l font-normal text-gray-600">프로젝트 개요</p>
               </div>

               {/* 프로젝트의 최신 릴리즈 노트 버전 */}
               <div className="mt-4 flex flex-col items-center">
                  {projectRecentRelease?.length > 0 ? (
                     <h1 className="text-2xl font-bold text-navy-700 dark:text-white">{projectRecentRelease}</h1>
                  ) : (
                     <div className="flex items-center justify-center text-sm font-bold">
                        작성된 릴리즈 노트가 없습니다😭
                     </div>
                  )}

                  <p className="text-l font-normal text-gray-600">최신 릴리즈노트 버전</p>
               </div>

               {/* 프로젝트의 생성 날짜 */}
               <div className="mt-4 flex flex-col items-center">
                  <h1 className="text-m font-bold text-navy-700 dark:text-white">{projectCreateDate}</h1>
                  <p className="text-l font-normal text-gray-600">생성 날짜</p>
               </div>
            </Card>
         </div>
      </div>
   );
}

export default ProjectCard;
