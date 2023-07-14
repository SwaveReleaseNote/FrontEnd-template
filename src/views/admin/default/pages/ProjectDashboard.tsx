import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PieChartCard from "../components/PieChartCard2";
import MemberStatusCard from "../components/MemberStatusCard";
import RecentComment from "../components/RecentComment";
import SearchRelease from "../components/SearchRelease";

const ProjectDashboard: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    console.log("projectId:", projectId);
    axios
      .get(`localhost:8080/api/project/dashboard/${projectId}`)
      .then((response: { data: any }) => {
        const projectId = response.data.id;
        console.log(response.data);
      })
      .catch((error: any) => {
        console.error("Error fetching project dashboard:", error);
        console.log("Mocking data");
      });
  }, []);

  return (
    <div className="mt-4 grid grid-cols-3 gap-5 rounded-[20px]">
      <div className="col-span-1">
        <MemberStatusCard projectId={{
                  id: parseInt(projectId)
              }} />
      </div>
      <div className="col-span-1">
        <PieChartCard projectId={{
          id: parseInt(projectId)
        }} />
      </div>
      <div className="row-span-2">
        <SearchRelease />
      </div>
      <div className="col-span-2">
        <RecentComment />
      </div>
    </div>
  );
};

export default ProjectDashboard;
