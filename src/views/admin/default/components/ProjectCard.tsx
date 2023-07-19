import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

import banner from "assets/img/profile/banner2.png";
import Card from "components/card";

enum UserRole {
  Subscriber = "구독자",
  Developer = "개발자",
  Manager = "관리자",
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
  const navigate = useNavigate();

  function handleClickProjectCard(projectId: number, projectRole: string) {
    const queryString = `projectId=${projectId}&role=${encodeURIComponent(
      projectRole
    )}&projectName=${projectName}`;
    const url = `/admin/dashboard?${queryString}`;

    navigate(url);
    console.log("handleClickProjectCard");
  }

  const handleClickManageButton = async (
    event: React.MouseEvent<HTMLButtonElement>, projectId: number
  ) => {
    event.stopPropagation();
    navigate(`/admin/project/manage?projectId=${projectId}`);
    console.log("handleClickManageButton");
  };
  const handleClickDeleteButton = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    console.log("handleClickDeleteButton");
  };

  return (
    <div>
      <button
        className="rounded-3xl pl-2 pr-2 hover:bg-gray-500 focus:ring-4 focus:ring-blue-300"
        onClick={() => handleClickProjectCard(projectId, projectRole)}
      >
        <Card extra={"items-center w-auto h-[95%] p-[16px] bg-cover"}>
          <div className="relative bottom-[1%] left-[43%]">
            {projectRole === UserRole.Manager ? (
              <button
                className="text-xl"
                onClick={(event) => {
                  event.stopPropagation();
                  handleClickManageButton(event, projectId);
                }}
              >
                ⚙️
              </button>
            ) : <button
            className="text-l"
            onClick={(event) => {
              event.stopPropagation();
              handleClickDeleteButton(event);
            }}
          >
            ❌
          </button>}
            
          </div>
          {/* Background and profile */}
          <div
            className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className="absolute right-[5%] top-[5%]">
              {projectRole === UserRole.Manager && (
                <>
                  {/* <MdStar className="mr-2 text-3xl text-yellow-500" /> */}
                  <p className="text-2xl">👑</p>
                </>
              )}
            </div>
            <div className="bg-white-400 absolute left-[0%] flex h-full w-full items-center overflow-hidden overflow-ellipsis whitespace-nowrap rounded-3xl border-none border-white dark:!border-navy-700">
              {/* <img className="h-full w-full rounded-full" src={avatar} alt="" /> */}
              <p className="ml-5 text-2xl font-bold text-white dark:text-white">
                {projectName}
              </p>
            </div>
            <div className="absolute right-[-5%] top-[70%] flex h-[47px] w-[47px] items-center justify-center rounded-full border-[4px] border-white bg-blue-400 dark:!border-navy-700 dark:!bg-navy-700">
              {/* <img className="h-full w-full rounded-full" src={avatar} alt="" /> */}
              <p className="text-2xl font-bold text-white dark:text-white">
                {projectMemberNumber}
              </p>
            </div>
          </div>

          {/* 프로젝트 개요 */}
          <div className="mt-4 flex flex-col items-center">
            <h1 className="text-l font-bold text-navy-700 dark:text-white">
              {projectDescription}
            </h1>
            <p className="text-l font-normal text-gray-600">프로젝트 개요</p>
          </div>

          {/* 프로젝트의 최신 릴리즈 노트 버전 */}
          <div className="mt-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
              {projectRecentRelease}
            </h1>
            <p className="text-l font-normal text-gray-600">최신 릴리즈 버전</p>
          </div>

          {/* 프로젝트의 생성 날짜 */}
          <div className="mt-4 flex flex-col items-center">
            <h1 className="text-m font-bold text-navy-700 dark:text-white">
              {projectCreateDate}
            </h1>
            <p className="text-l font-normal text-gray-600">생성 날짜</p>
          </div>
        </Card>
      </button>
    </div>
  );
}

export default ProjectCard;
