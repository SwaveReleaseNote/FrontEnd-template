import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css.css";

import { FiSearch } from "react-icons/fi";
import LoadingComponent from "./LoadingComponent ";

import New from "assets/img/label/NEW.png";
import Delete from "assets/img/label/DELETE.png";
import Update from "assets/img/label/UPDATE.png";
import Stop from "assets/img/label/STOP.png";
import Etc from "assets/img/label/ETC.png";

type Props = {
  searchRelease: {
    projectId: number;
    label: string;
  };
};

type ReleaseList = {
  label: string;
  releaseNoteId: number;
  context: string;
  version: string;
};

const SearchReleaseList: React.FC<Props> = ({ searchRelease }) => {
  const navigate = useNavigate();
  const [releaseList, setReleaseList] = useState<ReleaseList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const labelToIconMap: { [key: string]: string } = {
    New: New,
    Delete: Delete,
    Update: Update,
    Stop: Stop,
    Etc: Etc,
  };

  useEffect(() => {
    console.log("Release Search Project id:", searchRelease.projectId);
    const fetchData = async () => {
      //
      try {
        const response = await axios.get(
          `http://localhost:8080/api/project/${searchRelease.projectId}/release-note/label/filter`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
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
          {
            label: "Delete",
            version: generateRandomVersion(),
            releaseNoteId: 1,
            context:
              "시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.시스템 내에서 악성 코드를 삭제했습니다.",
          },
          {
            label: "Delete",
            version: generateRandomVersion(),
            releaseNoteId: 2,
            context: "시스템 내에서 악성 코드를 삭제했습니다.",
          },
          {
            label: "Delete",
            version: generateRandomVersion(),
            releaseNoteId: 3,
            context: "시스템 내에서 악성 코드를 삭제했습니다.",
          },
          {
            label: "Delete",
            version: generateRandomVersion(),
            releaseNoteId: 4,
            context: "시스템 내에서 악성 코드를 삭제했습니다.",
          },
          {
            label: "Delete",
            version: generateRandomVersion(),
            releaseNoteId: 5,
            context: "시스템 내에서 악성 코드를 삭제했습니다.",
          },
          {
            label: "Delete",
            version: generateRandomVersion(),
            releaseNoteId: 6,
            context: "시스템 내에서 악성 코드를 삭제했습니다.",
          },
          {
            label: "Delete",
            version: generateRandomVersion(),
            releaseNoteId: 7,
            context: "시스템 내에서 악성 코드를 삭제했습니다.",
          },
        ];

        setReleaseList(mockResponse);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching
      }
    };

    fetchData();
  }, [searchRelease]);

  // Filter the releaseList based on the label value
  const filteredReleaseList = releaseList.filter(
    (release) => release.label === searchRelease.label
  );

  function handleClickReleaseNote(releaseNoteId: number) {
    // 추후 프론트 릴리즈 노트 보여주는 곳으로 맵핑
    const url = `/admin/project/releaseNote?releaseNoteId=${releaseNoteId}`;

    navigate(url);
    console.log("handleClickReleaseNote");
  }

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
              Search Result
            </th>
          </tr>
        </thead>
      </table>

      {isLoading ? (
        <LoadingComponent fontSize="m" />
      ) : (
        <div className="h-[70vh] overflow-auto">
          <table>
            <tbody>
              {filteredReleaseList.length === 0 ? (
                <tr>
                  <td className="dark:bg-navy-700 py-2 pb-2 pr-4 pt-4 text-start" colSpan={2}>
                    <img
                      src={labelToIconMap[searchRelease.label]}
                      alt={searchRelease.label}
                      className="h-[5vh] w-[10vh] rounded-xl"
                    />
                    <p className="pl-3 mt-3">
                      작성된 릴리즈 노트가 없습니다.
                      </p>
                  </td>
                </tr>
              ) : (
                filteredReleaseList.map((release) => (
                  <tr key={release.version}
                      onClick={() =>
                        handleClickReleaseNote(release.releaseNoteId)
                      }
                      className="hover:underline m-1 mr-3 rounded-2xl p-1 text-blue-600 text-start hover:cursor-pointer"
                    >
                      <td className="dark:bg-navy-700 rounded-xl bg-white p-2 text-blue-600 text-start hover:cursor-pointer">
                        <div>
                          <p className="font-bold">
                            Version: {release.version}
                          </p>
                          <img
                            src={labelToIconMap[searchRelease.label]}
                            alt={release.label}
                            className="mb-1 mt-1 h-[5vh] w-[10vh] rounded-xl"
                          />
                        </div>
                        <div className="h-[6vh] overflow-hidden text-sm">
                          {release.context}
                        </div>
                      </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchReleaseList;
