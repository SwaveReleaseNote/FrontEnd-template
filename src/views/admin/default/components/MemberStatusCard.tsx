import React, { useState, useEffect } from 'react';
import LoadingComponent from './LoadingComponent ';
import api from 'context/api';
import { useQuery } from 'react-query';

interface Props {
   projectId: {
      id: number;
   };
}

interface MemberStatus {
   memberId: number;
   memberName: string;
   online: boolean;
}

const MemberStatusCard: React.FC<Props> = ({ projectId }) => {
   const [isLoading, setIsLoading] = useState(true);

   const fetchMemberStatus = async (): Promise<MemberStatus[]> => {
      try {
         const response = await api.get(`/project/memberStatus/${projectId.id}`);
         return response.data;
      } catch (error) {
         console.error('Error fetching project Member Status:', error);
         console.log('Mocking data');
         return mockFetchMemberStatus();
      }
   };

   const memberStatusQuery = useQuery<MemberStatus[]>('memberStatus', fetchMemberStatus);

   const mockFetchMemberStatus = (): MemberStatus[] => {
      // Simulate API response with mock data
      const mockResponse: MemberStatus[] = [
         { memberId: 1, memberName: '함건욱', online: true },
         { memberId: 2, memberName: '김기현', online: false },
         { memberId: 3, memberName: '김성국', online: false },
         { memberId: 4, memberName: '강준희', online: true },
         { memberId: 5, memberName: '전강훈', online: true },
         { memberId: 6, memberName: '이승섭', online: true },
         { memberId: 7, memberName: '이승섭', online: true },
         { memberId: 8, memberName: '이승섭', online: true },
         { memberId: 9, memberName: '이승섭', online: true },
         { memberId: 10, memberName: '이승섭', online: true },
         { memberId: 11, memberName: '이승섭', online: true },
         { memberId: 12, memberName: '이승섭', online: true },
      ];

      return mockResponse;
   };

   useEffect(() => {
      if (memberStatusQuery.isSuccess) {
         setIsLoading(false);
      }
   }, [memberStatusQuery.isSuccess, isLoading]);

   return (
      <div
         className={`!z-5 relative flex h-full w-full flex-col rounded-[20px] bg-white bg-clip-border px-6 pb-6 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none sm:overflow-x-auto`}>
         <div className="relative flex items-center justify-between pt-4">
            <div className="text-xl font-bold text-navy-700 dark:text-white">Member Status</div>
         </div>
         <table className="mt-2 w-full overflow-x-scroll xl:overflow-x-hidden">
            <thead>
               <tr className="!border-px !border-gray-400 text-gray-500">
                  <th className="border-b-[1px] border-gray-200 pb-2 pt-4 text-start">NAME</th>
                  <th className="border-b-[1px] border-gray-200 pb-2 pl-10 pr-10 pt-4 text-start">STATUS</th>
               </tr>
            </thead>
         </table>
         {!isLoading ? (
            <div className="overflow-auto" style={{ maxHeight: '250px' }}>
               <table>
                  <tbody>
                     {memberStatusQuery?.data?.map(member => (
                        // <tr key={member.memberName}>
                        <tr key={member.memberId}>
                           <td className="py-2">{member.memberName}</td>
                           <td className="flex items-center py-2 pl-[50px]">{member.online ? '온라인' : '오프라인'}</td>
                           <td>
                              <div
                                 className={`ml-5 h-4 w-4 rounded-full ${
                                    member.online ? 'bg-green-400' : 'bg-red-400'
                                 }`}></div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         ) : (
            <LoadingComponent fontSize="m" />
         )}
      </div>
   );
};

export default MemberStatusCard;
