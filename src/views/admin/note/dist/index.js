"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var Version_1 = require("./components/Version");
var Date_1 = require("./components/Date");
var SideMenubar_1 = require("./components/SideMenubar");
function Index() {
    var mockLatestVersion = "3.6.5";
    var _a = react_1.useState([
        { id: 1, content: "" },
    ]), noteBlocks = _a[0], setNoteBlocks = _a[1];
    var textRef = react_1.useRef(null);
    react_1.useLayoutEffect(function () {
        textRef.current.focus();
    });
    var addNewNoteBlock = function () {
        setNoteBlocks(function (prev) {
            return (__spreadArrays(prev, [{ id: prev[prev.length - 1].id + 1, content: '' }]));
        });
    };
    var handleCreateBlockEnterKeyPress = function (event, id) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addNewNoteBlock();
        }
    };
    var handleContentChange = function (event, id) {
        var updatedNoteBlocks = noteBlocks.map(function (noteBlock) {
            return noteBlock.id === id ? __assign(__assign({}, noteBlock), { content: event.target.value }) : noteBlock;
        });
        setNoteBlocks(updatedNoteBlocks);
    };
    // 엔터 누를 때 마다 textarea 나오도록 만들기
    // const newNoteBlock = document.getElementById("note-block");
    // function createNewNoteContent() {
    //   const newNoteContent = document.createElement("textarea");
    //   newNoteContent.classList.add("note-content");
    //   newNoteBlock.appendChild(newNoteContent);
    //   newNoteContent.focus();
    // };
    // document.addEventListener("keydown", function(event) {
    //   if (event.key === "Enter") {
    //     event.preventDefault();
    //     createNewNoteContent();
    //   }
    // })
    return (react_1["default"].createElement("div", { className: "h-full grid-cols-1 gap-5 2xl:grid-cols-3" },
        react_1["default"].createElement("div", { className: "flex justify-between col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2" },
            react_1["default"].createElement("div", { className: 'mt-5 w-full' },
                noteBlocks.map(function (noteBlock) { return (react_1["default"].createElement("textarea", { ref: textRef, id: "note-block", key: noteBlock.id, value: noteBlock.content, onChange: function (e) { return handleContentChange(e, noteBlock.id); }, onKeyDown: function (e) { return handleCreateBlockEnterKeyPress(e, noteBlock.id); } })); }),
                react_1["default"].createElement("textarea", { id: "note-content", placeholder: 'test' })),
            react_1["default"].createElement(SideMenubar_1["default"], { width: 280 },
                react_1["default"].createElement("div", { className: "mt-5 flex-row justify-center h-auto " },
                    react_1["default"].createElement(Version_1["default"], { latestVersion: mockLatestVersion }),
                    react_1["default"].createElement(Date_1["default"], null))))));
}
exports["default"] = Index;

//# sourceMappingURL=index.js.map
