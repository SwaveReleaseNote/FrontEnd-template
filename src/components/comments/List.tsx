import { commentState } from 'context/atom';
import React from 'react';
import { useRecoilState } from 'recoil';
import data from '../label/mockData/NoteFiledMockData.json';
import tmpImage from '../../assets/img/avatars/avatar5.png';
import Card from 'components/card';

interface Comment {
  writer: string;
  content: string;
  id: number; // Assuming each comment has a unique identifier (e.g., "id")
}

export default function List(): JSX.Element {
  // 댓글 내용
  const [comments, setComments] = useRecoilState<Comment[]>(commentState);
  setComments(data.mock.releaseNote.comment);

  const view = comments?.map((comment) => {
    return (
      <Card key={comment.id} extra={'w-full p-4 h-full'}>
        <div className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <div className="flex items-center">
            <div className="">
              <img className="h-[83px] w-[83px] rounded-lg" src={tmpImage} alt="" />
            </div>
            <div className="ml-4">
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {comment.content}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                BackEnd Department
                <a
                  className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                  href=" "
                >
                  {comment.writer}
                </a>
              </p>
            </div>
          </div>
        </div>
      </Card>
    );
  });

  return <div>{view}</div>;
}
