import Card from "../../../../components/card";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {
    projectId: number;
};

type CommentList = {
  releaseVersion: string;
  content: string;
  mention: string;
};

const RecentCommentList: React.FC<Props> = ({ projectId }) => {
  const [commentList, setCommentList] = useState<CommentList[]>([]);

  useEffect(() => {
    console.log("Search CommentList by Project id:", projectId);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/project/${projectId}/release/comment/load_recent`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
          // { data: searchComment }
        );
        const data: CommentList[] = response.data;
        setCommentList(data);
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

        const mockResponse: CommentList[] = [
          {
            releaseVersion: generateRandomVersion(),
            content:  `${generateRandomContent()}`,
            mention: `@${generateRandomName()}`
          },
          {
            releaseVersion: generateRandomVersion(),
            content:  `${generateRandomContent()}`,
            mention: `@${generateRandomName()}`
          },
          {
            releaseVersion: generateRandomVersion(),
            content:  `${generateRandomContent()}`,
            mention: `@${generateRandomName()}`
          },
          {
            releaseVersion: generateRandomVersion(),
            content:  `${generateRandomContent()}`,
            mention: ``
          },
          {
            releaseVersion: generateRandomVersion(),
            content:  `${generateRandomContent()}`,
            mention: `@${generateRandomName()}`
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
      <div className="overflow-y-scroll">
        {commentList.map((comment) => (
          <div className="mb-8 mt-2 w-full" key={comment.releaseVersion}>
            <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
              Release Note Version {comment.releaseVersion}
            </h4>
            <p className="mt-2 px-2 text-base text-gray-600">
              {comment.mention} {comment.content}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentCommentList;
