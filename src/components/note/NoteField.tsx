/**
 * @description 릴리즈 노트를 보여주는 컴포넌트
 */
import React from 'react'
import { useRecoilState } from 'recoil'
import LabelIndex from '../label/LabelIndex'
import data from '../label/mockData/NoteFiledMockData.json'
import { noteFieldState } from '../../context/atom'
import CommentIndex from '../comments/CommentIndex'

// 노트 필드안에 라벨 블록들과 댓글을 작성할 수 있도록 만들기
export default function NoteField() {

    // 백에서 라벨과 블록을 받는다.
    const [noteField, setNoteField] = useRecoilState(noteFieldState);
    setNoteField(data.mock.releaseNote);

    // block 부분 받기
    const noteFieldBlock = noteField.block?.map((block) => <LabelIndex NoteFieldBlock={block} />);

    // comment 부분 받기
    const noteFieldComment = noteField.comment?.map((comment) => <CommentIndex NoteFieldComment={comment} />);

    return (
        <div className='mt-2 mb-8'>
            {/* 기본적인 내용 (버전, 날짜 보여주는 부분) */}
            <h1 className='h-auto px-2 text-5xl font-extrabold leading-none tracking-tight text-navy-700 dark:text-white'>
                <span className='text-blue-700 dark:text-blue-500'>{noteField.version}</span> Release Note
            </h1>
            <hr className='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />
            {/* 라벨들 모아서 보여주는 부분 */}
            <div className='my-10 mt-2 px-2 text-gray-600'>
                {noteFieldBlock}
            </div>

            {/* 조회수 좋아요 보여주는 부분 */}
            <div className="flex w-full flex-col items-center gap-3 pb-8 pt-3 xl:flex-row">
                <ul className="flex flex-wrap items-center sm:flex-nowrap md:gap-10">
                    <li>
                        <a
                            target="blank"
                            className="text-base font-medium text-black-600 hover:text-gray-600"
                        >
                            View Count   <span className='text-blue-700 dark:text-blue-500'>10</span>
                        </a>
                    </li>
                    <li>
                        <a
                            target="blank"
                            className="text-base font-medium text-black-600 hover:text-gray-600"
                        >
                            Liked   <span className='text-blue-700 dark:text-blue-500'>4</span>
                        </a>
                    </li>
                </ul>
            </div>

            {/* 댓글 보여주는 부분 */}
            <div>
                <CommentIndex NoteFieldComment={noteField.comment} />
            </div>
        </div>
    )
}
