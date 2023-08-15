/*eslint-disable*/
import {commentState, noteFieldState} from 'context/atom';
import React, {useState} from 'react';
import { useRecoilState } from 'recoil';
import data from '../label/mockData/NoteFiledMockData.json';
import tmpImage from '../../assets/img/avatars/avatar5.png';
import Card from 'components/card';

interface Comment {
  context: string,
  lastModifiedDate: string,
  name: string,
  releaseNoteId: number,
  version: string
}

export default function List(): JSX.Element {
  // 댓글 내용
  const [selectNote, setSelectNote] = useRecoilState(noteFieldState);

  const view = selectNote.comment.map((comment) => {
    return (
      <Card key={comment.releaseNoteId} extra={'w-full p-4 h-full'}>
        <div className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <div className="flex items-center">
            <div className="">
              <img className="h-[83px] w-[83px] rounded-lg" src={tmpImage} alt="" />
            </div>
            <div className="ml-4">
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {comment.context}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                BackEnd Department
                <a
                  className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                  href=" "
                >
                  {comment.name}
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
