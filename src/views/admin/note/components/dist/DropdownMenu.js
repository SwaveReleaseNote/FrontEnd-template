"use strict";
exports.__esModule = true;
var react_1 = require("react");
function DropdownMenu(props) {
    var cursorPosition = props.cursorPosition;
    return (react_1["default"].createElement("div", { style: { position: 'absolute', top: cursorPosition.top, left: cursorPosition.left } },
        react_1["default"].createElement("div", { className: ' transition-all ease-in-out flex flex-col z-10 bg-lightPrimary divide-y divide-gray-200 rounded-lg shadow-md w-44 dark:bg-gray-700' },
            react_1["default"].createElement("button", { className: 'hover:bg-navy-50' }, "new"),
            react_1["default"].createElement("button", { className: 'hover:bg-navy-50' }, "update"),
            react_1["default"].createElement("button", { className: 'hover:bg-navy-50' }, "stop"),
            react_1["default"].createElement("button", { className: 'hover:bg-navy-50' }, "delete"),
            react_1["default"].createElement("button", { className: 'hover:bg-navy-50' }, "etc"))));
}
exports["default"] = DropdownMenu;

//# sourceMappingURL=DropdownMenu.js.map
