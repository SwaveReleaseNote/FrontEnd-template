"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
function SidebarProject(props) {
    var _a = react_1.useState(props.myProject), myProject = _a[0], setMyProject = _a[1];
    var location = react_router_dom_1.useLocation();
    // verifies if routeName is the one active (in browser input)
    var activeRoute = function (routeName) {
        return location.pathname.includes(routeName);
    };
    // TODO: 프로젝트 선택할때 마다 프로젝트 세줄 요약 라우팅되도록
    // TODO: 선택되어있는 프로젝트 릴리즈노트 리스트 보여지도록
    return (react_1["default"].createElement("option", { className: (activeRoute(myProject.projectName) === true
            ? "font-bold text-navy-700 dark:text-white"
            : "font-medium text-gray-600") + " leading-1 ml-4 flex ", value: myProject.projectName }, myProject.projectName));
}
exports["default"] = SidebarProject;

//# sourceMappingURL=SidebarProject.js.map
