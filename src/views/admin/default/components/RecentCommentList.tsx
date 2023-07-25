import Card from "../../../../components/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "./LoadingComponent ";

type Props = {
  projectId: number;
};

type Comment = {
  name: string;
  context: string;
  // 추후 Date 형식 변환 필요
  lastModifiedDate: string;
  releaseNoteId: number;
};

const RecentCommentList: React.FC<Props> = ({ projectId }) => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Search CommentList by Project id:", projectId);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/project/1/release/comment/load_recent`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(JSON.stringify(response.data, null, "\t"));
        setCommentList(response.data.comments);
        console.log(JSON.stringify(commentList, null, "\t"));
      } catch (error) {
        console.error("Error fetching release comment list:", error);
        console.log("Mocking data");

        const mockResponse: Comment[] = [
          {
            name: "함건욱",
            context: "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
            lastModifiedDate: "2023-07-21 00:15:59",
            releaseNoteId: 1,
          },
          {
            name: "함건욱",
            context: "Good ~ !5",
            lastModifiedDate: "2023-07-21 00:14:41",
            releaseNoteId: 5,
          },
          {
            name: "함건욱",
            context: "Good ~ !4",
            lastModifiedDate: "2023-07-21 00:14:40",
            releaseNoteId: 4,
          },
          {
            name: "함건욱",
            context: "Good ~ !3",
            lastModifiedDate: "2023-07-21 00:14:40",
            releaseNoteId: 3,
          },
          {
            name: "함건욱",
            context: "Good ~ !2",
            lastModifiedDate: "2023-07-21 00:14:39",
            releaseNoteId: 2,
          },
        ];

        setCommentList(mockResponse);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching
      }
    };

    fetchData();
  }, [projectId]);

  function handleClickComment(releaseNoteId: number) {
    // 추후 프론트 릴리즈 노트 보여주는 곳으로 맵핑
    const url = `/admin/project/releaseNote?releaseNoteId=${releaseNoteId}`;

    navigate(url);
    console.log("handleClickComment");
  }

  return (
    <>
      {isLoading ? (
        <LoadingComponent fontSize="m" />
      ) : (
        <Card extra={"w-full h-full p-3 mt-2"}>
          {/* Header */}
          {/* 어떤 릴리즈 노트에 대한 코멘트인지 필요하지않나?? */}
          <div className="overflow-y-scroll">
            {commentList.map((comment) => (
              <div className="m-1 mr-3 rounded-2xl p-1 text-blue-600 text-start hover:cursor-pointer hover:bg-indigo-500">
                <div
                  onClick={() => handleClickComment(comment.releaseNoteId)}
                  className="rounded-xl bg-white p-2 text-blue-600 text-start hover:cursor-pointer"
                  key={comment.name}
                >
                  <h4 className="overflow-hidden px-2 text-xl font-bold text-navy-700 dark:text-white">
                    {comment.name}: {comment.context}
                  </h4>
                  {/* <p className="mt-2 px-2 text-base">
              {comment.context}
            </p> */}
                  <p className="mt-2 px-2 text-base text-gray-600">
                    {comment.lastModifiedDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
};

export default RecentCommentList;
