import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CheckboxLabel from "../components/CheckboxLabel";

type TeamMember = {
  user_id: number;
  username: string;
  user_department: string;
};

type ProjectInfo = {
  id: number;
  name: string;
  description: string;
  managerId: number;
  managerName: string;
  managerDepartment: string;
  teamMembers: TeamMember[];
};

type SearchResult = {
  titleSearch: ProjectInfo[];
  descriptionSearch: ProjectInfo[];
  managerSearch: ProjectInfo[];
  developerSearch: ProjectInfo[];
};

const SearchProjectList: React.FC = () => {
  const navigate = useNavigate();
  
  const [searchResult, setSearchResult] = useState<SearchResult>();
  const [selectedCheckbox, setSelectedCheckbox] = useState("전체");
  const location = useLocation();
  const searchTerm = location.state.searchTerm.searchTerm;

  useEffect(() => {
    console.log("searchTerm:", searchTerm);
    console.log("selectedCheckbox:", selectedCheckbox);
    console.log("Search Result component rendered");
    axios
      .get(`http://localhost:8080/api/project/search/${searchTerm}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response: { data: SearchResult }) => {
        const searchResult = response.data;
        setSearchResult(searchResult);
      })
      .catch((error: any) => {
        console.error("Error fetching search result:", error);
        mockFetchSearchResult();
      });
    console.log("searchResult:", searchResult);
  }, []);

  useEffect(() => {
    console.log("selectedCheckbox:", selectedCheckbox);
  }, [selectedCheckbox]);

  const mockFetchSearchResult = () => {
    // Simulate API response with mock data
    setSearchResult({
      titleSearch: [],
      descriptionSearch: [
        {
          id: 4,
          name: "개요 검색 프로젝트 1",
          description: "멍멍이 관리 프로젝트",
          managerId: 1,
          managerName: "김기현",
          managerDepartment: "Project Manager",
          teamMembers: [
            { user_id: 2, username: "김성국", user_department: "Architecture" },
            { user_id: 3, username: "함건욱", user_department: "Backend" },
          ],
        },
        {
          id: 5,
          name: "개요 검색 프로젝트 2",
          description: "멍멍이 밥주기 프로젝트",
          managerId: 2,
          managerName: "함건욱",
          managerDepartment: "Backend",
          teamMembers: [
            { user_id: 2, username: "김성국", user_department: "Architecture" },
            {
              user_id: 3,
              username: "김기현",
              user_department: "Project Manager",
            },
          ],
        },
        {
          id: 6,
          name: "개요 검색 프로젝트 3",
          description: "멍멍이 vs 고양이",
          managerId: 3,
          managerName: "함건욱",
          managerDepartment: "Backend",
          teamMembers: [
            { user_id: 2, username: "김성국", user_department: "Architecture" },
            {
              user_id: 3,
              username: "김기현",
              user_department: "Project Manager",
            },
          ],
        },
      ],
      managerSearch: [
        {
          id: 7,
          name: "관리자 검색 프로젝트 1",
          description: "관리자 검색 프로젝트 1",
          managerId: 1,
          managerName: "멍멍이",
          managerDepartment: "Project Manager",
          teamMembers: [
            { user_id: 2, username: "김성국", user_department: "Architecture" },
            { user_id: 3, username: "함건욱", user_department: "Backend" },
          ],
        },
      ],
      developerSearch: [
        {
          id: 10,
          name: "개발자 검색 프로젝트 1",
          description: "개발자 검색 프로젝트 1",
          managerId: 1,
          managerName: "김기현",
          managerDepartment: "Project Manager",
          teamMembers: [
            { user_id: 2, username: "멍멍이", user_department: "Architecture" },
            { user_id: 3, username: "함건욱", user_department: "Backend" },
          ],
        },
        {
          id: 11,
          name: "개발자 검색 프로젝트 2",
          description: "개발자 검색 프로젝트 2",
          managerId: 2,
          managerName: "함건욱",
          managerDepartment: "Backend",
          teamMembers: [
            { user_id: 2, username: "김성국", user_department: "Architecture" },
            {
              user_id: 3,
              username: "멍멍이",
              user_department: "Project Manager",
            },
          ],
        },
        {
          id: 12,
          name: "개발자 검색 프로젝트 3",
          description: "개발자 검색 프로젝트 3",
          managerId: 3,
          managerName: "함건욱",
          managerDepartment: "Backend",
          teamMembers: [
            { user_id: 2, username: "멍멍이", user_department: "Architecture" },
            {
              user_id: 3,
              username: "김기현",
              user_department: "Project Manager",
            },
          ],
        },
      ],
    });
    console.log("mock fetch search result");
  };

  const handleClickProjectName = (projectId: number, projectName: string) => {
    const queryString = `projectId=${projectId}&role=${encodeURIComponent(
      "Subscriber"
    )}&projectName=${projectName}`;
    const url = `/admin/dashboard?${queryString}`;

    navigate(url);
    console.log("handleClickProjectCard");
  };

  const handleCheckboxChange = (value: string) => {
    setSelectedCheckbox(value);
  };

  const renderProjects = (
    projects: ProjectInfo[],
    searchTerm: string,
    searchType: string
  ) => {
    const highlightSearchTerm = (text: string) => {
      const regex = new RegExp(searchTerm, "gi");
      return text.replace(
        regex,
        (match) => `<span style="color: red; font-weight: bold">${match}</span>`
      );
    };

    return (
      <div className="items-top flex">
        <div className="text-l flex h-[7vh] w-[12vh] rounded-3xl bg-gray-300 p-3 font-bold">
          {searchType}
          {/* 에 {searchTerm}가 포함된 프로젝트입니다. */}
        </div>
        <div className="m-3 w-[100vh] rounded-3xl bg-gray-300 p-5">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div className="m-3 rounded-xl bg-gray-200 p-3" key={project.id}>
                <h2 className="text-2xl">
                  {/* 프로젝트 제목: */}
                  <span
                    onClick={() =>
                      handleClickProjectName(project.id, project.name)
                    }
                    className=" text-blue-600 hover:cursor-pointer"
                    dangerouslySetInnerHTML={{
                      __html:
                        searchType === "제목"
                          ? highlightSearchTerm(project.name)
                          : project.name,
                    }}
                  />
                </h2>
                <p>
                  {/* 프로젝트 개요: */}
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        searchType === "개요"
                          ? highlightSearchTerm(project.description)
                          : project.description,
                    }}
                  />
                </p>
                <p>
                  관리자:
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        searchType === "관리자"
                          ? highlightSearchTerm(project.managerName)
                          : project.managerName,
                    }}
                  />
                </p>
                <p>
                  팀원:
                  {project.teamMembers.map((member) => (
                    <span
                      className="p-1"
                      key={member.user_id}
                      dangerouslySetInnerHTML={{
                        __html:
                          searchType === "개발자"
                            ? highlightSearchTerm(member.username)
                            : member.username,
                      }}
                    />
                  ))}
                </p>
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
    <div className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none">
      <header className="relative mt-10 flex items-center justify-center pt-4">
        <div className="mb-10 flex text-3xl font-bold text-navy-700 dark:text-white">
          {searchTerm}에 대한 검색 결과
        </div>
      </header>
      {/* 검색 분류 */}
      <div className="text-1xl flex justify-center gap-3 font-bold">
        <label className="text-gray-900">
          <input
            type="checkbox"
            checked={selectedCheckbox === "전체"}
            onChange={() => handleCheckboxChange("전체")}
            className="mr-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          전체
        </label>
        <label className="dark text-gray-900">
          <input
            type="checkbox"
            checked={selectedCheckbox === "제목"}
            onChange={() => handleCheckboxChange("제목")}
            className="mr-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          제목
        </label>
        <label className="dark text-gray-900">
          <input
            type="checkbox"
            checked={selectedCheckbox === "개요"}
            onChange={() => handleCheckboxChange("개요")}
            className="mr-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          개요
        </label>
        <label className="dark text-gray-900">
          <input
            type="checkbox"
            checked={selectedCheckbox === "관리자"}
            onChange={() => handleCheckboxChange("관리자")}
            className="mr-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          관리자
        </label>
        <label className="dark text-gray-900">
          <input
            type="checkbox"
            checked={selectedCheckbox === "개발자"}
            onChange={() => handleCheckboxChange("개발자")}
            className="mr-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          개발자
        </label>
      </div>
      {/* 검색 분류 표시 */}
      <div className="m-10 flex justify-center rounded-3xl bg-gray-300 pb-5 pt-5">
        <p className="text-3xl font-bold">
          {selectedCheckbox}를 선택하셨습니다
        </p>
      </div>
      {/* 프로젝트 검색 결과 리스트 */}
      <div className="flex justify-center">
        {selectedCheckbox === "전체" && (
          <div className="">
            <div className="">
              {renderProjects(
                searchResult?.titleSearch || [],
                searchTerm,
                "제목"
              )}
            </div>
            <div>
              {renderProjects(
                searchResult?.descriptionSearch || [],
                searchTerm,
                "개요"
              )}
            </div>
            <div>
              {renderProjects(
                searchResult?.managerSearch || [],
                searchTerm,
                `관리자`
              )}
            </div>
            <div>
              {renderProjects(
                searchResult?.developerSearch || [],
                searchTerm,
                `개발자`
              )}
            </div>
          </div>
        )}
        {selectedCheckbox === "제목" &&
          renderProjects(searchResult?.titleSearch || [], searchTerm, "제목")}
        {selectedCheckbox === "개요" &&
          renderProjects(
            searchResult?.descriptionSearch || [],
            searchTerm,
            "개요"
          )}
        {selectedCheckbox === "관리자" &&
          renderProjects(
            searchResult?.managerSearch || [],
            searchTerm,
            `관리자`
          )}
        {selectedCheckbox === "개발자" &&
          renderProjects(
            searchResult?.developerSearch || [],
            searchTerm,
            `개발자`
          )}
      </div>
    </div>
  );
};

export default SearchProjectList;
