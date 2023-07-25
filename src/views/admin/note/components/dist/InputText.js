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
var recoil_1 = require("recoil");
var DropdownMenu_1 = require("./DropdownMenu");
var atom_1 = require("context/atom");
function InputText() {
    var _a = react_1.useState([{ id: 1, content: "" },]), noteBlocks = _a[0], setNoteBlocks = _a[1];
    var _b = react_1.useState(false), showDropdown = _b[0], setShowDropdown = _b[1];
    var _c = react_1.useState({ top: 0, left: 0 }), cursorPosition = _c[0], setCursorPosition = _c[1];
    var _d = react_1.useState(), showLabelImage = _d[0], setShowLabelImage = _d[1];
    var _e = recoil_1.useRecoilState(atom_1.labelState), labelImage = _e[0], setLabeImage = _e[1];
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
    var handleTextAreaHeight = function (event, id) {
        textRef.current.style.height = 'auto';
        textRef.current.style.height = textRef.current.scrollHeight + 'px';
    };
    var handleShowLabelsSlashKeyPress = function (event, id) {
        if (event.key === '/') {
            // '/' 키가 눌렸을 때 드롭다운 메뉴를 표시
            var _a = event.currentTarget, selectionStart = _a.selectionStart, offsetLeft = _a.offsetLeft, offsetTop = _a.offsetTop, offsetHeight = _a.offsetHeight;
            setCursorPosition({
                top: offsetTop + offsetHeight,
                left: offsetLeft + selectionStart * 8
            });
            setShowDropdown(true);
        }
        else if (event.key === 'Backspace' || event.key === 'Escape') {
            // 'Escape' 키가 눌렸을 때 드롭다운 메뉴를 닫음
            setShowDropdown(false);
        }
    };
    var handleShowLabel = function () {
    };
    return (react_1["default"].createElement("div", { className: ' ml-10 mt-5 w-full flex-col' },
        noteBlocks.map(function (noteBlock) { return (react_1["default"].createElement("textarea", { rows: 1, ref: textRef, id: "note-block", key: noteBlock.id, value: noteBlock.content, onChange: function (event) { return handleContentChange(event, noteBlock.id); }, onKeyDown: function (event) {
                handleShowLabelsSlashKeyPress(event, noteBlock.id);
                handleCreateBlockEnterKeyPress(event, noteBlock.id);
            }, onInput: function (event) { return handleTextAreaHeight(event, noteBlock.id); }, className: 'w-[80%] resize-none bg-lightPrimary outline-none', placeholder: 'text\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694' })); }),
        showDropdown && (react_1["default"].createElement(DropdownMenu_1["default"], { cursorPosition: cursorPosition, onClose: function () { return setShowDropdown(false); } }))));
}
exports["default"] = InputText;

//# sourceMappingURL=InputText.js.map
