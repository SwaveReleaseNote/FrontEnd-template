"use strict";
exports.__esModule = true;
var react_1 = require("react");
var noteListData_json_1 = require("../mockData/noteListData.json");
var SidebarProject_1 = require("./SidebarProject");
var SidebarNote_1 = require("./SidebarNote");
function SidebarList(props) {
    var _a;
    var route = props.routeName;
    var activeRoute = props.activeRoute;
    var _b = react_1.useState(), projectOption = _b[0], setProjectOption = _b[1];
    var _c = react_1.useState(noteListData_json_1["default"].mock.projects), myProject = _c[0], setMyProject = _c[1];
    var _d = react_1.useState(), releaseNotesInCurrentProject = _d[0], setReleaseNotesInCurrentProject = _d[1];
    var changeProjectOption = function (event) {
        var value = event.target.value;
        var nowProjectName = value;
        setProjectOption(value);
        // 현재 내가 선택한 option의 프로젝트만 받아 올 것
        // 그 선택한 option 프로젝트가 위의 value 안에 담겨 있다.
        // TODO: 제대로 안담긴다.
        var currentProject = myProject.filter(function (value) { return value.projectName === nowProjectName; });
        setReleaseNotesInCurrentProject(currentProject);
    };
    var projects = myProject.map(function (project) { return react_1["default"].createElement(SidebarProject_1["default"], { myProject: project }); });
    var notes = (_a = releaseNotesInCurrentProject) === null || _a === void 0 ? void 0 : _a.map(function (note) {
        return note.releaseNotes.map(function (release) { return react_1["default"].createElement(SidebarNote_1["default"], { myNote: release }); });
    });
    return (react_1["default"].createElement("aside", { id: "sidebar-multi-level-sidebar" },
        react_1["default"].createElement("div", { className: "bg-gray-50 dark:bg-gray-800" },
            react_1["default"].createElement("ul", { className: "space-y-2 font-medium" },
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement("select", { onChange: changeProjectOption },
                        react_1["default"].createElement("option", { selected: true, disabled: true, className: "" + (activeRoute(route.path) === true
                                ? "font-bold text-navy-700 dark:text-white"
                                : "font-medium text-gray-600") }, "\uBC31\uC5D0\uC11C \uC811\uADFC\uD55C \uD604\uC7AC \uD504\uB85C\uC81D\uD2B8"),
                        projects)),
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement("div", { className: "text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" }, notes))))));
}
exports["default"] = SidebarList;

//# sourceMappingURL=SidebarList.js.map
