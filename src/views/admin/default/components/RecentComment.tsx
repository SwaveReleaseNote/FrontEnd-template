import PieChart from "components/charts/PieChart";
import { pieChartData, pieChartOptions } from "variables/charts";
import Card from "components/card";
import RecentCommentList from "./RecentCommentList";

const RecentComment = () => {
  return (
    <Card extra="rounded-[20px] p-3 h-full">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Last Comment & Mention
          </h4>
        </div>

        <div className="mb-6 flex items-center justify-center">
          <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
            <option value="monthly">All</option>
            <option value="yearly">Comment</option>
            <option value="weekly">Mention</option>
          </select>
        </div>
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        <RecentCommentList />
      </div>
    </Card>
  );
};

export default RecentComment;
