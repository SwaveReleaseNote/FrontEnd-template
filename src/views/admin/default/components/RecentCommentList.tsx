import Card from '../../../../components/card';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from './LoadingComponent ';
import api from 'context/api';
import { useQuery } from 'react-query';

interface Props {
   projectId: number;
}

interface Comment {
   name: string;
   context: string;
   // 추후 Date 형식 변환 필요
   lastModifiedDate: string;
   releaseNoteId: number;
   version: string;
}

const RecentCommentList: React.FC<Props> = ({ projectId }) => {
   const navigate = useNavigate();

   const fetchRecentComments = async (): Promise<Comment[]> => {
      try {
         const response = await api.get(`project/${projectId}/release-note/recent-comments`);
         return response.data.comments;
      } catch (error) {
         console.error('Error fetching release comment list:', error);
         return mockFechtRecentComments();
      }
   };

   const { data: commentList, isLoading } = useQuery<Comment[]>(['recentComments', projectId], fetchRecentComments);

   const mockFechtRecentComments = (): Comment[] => {
      // Simulate API response with mock data
      const mockResponse: Comment[] = [
         {
            context: 'ASUS도 너프 해야한다.',
            lastModifiedDate: '2023-07-08',
            name: '김성국',
            releaseNoteId: 1,
            version: '1.0.0',
         },
         {
            context: 'ASUS도 너프 해야한다.',
            lastModifiedDate: '2023-07-08',
            name: '김성국',
            releaseNoteId: 2,
            version: '1.0.0',
         },
         {
            context: 'ASUS도 너프 해야한다.',
            lastModifiedDate: '2023-07-08',
            name: '김성국',
            releaseNoteId: 3,
            version: '1.0.0',
         },
         {
            context: 'ASUS도 너프 해야한다.',
            lastModifiedDate: '2023-07-08',
            name: '김성국',
            releaseNoteId: 4,
            version: '1.0.0',
         },
         {
            context: 'ASUS도 너프 해야한다.',
            lastModifiedDate: '2023-07-08',
            name: '김성국',
            releaseNoteId: 5,
            version: '1.0.0',
         },
         {
            context: 'ASUS도 너프 해야한다.',
            lastModifiedDate: '2023-07-08',
            name: '김성국',
            releaseNoteId: 6,
            version: '1.0.0',
         },
      ];

      return mockResponse;
   };

   function handleClickComment(releaseNoteId: number): void {
      // 추후 프론트 릴리즈 노트 보여주는 곳으로 맵핑
      const url = `/admin/project/releaseNote?releaseNoteId=${releaseNoteId}`;

      navigate(url);
      console.log('handleClickComment');
   }

   return (
      <>
         {isLoading ? (
            <LoadingComponent fontSize="m" />
         ) : (
            <Card extra={'w-full h-full p-3 mt-2'}>
               {/* Header */}
               <div className="overflow-y-scroll">
                  {(commentList != null) && commentList.length > 0 ? (
                     commentList.map(comment => (
                        <div
                           onClick={() => {
                              handleClickComment(comment.releaseNoteId);
                           }}
                           className="rounded-xl bg-white p-2 font-bold text-blue-600 text-start hover:cursor-pointer hover:underline dark:bg-navy-700"
                           key={comment.name}>
                           <h2 className="text-xl">Version: {comment.version}</h2>
                           <h4 className="text-l overflow-hidden px-2 text-navy-700 dark:text-white">
                              {comment.name}: {comment.context}
                           </h4>
                           <p className="mt-2 px-2 text-base text-gray-600">{comment.lastModifiedDate}</p>
                        </div>
                     ))
                  ) : (
                     <div className="text-black-400 flex h-full w-full items-center justify-center gap-10 text-xl font-bold dark:text-white">
                        -작성된 댓글이 없습니다-
                     </div>
                  )}
               </div>
            </Card>
         )}
      </>
   );
};

export default RecentCommentList;
