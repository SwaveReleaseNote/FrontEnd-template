"use strict";
exports.__esModule = true;
var react_1 = require("react");
// TODO: 제대로 안담기는 문제 해결 필요
// TODO: Major, Minor, Patch 에 따라 분리과정 필요
function SidebarNote(props) {
    var _a = react_1.useState(props.myNote), releaseNote = _a[0], setReleaseNote = _a[1];
    console.log(releaseNote);
    return (react_1["default"].createElement("p", { className: 'leading-1 ml-4 flex' }, releaseNote.version));
}
exports["default"] = SidebarNote;

//# sourceMappingURL=SidebarNote.js.map
