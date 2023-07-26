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
  version: string;
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
          `http://localhost:8080/api/project/${projectId}/release-note/recent-comments`,
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
            "context": "ASUS도 너프 해야한다.",
            "lastModifiedDate": "2023-07-08",
            "name": "김성국",
            "releaseNoteId": 1,
            "version": "1.0.0"
          },
          {
            "context": "ASUS도 너프 해야한다.",
            "lastModifiedDate": "2023-07-08",
            "name": "김성국",
            "releaseNoteId": 2,
            "version": "1.0.0"
          },
          {
            "context": "ASUS도 너프 해야한다.",
            "lastModifiedDate": "2023-07-08",
            "name": "김성국",
            "releaseNoteId": 3,
            "version": "1.0.0"
          },
          {
            "context": "ASUS도 너프 해야한다.",
            "lastModifiedDate": "2023-07-08",
            "name": "김성국",
            "releaseNoteId": 4,
            "version": "1.0.0"
          },
          {
            "context": "ASUS도 너프 해야한다.",
            "lastModifiedDate": "2023-07-08",
            "name": "김성국",
            "releaseNoteId": 5,
            "version": "1.0.0"
          },
          {
            "context": "ASUS도 너프 해야한다.",
            "lastModifiedDate": "2023-07-08",
            "name": "김성국",
            "releaseNoteId": 6,
            "version": "1.0.0"
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
          <div className="overflow-y-scroll">
            {commentList.length > 0
              ? commentList.map((comment) => (
                    <div
                      onClick={() => handleClickComment(comment.releaseNoteId)}
                      className="dark:bg-navy-700 rounded-xl hover:underline bg-white p-2 font-bold text-blue-600 text-start hover:cursor-pointer"
                      key={comment.name}
                    >
                      <h2 className="text-xl">Version: {comment.version}</h2>
                      <h4 className="overflow-hidden px-2 text-l text-navy-700 dark:text-white">
                        {comment.name}: {comment.context}
                      </h4>
                      <p className="mt-2 px-2 text-base text-gray-600">
                        {comment.lastModifiedDate}
                      </p>
                    </div>
                ))
              : 
              <div className="dark:text-white text-black-400 flex h-full w-full items-center justify-center gap-10 text-xl font-bold">
                작성된 댓글이 없습니다
              </div>}
          </div>
        </Card>
      )}
    </>
  );
};

export default RecentCommentList;
