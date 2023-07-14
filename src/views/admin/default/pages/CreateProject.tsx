import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginState } from "../../../../context/atom";
import { useRecoilValue } from "recoil";


type TeamMember = {
  id: number;
  name: string;
  department: string;
};

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const login = useRecoilValue(loginState);
  const managerId = login.id;

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [allMembers, setAllMembers] = useState<TeamMember[]>([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [suggestedMembers, setSuggestedMembers] = useState<TeamMember[]>([]);
  const [projectName, setProjectName] = useState("");
  const [projectOverview, setProjectOverview] = useState("");

  // fetch All Members
  const fetchMembers = async () => {
    try {
      const response = await axios.get("localhost:8080/api/members");
      const members: TeamMember[] = response.data.map((member: any) => ({
        id: member.user_id,
        name: member.user_name,
        department: member.user_department,
      }));

      setAllMembers(members);
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
    setAllMembers(allMembers.filter((allMember) => allMember.id !== member.id));
  };

  const handleClickRemoveMemberButton = (member: TeamMember) => {
    const updatedMembers = teamMembers.filter(
      (remainMember) => remainMember.id !== member.id
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
        member.name.toLowerCase().includes(inputName.toLowerCase())
      );

      setSuggestedMembers(filteredMembers);
    } else {
      setSuggestedMembers([]);
    }
  };

  const mockFetchSuggestions = () => {
    // Simulate API response with mock data
    const mockResponse: TeamMember[] = [
      { id: 1, name: "김기현", department: "부서1" },
      { id: 2, name: "김성국", department: "부서2" },
      { id: 3, name: "함건욱", department: "부서3" },
      { id: 4, name: "강준희", department: "부서4" },
      { id: 5, name: "이승섭", department: "부서5" },
      { id: 6, name: "전강훈", department: "부서6" },
    ];
    setAllMembers(mockResponse);
  };

  const handleSubmitProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const members: number[] = teamMembers.map((member) => member.id);
      const projectData = {
        projectName,
        projectOverview,
        managerId,
        members,
      };

      console.log(projectData);

      // Send projectData to the backend using axios
      await axios.post("http://localhost:8080/api/project/create", projectData);

      // Clear the form fields and team member list
      setProjectName("");
      setProjectOverview("");
      setTeamMembers([]);
      navigate("../default");
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
      <div className="mt-10 h-full w-full items-center overflow-auto rounded-3xl bg-gray-200 dark:bg-navy-700">
        <form onSubmit={handleSubmitProject}>
          <div className="mb-6">
            <label
              htmlFor="projectName"
              className="text-black mt-10 ml-10 block text-2xl font-bold dark:text-white"
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
              className="dark:bg-navy-600 absolute top-[30%] right-[30%] flex rounded bg-gray-300 px-4 py-2 font-bold dark:text-white"
            >
              프로젝트 생성
            </button>
          </div>
          <div className="mb-6">
            <label
              htmlFor="projectOverview"
              className="text-black mt-10 ml-10 block text-2xl font-bold dark:text-white"
            >
              프로젝트 개요
            </label>
            <input
              type="text"
              id="projectOverview"
              className="m-5 ml-10 block w-[50%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="프로젝트 개요을 입력해주세요"
              value={projectOverview}
              onChange={(event) => setProjectOverview(event.target.value)}
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
                  className="text-black w-64 rounded border border-gray-300 p-2 text-sm dark:text-white"
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
                    <li key={member.id} className="mb-2 flex items-center justify-between">
                      <p className="bg-gray-300 rounded-2xl p-2">{member.name} {member.department}</p>
                      <button
                        className="dark:bg-red-600 ml-5 rounded bg-red-400 px-2 py-1 font-bold"
                        onClick={() => handleClickRemoveMemberButton(member)}
                      >
                        제거
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="dark:text-white">팀원이 추가되지 않았습니다.</p>
              )}
            </div>

            <div className="ml-8">
              <h3 className="dark:text-white mb-4 text-xl font-medium">추천하는 팀원</h3>
              {suggestedMembers.length > 0 ? (
                <ul>
                  {suggestedMembers.map((member) => (
                    <li
                      key={member.id}
                      className="dark:text-white mb-2 flex items-center justify-between"
                    >
                      {member.name} {member.department}
                      <button
                        className="dark:bg-blue-600 ml-5 rounded bg-blue-300 px-2 py-1 font-bold"
                        onClick={() => handleClickAddMemberButton(member)}
                      >
                        추가
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
