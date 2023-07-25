"use strict";
exports.__esModule = true;
var react_1 = require("react");
function DropdownMenu(props) {
    var buttonRef = react_1.useRef(null);
    var cursorPosition = props.cursorPosition;
    var handleChoiceLabelKeyPress = function (event) {
        // if(event.key === 'Home') { // 방향키 왼족
        //     console.log('왼')
        // }
        // else if(event.key === 'PageUp') { // 위쪽
        //     console.log('위')
        // }
        // else if(event.key === 'PageDown') { // 아래쪽
        //     console.log('아래')
        // }
        // else if(event.key === 'End') { // 오른쪽
        //     console.log('오')
        // }
    };
    var handleSelectLavelkeyPress = function (event) {
    };
    var handleSelectLavelClickEvent = function (event) {
        switch (buttonRef.current.textContent) {
            case "new":
                return (react_1["default"].createElement("div", null));
                break;
            case "update":
                break;
            case "stop":
                break;
            case "delete":
                break;
            case "etc":
                break;
        }
    };
    return (react_1["default"].createElement("div", { style: { position: 'absolute', top: cursorPosition.top, left: cursorPosition.left } },
        react_1["default"].createElement("div", { className: ' transition-all ease-in-out flex flex-col z-10 bg-lightPrimary divide-y divide-gray-200 rounded-lg shadow-md w-44 dark:bg-gray-700', onKeyDown: function (event) {
                handleChoiceLabelKeyPress(event);
                handleSelectLavelkeyPress(event);
            }, onClick: function (event) {
                handleSelectLavelClickEvent(event);
            } },
            react_1["default"].createElement("button", { ref: buttonRef, className: 'hover:bg-navy-50' }, "new"),
            react_1["default"].createElement("button", { ref: buttonRef, className: 'hover:bg-navy-50' }, "update"),
            react_1["default"].createElement("button", { ref: buttonRef, className: 'hover:bg-navy-50' }, "stop"),
            react_1["default"].createElement("button", { ref: buttonRef, className: 'hover:bg-navy-50' }, "delete"),
            react_1["default"].createElement("button", { ref: buttonRef, className: 'hover:bg-navy-50' }, "etc"))));
}
exports["default"] = DropdownMenu;

//# sourceMappingURL=DropdownMenu.js.map
