import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginState } from "../../../../context/atom";
import { useRecoilValue } from "recoil";

type TeamMember = {
  user_id: number;
  user_name: string;
  department: string;
};

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const login = useRecoilValue(loginState);
  const userId = login.id;

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [allMembers, setAllMembers] = useState<TeamMember[]>([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [suggestedMembers, setSuggestedMembers] = useState<TeamMember[]>([]);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

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
      const members: TeamMember[] = response.data
        .filter((member: any) => member.user_id !== Number(localStorage.getItem("id")))
        .map((member: any) => ({
          user_id: member.user_id,
          user_name: member.user_name,
          user_department: member.user_department,
        }));

      setAllMembers(members);
      console.log(allMembers);
      console.log( Number(localStorage.getItem("id")));
    } catch (error) {
      console.error("Error fetching members:", error);
      console.log("Mocking");
      mockFetchSuggestions();
    }
  };

  const handleClickAddMemberButton = (member: TeamMember) => {
    const updatedMember: TeamMember = {
      ...member,
      department: member.department,
    };

    setTeamMembers([...teamMembers, updatedMember]);
    setNewMemberName("");
    setSuggestedMembers([]);
    // 전체 멤버 목록에서 member 제거
    setAllMembers(
      allMembers.filter((allMember) => allMember.user_id !== member.user_id)
    );
  };

  const handleClickRemoveMemberButton = (member: TeamMember) => {
    const updatedMembers = teamMembers.filter(
      (remainMember) => remainMember.user_id !== member.user_id
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
      const filteredMembers = allMembers.filter((member) =>
        member.user_name.toLowerCase().includes(inputName.toLowerCase())
      );

      setSuggestedMembers(filteredMembers);
    } else {
      setSuggestedMembers([]);
    }
  };

  const mockFetchSuggestions = () => {
    // Simulate API response with mock data
    const mockResponse: TeamMember[] = [
      { user_id: 1, user_name: "김기현", department: "Project Manager" },
      { user_id: 2, user_name: "김성국", department: "Architecture" },
      { user_id: 3, user_name: "함건욱", department: "Backend" },
      { user_id: 4, user_name: "강준희", department: "Frontend" },
      { user_id: 5, user_name: "이승섭", department: "OAuth" },
      { user_id: 6, user_name: "전강훈", department: "Machine Learning" },
    ];
    setAllMembers(mockResponse);
  };

  const handleSubmitProject = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const users: number[] = teamMembers.map((member) => member.user_id);
      const projectData = {
        projectName,
        description,
        users,
      };

      console.log(projectData);

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
      // navigate("../default");
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
    <div className="flex justify-center overflow-auto">
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
              className="m-5 ml-10 block w-[50%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
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
              className="m-5 ml-10 block w-[50%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
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
                  className="text-black w-64 rounded border border-gray-300 bg-gray-50 p-2 text-sm dark:text-white"
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
                      key={member.user_id}
                      className="mb-2 flex items-center justify-between"
                    >
                      <p className="rounded-2xl bg-gray-50 p-3 font-bold">
                        {member.user_name}
                      </p>
                      <p className="ml-3 rounded-2xl bg-gray-50 p-3 font-bold">
                        {member.department}
                      </p>
                      <button
                        className="ml-5 rounded-xl bg-gray-50 px-2 py-1 font-bold"
                        onClick={() => handleClickRemoveMemberButton(member)}
                      >
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="dark:text-white">팀원이 추가되지 않았습니다.</p>
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
                      key={member.user_id}
                      className="mb-2 flex items-center justify-between dark:text-white"
                    >
                      <p className="rounded-2xl bg-gray-50 p-3 font-bold">
                        {member.user_name}
                      </p>
                      <p className="ml-3 rounded-2xl bg-gray-50 p-3 font-bold">
                        {member.department}
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
    </div>
  );
};

export default CreateProject;
