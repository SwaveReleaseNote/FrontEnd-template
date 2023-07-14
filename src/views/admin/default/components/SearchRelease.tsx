import SearchReleaseList from "./SearchReleaseList";

const PieChartCard = () => {
  return (
    <div
      className={`!z-5 relative flex h-full w-full flex-col rounded-[20px] bg-white bg-clip-border px-6 pb-6 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none sm:overflow-x-auto`}
    >
      <div className="relative flex items-center justify-between pt-4">
        <div>
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Search Release
          </h4>
        </div>

        <div className="mb-6 flex items-center justify-center">
          <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
            <option value="monthly">New</option>
            <option value="yearly">Update</option>
            <option value="weekly">Stop</option>
            <option value="monthly">Bug Fixed</option>
            <option value="yearly">Delete</option>
          </select>
        </div>
      </div>
      <div className="">
      <SearchReleaseList projectId={{
        id: 0
      }} />
      </div>
    </div>
  );
};

export default PieChartCard;
