"use strict";
exports.__esModule = true;
var react_1 = require("react");
var noteListData_json_1 = require("../mockData/noteListData.json");
var SidebarProject_1 = require("./SidebarProject");
var SidebarNote_1 = require("./SidebarNote");
function SidebarList(props) {
    var _a, _b;
    var route = props.routeName;
    var activeRoute = props.activeRoute;
    var _c = react_1.useState(), selectedProject = _c[0], setSelectedProject = _c[1];
    var _d = react_1.useState(noteListData_json_1["default"].mock.projects), myProject = _d[0], setMyProject = _d[1];
    var _e = react_1.useState(), releaseNoteList = _e[0], setReleaseNoteList = _e[1];
    var _f = react_1.useState(), releaseNotesInCurrentProject = _f[0], setReleaseNotesInCurrentProject = _f[1];
    var handleSelectProject = function (event) {
        var value = event.target.value;
        setSelectedProject(myProject.filter(function (currentProject) { return currentProject.projectName === value; })[0]);
        console.log(selectedProject);
        setReleaseNoteList(selectedProject.releaseNotes);
    };
    var notes = (_a = releaseNoteList) === null || _a === void 0 ? void 0 : _a.map(function (release) { return react_1["default"].createElement(SidebarNote_1["default"], { myNote: release }); });
    var projects = (_b = myProject) === null || _b === void 0 ? void 0 : _b.map(function (project) { return react_1["default"].createElement(SidebarProject_1["default"], { myProject: project }); });
    return (react_1["default"].createElement("div", { className: "bg-gray-50 dark:bg-gray-800" },
        react_1["default"].createElement("ul", { className: "space-y-2 font-medium" },
            react_1["default"].createElement("li", null,
                react_1["default"].createElement("select", { onChange: handleSelectProject }, projects)),
            react_1["default"].createElement("li", null,
                react_1["default"].createElement("div", { className: "text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" }, notes)))));
}
exports["default"] = SidebarList;

//# sourceMappingURL=SidebarList.js.map
