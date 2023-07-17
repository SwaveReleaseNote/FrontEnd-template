import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css.css";

import { FiSearch } from "react-icons/fi";

type Props = {
  searchRelease: {
    projectId: number;
    label: string;
  };
};

type ReleaseList = {
  label: string;
  version: string;
};

const SearchReleaseList: React.FC<Props> = ({ searchRelease }) => {
  const [releaseList, setReleaseList] = useState<ReleaseList[]>([]);

  useEffect(() => {
    console.log("Release Search Project id:", searchRelease.projectId);
    const fetchData = async () => {
      //
      try {
        const response = await axios.get(
          `/api/project/dashboard/searchRelease`,
          { data: searchRelease } // Pass searchRelease as data
        );

        const data: ReleaseList[] = response.data;
        setReleaseList(data);
      } catch (error) {
        console.error("Error fetching release list:", error);
        console.log("Mocking data");

        function generateRandomVersion() {
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * 10);
          const z = Math.floor(Math.random() * 10);
          return `${x}.${y}.${z}`;
        }

        const mockResponse: ReleaseList[] = [
          { label: searchRelease.label, version: generateRandomVersion() },
          { label: searchRelease.label, version: generateRandomVersion() },
          { label: searchRelease.label, version: generateRandomVersion() },
          { label: searchRelease.label, version: generateRandomVersion() },
          { label: searchRelease.label, version: generateRandomVersion() },
          { label: searchRelease.label, version: generateRandomVersion() },
          { label: searchRelease.label, version: generateRandomVersion() },
          { label: searchRelease.label, version: generateRandomVersion() },
          { label: searchRelease.label, version: generateRandomVersion() },
          { label: searchRelease.label, version: generateRandomVersion() },
          { label: searchRelease.label, version: generateRandomVersion() },
          { label: searchRelease.label, version: generateRandomVersion() },
          { label: searchRelease.label, version: generateRandomVersion() },
          { label: searchRelease.label, version: generateRandomVersion() },
          { label: searchRelease.label, version: generateRandomVersion() },
          { label: searchRelease.label, version: generateRandomVersion() },
          { label: searchRelease.label, version: generateRandomVersion() },
          { label: searchRelease.label, version: generateRandomVersion() },
        ];

        setReleaseList(mockResponse);
      }
    };

    fetchData();
  }, [searchRelease]);

  return (
    <div
      className={`!z-5 relative my-[5px] flex h-full w-full flex-col rounded-2xl bg-white bg-clip-border px-2 pb-6 pt-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none`}
    >
      <div className="flex w-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white">
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
        <thead>
          <tr className="!border-px !border-gray-400 text-gray-500">
            <th className="border-b-[1px] border-gray-200 pb-2 pt-4 text-start">
              Label
            </th>
            <th className="border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start">
              Version
            </th>
          </tr>
        </thead>
      </table>
      <div className="overflow-auto" style={{ maxHeight: "550px" }}>
        <table>
          <tbody>
            {releaseList.map((release) => (
              // <tr key={member.label}>
              <tr key={release.version}>
                <td className="py-2">{release.label}</td>
                <td className="ml-3 flex items-center py-2 pl-[50px]">
                  {release.version}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchReleaseList;
