"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Version_1 = require("./components/Version");
var Date_1 = require("./components/Date");
function index() {
    var latestVersion = "3.6.5";
    console.log(latestVersion);
    return (react_1["default"].createElement("div", { className: "h-full grid-cols-1 gap-5 2xl:grid-cols-3" },
        react_1["default"].createElement("div", { className: "col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2" },
            react_1["default"].createElement("div", { className: "mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2" },
                react_1["default"].createElement(Version_1["default"], { latestVersion: latestVersion }),
                react_1["default"].createElement(Date_1["default"], null)),
            react_1["default"].createElement("div", null, "Input Text"))));
}
exports["default"] = index;

//# sourceMappingURL=index.js.map
