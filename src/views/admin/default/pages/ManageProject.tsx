import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NotificationPopup from '../components/NotificationPopup';
import LoadingComponent from '../components/LoadingComponent ';
import api from 'context/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';

interface UserRequest {
   managerId: number;
   managerName: string;
   managerDepartment: string;
   users: User[];
}

interface User {
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
   teamMembers: User[];
}

interface ProjectUpdate {
   id: number;
   name: string;
   description: string;
   deleteUsers: number[];
   updateUsers: number[];
}

const ManageProject: React.FC = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const queryClient = useQueryClient();
   const searchParams = new URLSearchParams(location.search);
   const [projectId] = useState(Number(searchParams.get('projectId')));

   const [teamMembers, setTeamMembers] = useState<User[]>([]);
   const [allMembers, setAllMembers] = useState<User[]>([]);
   const [deleteMembers, setDeleteMembers] = useState<User[]>([]);
   const [addMembers, setAddMembers] = useState<User[]>([]);
   const [newMemberName, setNewMemberName] = useState('');
   const [suggestedMembers, setSuggestedMembers] = useState<User[]>([]);

   const [projectName, setProjectName] = useState('');
   const [description, setDescription] = useState('');
   const [managerId, setManagerId] = useState(0);
   const [managerName, setManagerName] = useState('');
   const [managerDepartment, setManagerDepartment] = useState('');
   const [isLoading, setIsLoading] = useState(true);

   const [showConfirmation, setShowConfirmation] = useState(false);

   const fetchAllMembers = async (): Promise<UserRequest> => {
      try {
         const response = await api.get('users');
         return response.data;
      } catch (error: any) {
         console.error('Error fetching members:', error);
         let status = error.code;
         if (error.response?.status != null) {
            status = error.response.status;
         }
         // navigate(`../error?status=${status as string}`);
         console.log(status);
         return mockFetchUserRequest();
      }
   };

   const fetchProjectInfo = async (): Promise<ProjectInfo> => {
      try {
         const response = await api.get(`project/${projectId}/manage`);
         return response.data;
      } catch (error: any) {
         console.error('Error fetching projectInfo:', error);
         let status = error.code;
         if (error.response?.status != null) {
            status = error.response.status;
         }
         // navigate(`../error?status=${status as string}`);
         console.log(status);
         return mockFetchProjectInfo();
      }
   };

   const allMembersQuery = useQuery('allMembers', fetchAllMembers);
   const projectInfoQuery = useQuery(['projectInfo', projectId], fetchProjectInfo);

   const mockFetchUserRequest = (): UserRequest => {
      // Simulate API response with mock data
      const mockUserResponse: User[] = [
         { userId: 1, username: '김기현', userDepartment: 'Project Manager' },
         { userId: 2, username: '김성국', userDepartment: 'Architecture' },
         { userId: 3, username: '함건욱', userDepartment: 'Backend' },
         { userId: 4, username: '강준희', userDepartment: 'Frontend' },
         { userId: 5, username: '이승섭', userDepartment: 'OAuth' },
         { userId: 6, username: '전강훈', userDepartment: 'Machine Learning' },
      ];

      const userRequest: UserRequest = {
         managerId: 3,
         managerName: '함건욱',
         managerDepartment: 'Backend',
         users: mockUserResponse,
      };

      return userRequest;
   };

   const mockFetchProjectInfo = (): ProjectInfo => {
      // Simulate API response with mock data
      const mockResponse: ProjectInfo = {
         id: 1,
         name: 'Sample Project',
         description: 'Sample description',
         managerId: 3,
         managerName: '함건욱',
         managerDepartment: 'Backend',
         teamMembers: [
            { userId: 1, username: '김기현', userDepartment: 'Project Manager' },
            { userId: 2, username: '김성국', userDepartment: 'Architecture' },
         ],
      };
      return mockResponse;
   };

   useEffect(() => {
      if (allMembersQuery.isSuccess && projectInfoQuery.isSuccess) {
         setIsLoading(false);

         const allMembersData: User[] = allMembersQuery.data.users;
         const projectInfoData: ProjectInfo = projectInfoQuery.data;

         const removeTeamMembersFromAllMembers = allMembersData.filter(
            allMember => !teamMembers.some(teamMember => teamMember.userId === allMember.userId),
         );

         const removeManagerFromAllMembers = removeTeamMembersFromAllMembers.filter(
            member => member.userId !== managerId,
         );

         setAllMembers(removeManagerFromAllMembers);
         setProjectName(projectInfoData.name);
         setDescription(projectInfoData.description);
         setTeamMembers(projectInfoData.teamMembers);
         setManagerDepartment(projectInfoData.managerDepartment);
         setManagerId(projectInfoData.managerId);
         setManagerName(projectInfoData.managerName);
      }
   }, [allMembersQuery.isSuccess, projectInfoQuery.isSuccess]);

   const handleClickAddMemberButton = (member: User): void => {
      const addMember: User = {
         ...member,
         userDepartment: member.userDepartment,
      };

      setTeamMembers([...teamMembers, addMember]);
      setNewMemberName('');
      setSuggestedMembers([]);
      setAllMembers(allMembers.filter(allMember => allMember.userId !== member.userId));
      if (deleteMembers.some(deleteMember => deleteMember.userId === addMember.userId)) {
         setDeleteMembers(deleteMembers.filter(deleteMember => deleteMember.userId !== addMember.userId));
      } else {
         setAddMembers([...addMembers, addMember]);
      }
   };

   const handleClickRemoveMemberButton = (member: User): void => {
      const updatedMembers = teamMembers.filter(remainMember => remainMember.userId !== member.userId);
      setTeamMembers(updatedMembers);
      setAllMembers([...allMembers, member]);
      if (addMembers.some(addMember => addMember.userId === member.userId)) {
         setAddMembers(addMembers.filter(addMember => addMember.userId !== member.userId));
      } else {
         setDeleteMembers([...deleteMembers, member]);
      }

      console.log('Present Team Member:', updatedMembers);
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const inputName = event.target.value;
      setNewMemberName(inputName);

      if (inputName.trim() !== '') {
         const filteredMembers = allMembers.filter(member =>
            member.username?.toLowerCase().includes(inputName.toLowerCase()),
         );

         setSuggestedMembers(filteredMembers);
      } else {
         setSuggestedMembers([]);
      }
   };

   const updateProjectMutation = useMutation(
      async (projectData: any) => await api.put(`project/${projectId}`, projectData),
      {
         onSuccess: async () => {
            setProjectName('');
            setDescription('');
            setTeamMembers([]);
            await queryClient.refetchQueries('projects').then(() => {
               console.log('refetch projects');
               navigate('../default');
            });

            allMembersQuery.refetch().catch(error => {
               console.error('Error refetching all members:', error);
            });

            projectInfoQuery.refetch().catch(error => {
               console.error('Error refetching project info:', error);
            });
         },
         onError: error => {
            console.error('Error submitting project:', error);
            alert('서버 에러 입니다. 다시 시도하세요.');
         },
      },
   );

   const handleSubmitProject = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      const addUsers: number[] = addMembers.map(member => member.userId);
      const deleteUsers: number[] = deleteMembers.map(member => member.userId);
      const projectData: ProjectUpdate = {
         id: projectId,
         name: projectName,
         description,
         updateUsers: addUsers,
         deleteUsers,
      };

      console.log(JSON.stringify(projectData, null, '\t'));
      updateProjectMutation.mutate(projectData);
   };

   const handleClickProjectDeleteButton = (): void => {
      setShowConfirmation(true);
      console.log('handleClickProjectDeleteButton');
   };

   const handleConfirmDelete = async (): Promise<void> => {
      // Perform the project deletion logic
      console.log('Project deletion confirmed');
      try {
         await api.delete(`project/${projectId}`);

         // Clear the form fields and team member list
         setProjectName('');
         setDescription('');
         setTeamMembers([]);
         await queryClient.refetchQueries('projects').then(() => {
            console.log('refetch projects');
            navigate('../default');
         });
      } catch (error) {
         console.error('Error delete project:', error);
         alert('서버 에러 입니다. 다시 시도하세요.');
      }
      setShowConfirmation(false);
   };

   const handleCancelDelete = (): void => {
      // Cancel the project deletion
      console.log('Project deletion canceled');
      setShowConfirmation(false);
   };

   return (
      <div className="flex justify-center overflow-auto">
         {isLoading ? (
            <LoadingComponent />
         ) : (
            <div className="mt-10 h-full w-full items-center overflow-auto rounded-3xl bg-white bg-clip-border px-6 pb-6 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none sm:overflow-x-auto">
               <button
                  onClick={handleClickProjectDeleteButton}
                  className="dark:hover:bg-red-800 hover:bg-red-300 border-black absolute right-[15%] top-[30%] flex rounded border bg-gray-100 px-4 py-2 font-bold text-red-500 shadow-3xl shadow-shadow-500 dark:bg-navy-600 dark:text-white">
                  프로젝트 삭제
               </button>
               {showConfirmation && (
                  <NotificationPopup
                     message="이 프로젝트를 삭제하시겠습니까?"
                     subMessage="프로젝트의 모든 정보가 삭제됩니다."
                     onConfirm={handleConfirmDelete}
                     onCancel={handleCancelDelete}
                  />
               )}
               <form
                  onSubmit={event => {
                     handleSubmitProject(event).catch(error => {
                        console.error('error submit project', error);
                     });
                  }}>
                  <div className="mb-6">
                     <label
                        htmlFor="projectName"
                        className="text-black ml-10 mt-10 block text-2xl font-bold dark:text-white">
                        프로젝트 이름
                     </label>
                     <input
                        type="text"
                        id="projectName"
                        className="dark:bg-gray-800 dark:text-white m-5 ml-10 block w-[50%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="프로젝트 이름을 입력해주세요"
                        value={projectName}
                        onChange={event => {
                           setProjectName(event.target.value);
                        }}
                        required
                     />
                  </div>
                  <div>
                     <button
                        type="submit"
                        className="dark:hover:bg-navy-300 hover:bg-gray-300 border-black absolute right-[15%] top-[50%] flex rounded border bg-gray-100 px-4 py-2 font-bold shadow-3xl shadow-shadow-500 dark:bg-navy-600 dark:text-white">
                        변경사항 저장
                     </button>
                  </div>
                  <div className="mb-6">
                     <label
                        htmlFor="description"
                        className="text-black ml-10 mt-10 block text-2xl font-bold dark:text-white">
                        프로젝트 개요
                     </label>
                     <input
                        type="text"
                        id="description"
                        className="dark:bg-gray-800 dark:text-white m-5 ml-10 block w-[50%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="프로젝트 개요을 입력해주세요"
                        value={description}
                        onChange={event => {
                           setDescription(event.target.value);
                        }}
                        required
                     />
                  </div>

                  <div className="m-5 ml-10 mt-10 flex">
                     <div>
                        <h3 className="text-black mb-4 text-2xl font-bold">👑 프로젝트 관리자</h3>
                        <div className="mb-4 flex">
                           {/* <input
                  type="text"
                  className="text-black w-64 rounded border border-gray-300 bg-gray-50 p-2 text-sm dark:text-white"
                  placeholder="관리자 이름을 입력해주세요"
                /> */}
                        </div>
                        <ul className="dark:text-white">
                           <li className="mb-2 flex items-center justify-between">
                              <p className="dark:bg-gray-800 dark:text-white rounded-2xl bg-gray-50 p-3 font-bold">
                                 {managerName}
                              </p>
                              <p className="dark:bg-gray-800 dark:text-white ml-3 rounded-2xl bg-gray-50 p-3 font-bold">
                                 {managerDepartment}
                              </p>
                              {/* 추후에 관리자 변경을 위해 보류 */}
                              {/* <button className="ml-5 rounded-xl bg-gray-50 px-2 py-1 font-bold">
                    ❌
                  </button> */}
                           </li>
                        </ul>
                     </div>
                     {/* 추후에 관리자 변경을 위해 보류 */}
                     {/* <div className="ml-8">
              <h3 className="mb-4 text-xl font-medium dark:text-white">
                추천하는 팀원
              </h3>
              {suggestedMembers.length > 0 ? (
                <ul>
                  {suggestedMembers.map((member) => (
                    <li
                      key={member.userId}
                      className="mb-2 flex items-center justify-between dark:text-white"
                    >
                      <p className="rounded-2xl bg-gray-50 p-3 font-bold">
                        {member.username}
                      </p>
                      <p className="ml-3 rounded-2xl bg-gray-50 p-3 font-bold">
                        {member.userDepartment}
                      </p>
                      <button
                        className="ml-5 rounded-xl bg-gray-50 px-2 py-1 text-3xl font-bold text-blue-500"
                        onClick={() => handleClickAddMemberButton(member)}
                      >
                        +
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="dark:text-white">추천하는 팀원이 없습니다.</p>
              )}
            </div> */}
                  </div>

                  <div className="m-5 ml-10 mt-10 flex">
                     <div>
                        <h3 className="text-black mb-4 text-2xl font-bold dark:text-white">프로젝트 팀원</h3>
                        <div className="mb-4 flex">
                           <input
                              type="text"
                              className="dark:bg-gray-800 dark:text-white text-black w-64 rounded border border-gray-300 bg-gray-50 p-2 text-sm"
                              placeholder="팀원 이름을 입력해주세요"
                              value={newMemberName}
                              onChange={handleInputChange}
                           />
                           {/* <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-r"
                  onClick={() => handleAddMember({ id: Date.now(), name: newMemberName, department: '' })}
                >
                  추가
                </button> */}
                        </div>
                        {teamMembers.length > 0 ? (
                           <ul className="dark:text-white">
                              {teamMembers.map(member => (
                                 <li key={member.userId} className="mb-2 flex items-center justify-between">
                                    <p className="dark:bg-gray-800 dark:text-white rounded-2xl bg-gray-50 p-3 font-bold">
                                       {member.username}
                                    </p>
                                    <p className="dark:bg-gray-800 dark:text-white ml-3 rounded-2xl bg-gray-50 p-3 font-bold">
                                       {member.userDepartment}
                                    </p>
                                    <button
                                       className="dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white hover:bg-gray-300 ml-5 rounded-xl bg-gray-50 px-2 py-1 font-bold"
                                       onClick={() => {
                                          handleClickRemoveMemberButton(member);
                                       }}>
                                       ❌
                                    </button>
                                 </li>
                              ))}
                           </ul>
                        ) : (
                           <p className="dark:text-white">팀원이 추가되지 않았습니다.</p>
                        )}
                     </div>

                     <div className="ml-40">
                        <h3 className="mb-4 text-xl font-bold dark:text-white">추천하는 팀원</h3>
                        {suggestedMembers.length > 0 ? (
                           <ul>
                              {suggestedMembers.map(member => (
                                 <li
                                    key={member.userId}
                                    className="mb-2 flex items-center justify-between dark:text-white">
                                    <p className="dark:bg-gray-800 dark:text-white rounded-2xl bg-gray-50 p-3 font-bold">
                                       {member.username}
                                    </p>
                                    <p className="dark:bg-gray-800 dark:text-white ml-3 rounded-2xl bg-gray-50 p-3 font-bold">
                                       {member.userDepartment}
                                    </p>
                                    <button
                                       className="dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-300 ml-5 rounded-xl bg-gray-50 px-2 py-1 text-3xl font-bold text-blue-500"
                                       onClick={() => {
                                          handleClickAddMemberButton(member);
                                       }}>
                                       +
                                    </button>
                                 </li>
                              ))}
                           </ul>
                        ) : (
                           <p className="dark:text-white">추천하는 팀원이 없습니다.</p>
                        )}
                     </div>
                  </div>
               </form>
            </div>
         )}
      </div>
   );
};

export default ManageProject;
