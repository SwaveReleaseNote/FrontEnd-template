"use strict";
exports.__esModule = true;
var MiniCalendar_1 = require("components/calendar/MiniCalendar");
var WeeklyRevenue_1 = require("views/admin/default/components/WeeklyRevenue");
var TotalSpent_1 = require("views/admin/default/components/TotalSpent");
var PieChartCard_1 = require("views/admin/default/components/PieChartCard");
var io_1 = require("react-icons/io");
var io5_1 = require("react-icons/io5");
var md_1 = require("react-icons/md");
var Widget_1 = require("components/widget/Widget");
var CheckTable_1 = require("views/admin/default/components/CheckTable");
var ComplexTable_1 = require("views/admin/default/components/ComplexTable");
var DailyTraffic_1 = require("views/admin/default/components/DailyTraffic");
var TaskCard_1 = require("views/admin/default/components/TaskCard");
var tableDataCheck_1 = require("./variables/tableDataCheck");
var tableDataComplex_1 = require("./variables/tableDataComplex");
var Dashboard = function () {
    return (React.createElement("div", null,
        React.createElement("div", { className: "mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6" },
            React.createElement(Widget_1["default"], { icon: React.createElement(md_1.MdBarChart, { className: "h-7 w-7" }), title: "Earnings", subtitle: "$340.5" }),
            React.createElement(Widget_1["default"], { icon: React.createElement(io5_1.IoDocuments, { className: "h-6 w-6" }), title: "Spend this month", subtitle: "$642.39" }),
            React.createElement(Widget_1["default"], { icon: React.createElement(md_1.MdBarChart, { className: "h-7 w-7" }), title: "Sales", subtitle: "$574.34" }),
            React.createElement(Widget_1["default"], { icon: React.createElement(md_1.MdDashboard, { className: "h-6 w-6" }), title: "Your Balance", subtitle: "$1,000" }),
            React.createElement(Widget_1["default"], { icon: React.createElement(md_1.MdBarChart, { className: "h-7 w-7" }), title: "New Tasks", subtitle: "145" }),
            React.createElement(Widget_1["default"], { icon: React.createElement(io_1.IoMdHome, { className: "h-6 w-6" }), title: "Total Projects", subtitle: "$2433" })),
        React.createElement("div", { className: "mt-5 grid grid-cols-1 gap-5 md:grid-cols-2" },
            React.createElement(TotalSpent_1["default"], null),
            React.createElement(WeeklyRevenue_1["default"], null)),
        React.createElement("div", { className: "mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2" },
            React.createElement("div", null,
                React.createElement(CheckTable_1["default"], { tableData: tableDataCheck_1["default"] })),
            React.createElement("div", { className: "grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2" },
                React.createElement(DailyTraffic_1["default"], null),
                React.createElement(PieChartCard_1["default"], null)),
            React.createElement(ComplexTable_1["default"], { tableData: tableDataComplex_1["default"] }),
            React.createElement("div", { className: "grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2" },
                React.createElement(TaskCard_1["default"], null),
                React.createElement("div", { className: "grid grid-cols-1 rounded-[20px]" },
                    React.createElement(MiniCalendar_1["default"], null))))));
};
exports["default"] = Dashboard;

//# sourceMappingURL=index.js.map
