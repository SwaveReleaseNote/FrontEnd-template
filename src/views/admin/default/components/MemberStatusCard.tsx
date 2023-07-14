import React, { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  projectId: {
    id: number;
  };
};

type MemberStatus = {
  memberName: string;
  status: boolean;
};

const MemberStatusCard: React.FC<Props> = ({ projectId }) => {
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
          { memberName: "함건욱", status: true },
          { memberName: "김기현", status: false },
          { memberName: "김성국", status: false },
          { memberName: "강준희", status: true },
          { memberName: "전강훈", status: true },
          { memberName: "이승섭", status: true },
          { memberName: "이승섭", status: true },
          { memberName: "이승섭", status: true },
          { memberName: "이승섭", status: true },
          { memberName: "이승섭", status: true },
          { memberName: "이승섭", status: true },
          { memberName: "이승섭", status: true },
        ];

        setMemberStatus(mockResponse);
      }
    };

    fetchData();
  }, [projectId]);

  return (
    <div
      className={`!z-5 relative flex h-full w-full flex-col rounded-[20px] bg-white bg-clip-border px-6 pb-6 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none sm:overflow-x-auto`}
    >
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Member Status
        </div>
      </div>
      <table className="mt-2 w-full w-full overflow-x-scroll xl:overflow-x-hidden">
        <div>
          <thead>
            <tr className="!border-px !border-gray-400 text-gray-500">
              <th className="border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start">
                NAME
              </th>
              <th className="pl-10 border-b-[1px] border-gray-200 pb-2 pr-10 pt-4 text-start">
                STATUS
              </th>
            </tr>
          </thead>
        </div>
        <div className="overflow-auto" style={{ maxHeight: "250px" }}>
          <tbody>
            {memberStatus.map((member) => (
              // <tr key={member.memberName}>
              <tr>
                <td className="py-2">{member.memberName}</td>
                <td className="pl-[50px] flex items-center py-2">
                  {member.status ? "온라인" : "오프라인"}
                </td>
                <td>
                  <div
                    className={`ml-5 h-4 w-4 rounded-full ${
                      member.status ? "bg-green-400" : "bg-red-400"
                    }`}
                  ></div>
                </td>
              </tr>
            ))}
          </tbody>
        </div>
      </table>
    </div>
  );
};

export default MemberStatusCard;
