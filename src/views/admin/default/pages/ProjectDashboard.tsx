import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PieChartCard from "../components/PieChartCard2";
import MemberStatusCard from "../components/MemberStatusCard";
import RecentComment from "../components/RecentComment";
import SearchRelease from "../components/SearchRelease";

enum UserRole {
  Subscriber = "Subscriber",
  Developer = "Developer",
  Manager = "Manager",
}

// 프론트에서 역할 이름을 주지 말고
// project Id만 주고 이 프로젝트에서의 역할이 뭔지, 프로젝트 이름, 개요, isDeleted 여부 받아서 처리하기

const ProjectDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const projectId = searchParams.get("projectId");
  const role = searchParams.get("role");
  const projectName = searchParams.get("projectName");
  const [isProjectDeleted, setIsProjectDeleted] = useState(false);

  useEffect(() => {
    console.log("projectId:", projectId);
    console.log("role:", role);

    const fetchProjectData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/project/${projectId}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        const projectData = response.data;
        setIsProjectDeleted(projectData.isDeleted);
        console.log(JSON.stringify(projectData, null, "\t"));
      } catch (error) {
        console.error("Error fetching project dashboard:", error);
      }
    };

    fetchProjectData();
  }, [projectId, role]);

  const handleClickManageButton = async (
    event: React.MouseEvent<HTMLButtonElement>,
    projectId: number
  ) => {
    event.stopPropagation();
    navigate(`/admin/project/manage?projectId=${projectId}`);
    console.log("handleClickManageButton");
  };

  return (
    <>
      {isProjectDeleted ? (
        <div className="text-4xl text-red-600 font-bold flex justify-center mt-40">Oops! This project has been deleted.</div>
      ) : (
        <div>
          <div className="h-100% mt-4 flex w-auto justify-items-center gap-5 rounded-[20px] bg-white bg-clip-border p-6 text-4xl font-bold shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none sm:overflow-x-auto">
            <p className="w-[95vh] overflow-hidden">{projectName}</p>
            {role === UserRole.Manager && (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleClickManageButton(event, Number(projectId));
                }}
                className="text-xl"
              >
                프로젝트 관리⚙️
              </button>
            )}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-5 rounded-[20px]">
            <div className="col-span-1">
              <MemberStatusCard
                projectId={{
                  id: parseInt(projectId),
                }}
              />
            </div>
            <div className="col-span-1">
              <PieChartCard
                projectId={{
                  id: parseInt(projectId),
                }}
              />
            </div>
            <div className="row-span-2">
              <SearchRelease
                projectId={{
                  id: parseInt(projectId),
                }}
              />
            </div>
            <div className="col-span-2">
              <RecentComment
                projectId={{
                  id: parseInt(projectId),
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
