import Card from "../../../../components/card";
import { loginState } from "../../../../context/atom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import React, { useState, useEffect } from "react";

type Comment = {
  context: string;
  lastModifiedDate: string;
  name: string;
};

type RecentReleaseNote = {
  comment: Comment[];
  content: string;
  count: number;
  creator: string;
  lastModified: string;
  liked: number;
  releaseDate: string;
  summary: string;
  version: string;
};

const RecentRelease = () => {
  const login = useRecoilValue(loginState);
  const [recentReleaseNote, setRecentReleaseNote] = useState<
    RecentReleaseNote | undefined
  >(); // Set initial state as undefined

  // fetch All Members
  const fetchRecentReleaseNote = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/project/release/load_recent`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log(JSON.stringify(response.data, null, "\t"));
      setRecentReleaseNote(response.data);
    } catch (error) {
      console.error("Error fetching recent release note:", error);
      console.log("Mocking");
      mockFetchRecentRelease();
    }
  };

  const mockFetchRecentRelease = () => {
    // Simulate API response with mock data
    const mockResponse: RecentReleaseNote = {
      comment: [
        {
          context: "ASUS도 너프 해야한다.",
          lastModifiedDate: "2023-07-08",
          name: "김성국",
        },
      ],
      content: "DELL의 성능을 조정했습니다.",
      count: 3,
      creator: "전강훈",
      lastModified: "2023-07-09",
      liked: -1,
      releaseDate: "2023-07-08",
      summary: "DELL의 성능을 조정했습니다.",
      version: "1.0.0",
    };

    setRecentReleaseNote(mockResponse);
  };

  // First Rendering
  useEffect(() => {
    console.log("Recent Release Page rendered");
    fetchRecentReleaseNote();
  }, []);

  return (
    <Card extra={"w-full h-full p-3 mt-2"}>
      <div className="mb-8 mt-2 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          <p className="text-4xl">🆕</p>Recent Release Note
        </h4>
        {/* Conditional rendering based on whether recentReleaseNote is defined */}
        {recentReleaseNote ? (
          <>
            <h4 className="text-l px-2 font-bold text-navy-700 dark:text-white">
              version: {recentReleaseNote.version}
            </h4>
            <h4 className="text-l px-2 font-bold text-navy-700 dark:text-white">
              lastModified: {recentReleaseNote.lastModified}
            </h4>
            <h4 className="text-l px-2 font-bold text-navy-700 dark:text-white">
              releaseDate: {recentReleaseNote.releaseDate}
            </h4>
            <h4 className="text-l px-2 font-bold text-navy-700 dark:text-white">
              summary: {recentReleaseNote.summary}
            </h4>
            <h4 className="text-l px-2 font-bold text-navy-700 dark:text-white">
              liked: {recentReleaseNote.liked}
            </h4>
            <h4 className="text-l px-2 font-bold text-navy-700 dark:text-white">
              creator: {recentReleaseNote.creator}
            </h4>
            <h4 className="text-l px-2 font-bold text-navy-700 dark:text-white">
              content: {recentReleaseNote.content}
            </h4>
            <div className="overflow-y-scroll">
              {recentReleaseNote.comment ? (
                recentReleaseNote.comment.map((comment) => (
                  <div className="mb-8 mt-2 w-full" key={comment.name}>
                    <h4 className="px-2 text-l font-bold text-navy-700 dark:text-white">
                      {comment.name}: {comment.context}
                    </h4>
                    {/* <p className="mt-2 px-2 text-base">
                          {comment.context}
                        </p> */}
                    <p className="mt-2 px-2 text-base text-gray-600">
                      {comment.lastModifiedDate}
                    </p>
                  </div>
                ))
              ) : (
                <p>댓글이 없습니다</p>
              )}
            </div>
          </>
        ) : (
          <p>Loading recent release note...</p>
        )}
      </div>
    </Card>
  );
};

export default RecentRelease;
