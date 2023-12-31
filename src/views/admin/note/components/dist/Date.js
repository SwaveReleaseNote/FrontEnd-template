"use strict";
exports.__esModule = true;
var card_1 = require("components/card");
var react_1 = require("react");
var MiniCalendar_1 = require("components/calendar/MiniCalendar");
function Date() {
    return (react_1["default"].createElement(card_1["default"], { extra: "w-full p-4 h-full" },
        react_1["default"].createElement("div", { className: ' flex flex-col items-center' },
            react_1["default"].createElement("header", { className: "relative flex items-center justify-between pt-4" },
                react_1["default"].createElement("div", { className: "text-2xl font-bold text-navy-700 dark:text-white" }, "Date Card Test")),
            react_1["default"].createElement("hr", { className: ' mt-3 flex w-full mb-5 dark:text-gray-800' }),
            react_1["default"].createElement(MiniCalendar_1["default"], null))));
}
exports["default"] = Date;

//# sourceMappingURL=Date.js.map
