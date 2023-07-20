import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck";
import tableDataComplex from "./variables/tableDataComplex";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecentRelease from "./components/RecentRelease";
import ProjectCard from "./components/ProjectCard";

enum UserRole {
  Subscriber = "Subscriber",
  Developer = "Developer",
  Manager = "Manager",
}

interface Project {
  id: number;
  role: UserRole;
  name: string;
  description: string;
  createDate: string;
  count: number;
  recentReleaseVersion: string;
}

const Dashboard = () => {
  const navigate = useNavigate();

  //page 처리
  const [limit, setLimit] = useState(3);
  const [manageDevelopPage, setManageDevelopPage] = useState(1);
  const [subscribePage, setSubscribePage] = useState(1);
  const manageDevelopOffset = (manageDevelopPage - 1) * limit;
  const subscribeOffset = (subscribePage - 1) * limit;
  const [isLoading, setIsLoading] = useState(true);

  //탭으로 보여줄 리스트 구분
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [managerDeveloperProjectList, setManagerDeveloperProjectList] =
    useState<Project[]>([]);
  const [subscriberProjectList, setSubscriberProjectList] = useState<Project[]>(
    []
  );

  const displayedManageDevelopList = managerDeveloperProjectList.slice(
    manageDevelopOffset,
    manageDevelopOffset + limit
  );
  const displayedSubscribeList = subscriberProjectList.slice(
    subscribeOffset,
    subscribeOffset + limit
  );

  const manageDevelopLastPage = Math.ceil(
    managerDeveloperProjectList.length / limit
  );
  const subscribeLastPage = Math.ceil(subscriberProjectList.length / limit);

  const handleClickListTabButton = () => {
    console.log("Button Cliked");
    setManageDevelopPage(1);
    setSubscribePage(1);
    setIsSubscribeOpen(!isSubscribeOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/project/load/all`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const fetchedProjectList = response.data;
        console.log(fetchedProjectList);

        const managerDeveloperProjects = fetchedProjectList.filter(
          (project: { role: string }) =>
            project.role === UserRole.Manager ||
            project.role === UserRole.Developer
        );

        const subscriberProjects = fetchedProjectList.filter(
          (project: { role: string }) => project.role === UserRole.Subscriber
        );

        setProjectList(fetchedProjectList);
        setManagerDeveloperProjectList(managerDeveloperProjects);
        setSubscriberProjectList(subscriberProjects);
      } catch (error) {
        console.error("Error fetching project List:", error);
        console.log("Mocking data");
        mockFetchProjectList();
      } finally {
        setIsLoading(false); // Set loading state to false after fetching
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (manageDevelopPage < 1) {
        setManageDevelopPage(manageDevelopLastPage || 1);
      } else if (!displayedManageDevelopList?.[0]) {
        setManageDevelopPage(1);
      }

      if (subscribePage < 1) {
        setSubscribePage(subscribeLastPage || 1);
      } else if (!displayedSubscribeList?.[0]) {
        setSubscribePage(1);
      }
      console.log("manageDevelopPage page:", manageDevelopPage);
      console.log("subscribePage page:", subscribePage);
    }
  }, [
    manageDevelopPage,
    subscribePage,
    displayedManageDevelopList,
    displayedSubscribeList,
    isLoading,
  ]);

  const mockFetchProjectList = () => {
    // Simulate API response with mock data
    const fetchedProjectList = [
      {
        id: 1,
        role: UserRole.Manager,
        name: "Manager1",
        description: "사내 릴리즈 노트 공유 시스템",
        createDate: "Wed Jul 12 2023",
        recentReleaseVersion: "3.6.7",
        count: 5,
      },
      {
        id: 2,
        role: UserRole.Manager,
        name: "Manager2",
        description: "사내 릴리즈 노트 공유 시스템",
        createDate: "Wed Jul 12 2023",
        recentReleaseVersion: "3.6.7",
        count: 5,
      },
      {
        id: 3,
        role: UserRole.Developer,
        name: "Developer1",
        description: "사내 릴리즈 노트 공유 시스템",
        createDate: "Wed Jul 12 2023",
        recentReleaseVersion: "3.6.7",
        count: 5,
      },
      {
        id: 4,
        role: UserRole.Developer,
        name: "Developer2",
        description: "사내 릴리즈 노트 공유 시스템",
        createDate: "Wed Jul 12 2023",
        recentReleaseVersion: "3.6.7",
        count: 5,
      },
      {
        id: 5,
        role: UserRole.Developer,
        name: "Developer3",
        description: "사내 릴리즈 노트 공유 시스템",
        createDate: "Wed Jul 12 2023",
        recentReleaseVersion: "3.6.7",
        count: 5,
      },
      {
        id: 6,
        role: UserRole.Developer,
        name: "Developer4",
        description: "사내 릴리즈 노트 공유 시스템",
        createDate: "Wed Jul 12 2023",
        recentReleaseVersion: "3.6.7",
        count: 5,
      },
      {
        id: 7,
        role: UserRole.Developer,
        name: "Developer5",
        description: "사내 릴리즈 노트 공유 시스템",
        createDate: "Wed Jul 12 2023",
        recentReleaseVersion: "3.6.7",
        count: 5,
      },
      {
        id: 8,
        role: UserRole.Subscriber,
        name: "사내 릴리즈 노트 공유 시스템",
        description: "사내 릴리즈 노트 공유 시스템",
        createDate: "Wed Jul 12 2023",
        recentReleaseVersion: "3.6.7",
        count: 5,
      },
    ];

    const managerDeveloperProjects = fetchedProjectList.filter(
      (project: { role: string }) =>
        project.role === UserRole.Manager || project.role === UserRole.Developer
    );

    const subscriberProjects = fetchedProjectList.filter(
      (project: { role: string }) => project.role === UserRole.Subscriber
    );

    setProjectList(fetchedProjectList);
    setManagerDeveloperProjectList(managerDeveloperProjects);
    setSubscriberProjectList(subscriberProjects);
  };

  function handleClickProjectCreateButton() {
    console.log("project create button clicked");
    navigate("/admin/project/create");
  }

  return (
    <div>
      <div className="pt-3">
        <div>
          <button
            onClick={handleClickListTabButton}
            className={`ml-10 rounded-t-3xl ${
              isSubscribeOpen
                ? "bg-white-200  dark:!bg-navy-600"
                : "bg-gray-100  dark:!bg-navy-700"
            } p-2`}
          >
            Develop
          </button>
          <button
            onClick={handleClickListTabButton}
            className={`ml-1 mr-80 rounded-t-3xl ${
              isSubscribeOpen
                ? "bg-gray-100  dark:!bg-navy-700"
                : "bg-white-200  dark:!bg-navy-600"
            } p-2`}
          >
            Subsribe
          </button>
        </div>

        <div className="items-right absolute right-[4.5%] top-[15.5%]">
          <button
            onClick={handleClickProjectCreateButton}
            type="button"
            className="mb-2 mr-2 rounded-3xl bg-gray-300 px-5 py-2.5 text-sm font-bold font-medium text-white hover:bg-gray-800 focus:ring-4 focus:ring-blue-300"
          >
            만들기
          </button>
        </div>
      </div>
      {/* Project Card List */}
      <div className="flex justify-center rounded-3xl bg-gray-100 pt-5 dark:!bg-navy-700">
        <div className="flex items-center">
          <button
            onClick={() => {
              if (isSubscribeOpen) {
                setSubscribePage(subscribePage - 1);
              } else {
                setManageDevelopPage(manageDevelopPage - 1);
              }
            }}
            type="button"
            className="ml-5 rounded-full bg-blue-200 bg-blue-700 p-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:!bg-navy-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="h-4 w-4 rotate-180 transform"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
        </div>

        {!isSubscribeOpen ? (
          <div className="ml-10 mr-10 grid h-[50%] w-full grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
            {displayedManageDevelopList.map((project) => (
              <ProjectCard
                key={project.id}
                projectId={project.id}
                projectName={project.name}
                projectDescription={project.description}
                projectMemberNumber={project.count}
                projectRecentRelease={project.recentReleaseVersion}
                projectCreateDate={project.createDate}
                projectRole={project.role}
              />
            ))}
          </div>
        ) : (
          <div className="ml-10 mr-10 grid h-[50%] w-full grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
            {displayedSubscribeList.map((project) => (
              <ProjectCard
                key={project.id}
                projectId={project.id}
                projectName={project.name}
                projectDescription={project.description}
                projectMemberNumber={project.count}
                projectRecentRelease={project.recentReleaseVersion}
                projectCreateDate={project.createDate}
                projectRole={project.role}
              />
            ))}
          </div>
        )}

        <div className="flex items-center">
          <button
            onClick={() => {
              if (isSubscribeOpen) {
                setSubscribePage(subscribePage + 1);
              } else {
                setManageDevelopPage(manageDevelopPage + 1);
              }
            }}
            type="button"
            className="mr-5 rounded-full bg-blue-200 bg-blue-700 p-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:!bg-navy-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
        </div>
      </div>

      <div>
        <RecentRelease />
      </div>

      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Earnings"}
          subtitle={"$340.5"}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Spend this month"}
          subtitle={"$642.39"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sales"}
          subtitle={"$574.34"}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Your Balance"}
          subtitle={"$1,000"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"New Tasks"}
          subtitle={"145"}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Projects"}
          subtitle={"$2433"}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          <CheckTable tableData={tableDataCheck} />
        </div>

        {/* Traffic chart & Pie Chart */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>

        {/* Complex Table , Task & Calendar */}

        <ComplexTable tableData={tableDataComplex} />

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
