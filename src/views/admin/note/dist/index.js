"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Version_1 = require("./components/Version");
var Date_1 = require("./components/Date");
var SideMenubar_1 = require("./components/SideMenubar");
var InputText_1 = require("./components/InputText");
function Index() {
    var mockLatestVersion = "3.6.5";
    return (react_1["default"].createElement("div", { className: "h-full grid-cols-1 gap-5 2xl:grid-cols-3" },
        react_1["default"].createElement("div", { className: "ml-5 mt-5 text-2xl font-bold" },
            react_1["default"].createElement("p", null,
                " Release Note Version ",
                react_1["default"].createElement("span", { className: "text-navy-600" }, "4.0.1"))),
        react_1["default"].createElement("div", { className: "flex justify-between col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2" },
            react_1["default"].createElement(InputText_1["default"], null),
            react_1["default"].createElement(SideMenubar_1["default"], { width: 280 },
                react_1["default"].createElement("div", { className: "mt-5 flex-row justify-center h-auto " },
                    react_1["default"].createElement(Version_1["default"], { latestVersion: mockLatestVersion }),
                    react_1["default"].createElement(Date_1["default"], null))))));
}
exports["default"] = Index;

//# sourceMappingURL=index.js.map
