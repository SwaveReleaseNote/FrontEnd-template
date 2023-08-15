/*eslint-disable*/
import React from 'react'
import Input from './Input'
import List from './List'

export default function CommentIndex(): JSX.Element {
  return (
    // TODO: 개발자냐 구독자냐에 따라 seen check 볼 수 있게 만들기
    <div className='relative flex flex-col rounded-[20px]
     bg-white bg-clip-border shadow-3xl shadow-shadow-500
      dark:!bg-navy-800 dark:text-white dark:shadow-none'>
      {/* 댓글 리스트 부분 */}
      <div>
        <List />
      </div>

      {/* 댓글 작성 부분 */}
      <div>
        <Input />
      </div>
    </div>
  )
}
