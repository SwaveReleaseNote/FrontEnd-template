import Card from 'components/card';
import RecentCommentList from './RecentCommentList';
import React, { useState } from 'react';

interface Props {
   projectId: {
      id: number;
   };
}

const RecentComment: React.FC<Props> = ({ projectId }) => {
   const [selectedValue, setSelectedValue] = useState('All');

   const handleChangeSelectOption = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      setSelectedValue(event.target.value);
   };

   return (
      <Card extra="rounded-[20px] p-3 h-full">
         <div className="flex flex-row justify-between px-3 pt-2">
            <div>
               <h4 className="text-lg font-bold text-navy-700 dark:text-white">Last Comment & Mention</h4>
            </div>

            <div className="mb-6 flex items-center justify-center">
               <select
                  value={selectedValue}
                  onChange={handleChangeSelectOption}
                  className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
                  <option value="All">All</option>
                  <option value="Comment">Comment</option>
                  <option value="Mention">Mention</option>
               </select>
            </div>
         </div>

         <div className="mb-auto flex h-[220px] w-full items-center justify-center">
            <RecentCommentList projectId={projectId.id} />
         </div>
      </Card>
   );
};

export default RecentComment;
