import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginState } from "../../../../context/atom";
import { useRecoilValue } from "recoil";
import LoadingComponent from "../components/LoadingComponent ";

type UserRequest = {
  managerId: number;
  managerName: string;
  managerDepartment: string;
  users: User[];
}

type User = {
  userId: number;
  username: string;
  userDepartment: string;
};

const CreateProject: React.FC = () => {
  const navigate = useNavigate();

  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [allMembers, setAllMembers] = useState<User[]>([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [suggestedMembers, setSuggestedMembers] = useState<User[]>([]);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // fetch All Members
  // 자기 자신은 빼기
  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/prelogin/getuserlist",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(JSON.stringify(response, null, "\t"));
      const userInfo: UserRequest = response.data
      const members: User[] = userInfo.users
        .filter(
          (member: any) => member.userId !== userInfo.managerId
        )
        .map((member: any) => ({
          userId: member.userId,
          username: member.username,
          userDepartment: member.userDepartment,
        }));

      setAllMembers(members);
      console.log(allMembers);
    } catch (error) {
      console.error("Error fetching members:", error);
      console.log("Mocking");
      mockFetchSuggestions();
    } finally {
      setIsLoading(false); // Set loading state to false after fetching
    }
  };

  const handleClickAddMemberButton = (member: User) => {
    const updatedMember: User = {
      ...member,
      userDepartment: member.userDepartment,
    };

    setTeamMembers([...teamMembers, updatedMember]);
    setNewMemberName("");
    setSuggestedMembers([]);
    // 전체 멤버 목록에서 member 제거
    setAllMembers(
      allMembers.filter((allMember) => allMember.userId !== member.userId)
    );
  };

  const handleClickRemoveMemberButton = (member: User) => {
    const updatedMembers = teamMembers.filter(
      (remainMember) => remainMember.userId !== member.userId
    );
    setTeamMembers(updatedMembers);
    // 전체 멤버 목록에서 member 다시 추가
    setAllMembers([...allMembers, member]);
    console.log("Present Team Member:", updatedMembers);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.value;
    setNewMemberName(inputName);

    if (inputName.trim() !== "") {
      const filteredMembers = allMembers.filter(
        (member) =>
          member.username &&
          member.username.toLowerCase().includes(inputName.toLowerCase())
      );

      setSuggestedMembers(filteredMembers);
    } else {
      setSuggestedMembers([]);
    }
  };

  const mockFetchSuggestions = () => {
    // Simulate API response with mock data
    const mockUserResponse: User[] = [
      { userId: 1, username: "김기현", userDepartment: "Project Manager" },
      { userId: 2, username: "김성국", userDepartment: "Architecture" },
      { userId: 3, username: "함건욱", userDepartment: "Backend" },
      { userId: 4, username: "강준희", userDepartment: "Frontend" },
      { userId: 5, username: "이승섭", userDepartment: "OAuth" },
      { userId: 6, username: "전강훈", userDepartment: "Machine Learning" },
    ];

    const userRequest: UserRequest = {
      managerId: 3,
      managerName: "함건욱",
      managerDepartment: "Backend",
      users: mockUserResponse
    }
    
    const allUsers: User[] = userRequest.users
      .filter(
        (member: any) => member.userId !== userRequest.managerId
      )
      .map((member: any) => ({
        userId: member.userId,
        username: member.username,
        userDepartment: member.userDepartment,
      }));

    setAllMembers(allUsers);
  };

  const handleSubmitProject = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const users: number[] = teamMembers.map((member) => member.userId);
      const projectData = {
        projectName,
        description,
        users,
      };

      console.log(JSON.stringify(projectData, null, "\t"));

      // Send projectData to the backend using axios
      await axios.post(
        "http://localhost:8080/api/project/create",
        projectData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      // Clear the form fields and team member list
      setProjectName("");
      setDescription("");
      setTeamMembers([]);
      navigate("../");
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("서버 에러 입니다. 다시 시도하세요.");
    }
  };

  // Frist Rendering
  useEffect(() => {
    console.log("Project Create Page rendered");
    fetchMembers();
  }, []);

  return (
    <>
      <div className="flex justify-center overflow-auto">
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <div className="mt-10 h-full w-full items-center overflow-auto rounded-3xl bg-white bg-clip-border px-6 pb-6 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none sm:overflow-x-auto">
            <form onSubmit={handleSubmitProject}>
              <div className="mb-6">
                <label
                  htmlFor="projectName"
                  className="text-black ml-10 mt-10 block text-2xl font-bold dark:text-white"
                >
                  프로젝트 이름
                </label>
                <input
                  type="text"
                  id="projectName"
                  className="m-5 ml-10 block w-[50%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
                  placeholder="프로젝트 이름을 입력해주세요"
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="border-black absolute right-[15%] top-[30%] flex rounded border bg-gray-100 px-4 py-2 font-bold shadow-3xl shadow-shadow-500 dark:bg-navy-600 dark:text-white"
                >
                  프로젝트 생성
                </button>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="text-black ml-10 mt-10 block text-2xl font-bold dark:text-white"
                >
                  프로젝트 개요
                </label>
                <input
                  type="text"
                  id="description"
                  className="m-5 ml-10 block w-[50%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
                  placeholder="프로젝트 개요을 입력해주세요"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
              </div>

              <div className="m-5 ml-10 mt-10 flex">
                <div>
                  <h3 className="text-black mb-4 text-2xl font-bold dark:text-white">
                    프로젝트 팀원
                  </h3>
                  <div className="mb-4 flex">
                    <input
                      type="text"
                      className="w-64 rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 dark:bg-gray-700"
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
                      {teamMembers.map((member) => (
                        <li
                          key={member.userId}
                          className="mb-2 flex items-center justify-between"
                        >
                          <p className="rounded-2xl bg-gray-50 p-3 font-bold">
                            {member.username}
                          </p>
                          <p className="ml-3 rounded-2xl bg-gray-50 p-3 font-bold">
                            {member.userDepartment}
                          </p>
                          <button
                            className="ml-5 rounded-xl bg-gray-50 px-2 py-1 font-bold"
                            onClick={() =>
                              handleClickRemoveMemberButton(member)
                            }
                          >
                            ❌
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="dark:text-white">
                      팀원이 추가되지 않았습니다.
                    </p>
                  )}
                </div>

                <div className="ml-8">
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
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateProject;
