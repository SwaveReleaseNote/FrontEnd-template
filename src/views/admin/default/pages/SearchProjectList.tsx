import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Checkbox from "components/checkbox";
import RecentRelease from "../components/RecentRelease";

const SearchProjectList: React.FC = () => {
  const [searchResult, setSearchResult] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState("");
  const location = useLocation();
  const searchTerm = location.state.searchTerm;

  useEffect(() => {
    console.log("searchTerm:", searchTerm);
    console.log("Search Result component rendered");
    axios
      .get(`/api/project/search/${searchTerm}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response: { data: { search: string } }) => {
        const search = response.data.search;
        setSearchResult(search);
      })
      .catch((error: any) => {
        console.error("Error fetching search result:", error);
        setSearchResult("test");
      });
    console.log("searchResult:", searchResult);
  }, []);

  const handleCheckboxChange = (value: string) => {
    setSelectedCheckbox(value);
  };

  return (
    <div className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none">
      <header className="relative flex items-center justify-center pt-4">
        <div className="mb-10 flex text-3xl font-bold text-navy-700 dark:text-white">
          Search Result
          {/* {searchTerm} */}
        </div>
      </header>
      <div className="text-1xl flex justify-center gap-3 font-bold">
        <label className="text-gray-900">
          <input
            type="checkbox"
            checked={selectedCheckbox === "전체"}
            onChange={() => handleCheckboxChange("전체")}
            className="mr-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          전체
        </label>
        <label className="dark text-gray-900">
          <input
            type="checkbox"
            checked={selectedCheckbox === "제목"}
            onChange={() => handleCheckboxChange("제목")}
            className="mr-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          제목
        </label>
        <label className="dark text-gray-900">
          <input
            type="checkbox"
            checked={selectedCheckbox === "관리자"}
            onChange={() => handleCheckboxChange("관리자")}
            className="mr-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          관리자
        </label>
        <label className="dark text-gray-900">
          <input
            type="checkbox"
            checked={selectedCheckbox === "개발자"}
            onChange={() => handleCheckboxChange("개발자")}
            className="mr-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          개발자
        </label>
        <label className="dark text-gray-900">
          <input
            type="checkbox"
            checked={selectedCheckbox === "개요"}
            onChange={() => handleCheckboxChange("개요")}
            className="mr-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          개요
        </label>
      </div>
      <div>
        <RecentRelease />
      </div>
    </div>
  );
};

export default SearchProjectList;
