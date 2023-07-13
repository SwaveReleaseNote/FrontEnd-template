"use strict";
exports.__esModule = true;
var react_1 = require("react");
function SidebarProject(props) {
    var _a = react_1.useState(props.myProject), myProject = _a[0], setMyProject = _a[1];
    return (react_1["default"].createElement("option", { className: "leading-1 ml-4 flex", value: myProject.projectName }, myProject.projectName));
}
exports["default"] = SidebarProject;

//# sourceMappingURL=SidebarProject.js.map
