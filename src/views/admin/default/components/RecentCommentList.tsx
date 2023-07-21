import Card from "../../../../components/card";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {
  projectId: number;
};

type Comment = {
  name: string;
  context: string;
  // 추후 Date 형식 변환 필요
  lastModifiedDate: string;
};

const RecentCommentList: React.FC<Props> = ({ projectId }) => {
  const [commentList, setCommentList] = useState<Comment[]>([]);

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

        // Mock comment list
        function generateRandomVersion() {
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * 10);
          const z = Math.floor(Math.random() * 10);
          return `${x}.${y}.${z}`;
        }

        const mockResponse: Comment[] = [
          {
            name: "함건욱",
            context: "11111",
            lastModifiedDate: "2023-07-21 00:15:59",
          },
          {
            name: "함건욱",
            context: "Good ~ !",
            lastModifiedDate: "2023-07-21 00:14:41",
          },
          {
            name: "함건욱",
            context: "Good ~ !",
            lastModifiedDate: "2023-07-21 00:14:40",
          },
          {
            name: "함건욱",
            context: "Good ~ !",
            lastModifiedDate: "2023-07-21 00:14:40",
          },
          {
            name: "함건욱",
            context: "Good ~ !",
            lastModifiedDate: "2023-07-21 00:14:39",
          },
        ];

        setCommentList(mockResponse);
      }
    };

    fetchData();
  }, [projectId]);

  function generateRandomName() {
    // List of random names or usernames
    const names = ["함건욱", "김기현", "김성국", "전강훈", "이승섭", "강준희"];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  }

  function generateRandomContent() {
    // List of random comments or content phrases
    const comments = [
      "최신 업데이트에 대한 훌륭한 작업입니다. 정말 인상적입니다!",
      "최근 변경 사항이 흥미로워요. 잘 하셨습니다!",
      "프로젝트에서 멋진 일을 해냈습니다. 새로운 기능들이 환상적입니다!",
      "당신의 노고와 헌신이 이 업데이트에 반영되어 있습니다. 계속해서 잘 하세요!",
      "이번 릴리스에 대한 팀의 뛰어난 작업입니다. 정말 놀랍습니다!",
      "말할 수 밖에 없는 훌륭한 노력입니다. 관련된 모든 분들에게 박수를 보냅니다!",
    ];
    const randomIndex = Math.floor(Math.random() * comments.length);
    return comments[randomIndex];
  }

  return (
    <Card extra={"w-full h-full p-3 mt-2"}>
      {/* Header */}
      {/* 어떤 릴리즈 노트에 대한 코멘트인지 필요하지않나?? */}
      <div className="overflow-y-scroll">
        {commentList.map((comment) => (
          <div className="mb-8 mt-2 w-full" key={comment.name}>
            <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
              {comment.name}: {comment.context}
            </h4>
            {/* <p className="mt-2 px-2 text-base">
              {comment.context}
            </p> */}
            <p className="mt-2 px-2 text-base text-gray-600">
              {comment.lastModifiedDate}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentCommentList;
