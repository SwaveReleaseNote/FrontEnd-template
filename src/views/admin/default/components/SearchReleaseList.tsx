import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css.css";

import { FiSearch } from "react-icons/fi";

type Props = {
  projectId: {
    id: number;
  };
};

type MemberStatus = {
  memberName: string;
  status: boolean;
};

const SearchReleaseList: React.FC<Props> = ({ projectId }) => {
  const [memberStatus, setMemberStatus] = useState<MemberStatus[]>([]);

  useEffect(() => {
    console.log("Members Status Project id:", projectId.id);
    const fetchData = async () => {
      //
      try {
        const response = await axios.get(
          `/api/project/dashboard/meberStatus/${projectId.id}`
        );

        const data: MemberStatus[] = response.data;
        setMemberStatus(data);
      } catch (error) {
        console.error("Error fetching project Member Status:", error);
        console.log("Mocking data");

        const mockResponse: MemberStatus[] = [
          { memberName: "New", status: true },
          { memberName: "Update", status: false },
          { memberName: "Bug Fixed", status: false },
          { memberName: "Delete", status: true },
          { memberName: "Stop", status: true },
          { memberName: "Stop", status: true },
          { memberName: "Stop", status: true },
          { memberName: "Stop", status: true },
          { memberName: "Stop", status: true },
          { memberName: "Stop", status: true },
          { memberName: "Stop", status: true },
          { memberName: "Stop", status: true },
          { memberName: "Stop", status: true },
          { memberName: "Stop", status: true },
          { memberName: "Stop", status: true },
          { memberName: "Stop", status: true },
          { memberName: "Stop", status: true },
          { memberName: "Stop", status: true },
          { memberName: "Stop", status: true },
          { memberName: "Stop", status: true },
          { memberName: "Stop", status: true },
          { memberName: "Stop", status: true },
        ];

        setMemberStatus(mockResponse);
      }
    };

    fetchData();
  }, [projectId]);

  return (
    <div
      className={`!z-5 relative my-[5px] flex h-full w-full flex-col rounded-2xl bg-white bg-clip-border px-2 pb-6 pt-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none`}
    >
      <div className="flex h-full w-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white">
        <p className="pl-3 pr-2 text-xl">
          <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
        </p>
        <input
          type="text"
          placeholder="릴리즈 노트 검색"
          className="block h-full w-full rounded-3xl bg-lightPrimary text-sm text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white"
        />
      </div>
      <table className="mt-2">
        <div>
        <thead>
          <tr className="!border-px !border-gray-400 text-gray-500">
            <th className="border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start">
              Label
            </th>
            <th className="pl-10 border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start">
              Version
            </th>
          </tr>
        </thead>
        </div>
        <div className="overflow-auto" style={{ maxHeight: "550px" }}>
          <tbody>
            {memberStatus.map((member) => (
              // <tr key={member.memberName}>
              <tr>
                <td className="py-2">{member.memberName}</td>
                <td className="pl-[50px] flex items-center py-2">
                  {member.status ? "온라인" : "오프라인"}
                </td>
              </tr>
            ))}
          </tbody>
        </div>
      </table>
    </div>
  );
};

export default SearchReleaseList;
