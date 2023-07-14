"use strict";
exports.__esModule = true;
/**
 * @description 릴리즈 노트를 보여주는 컴포넌트
 */
var react_1 = require("react");
var recoil_1 = require("recoil");
var LabelIndex_1 = require("../label/LabelIndex");
var NoteFiledMockData_json_1 = require("../label/mockData/NoteFiledMockData.json");
var atom_1 = require("../../context/atom");
var CommentIndex_1 = require("../comments/CommentIndex");
// 노트 필드안에 라벨 블록들과 댓글을 작성할 수 있도록 만들기
function NoteField() {
    var _a, _b;
    // 백에서 라벨과 블록을 받는다.
    var _c = recoil_1.useRecoilState(atom_1.noteFieldState), noteField = _c[0], setNoteField = _c[1];
    setNoteField(NoteFiledMockData_json_1["default"].mock.releaseNote);
    // block 부분 받기
    var noteFieldBlock = (_a = noteField.block) === null || _a === void 0 ? void 0 : _a.map(function (block) { return react_1["default"].createElement(LabelIndex_1["default"], { NoteFieldBlock: block }); });
    // comment 부분 받기
    var noteFieldComment = (_b = noteField.comment) === null || _b === void 0 ? void 0 : _b.map(function (comment) { return react_1["default"].createElement(CommentIndex_1["default"], { NoteFieldComment: comment }); });
    return (react_1["default"].createElement("div", { className: 'mt-2 mb-8' },
        react_1["default"].createElement("h1", { className: 'h-auto px-2 text-5xl font-extrabold leading-none tracking-tight text-navy-700 dark:text-white' },
            react_1["default"].createElement("span", { className: 'text-blue-700 dark:text-blue-500' }, noteField.version),
            " Release Note"),
        react_1["default"].createElement("hr", { className: 'h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' }),
        react_1["default"].createElement("div", { className: 'my-10 mt-2 px-2 text-gray-600' }, noteFieldBlock),
        react_1["default"].createElement("div", { className: "flex w-full flex-col items-center gap-3 pb-8 pt-3 xl:flex-row" },
            react_1["default"].createElement("ul", { className: "flex flex-wrap items-center sm:flex-nowrap md:gap-10" },
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement("a", { target: "blank", className: "text-base font-medium text-black-600 hover:text-gray-600" },
                        "View Count   ",
                        react_1["default"].createElement("span", { className: 'text-blue-700 dark:text-blue-500' }, "10"))),
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement("a", { target: "blank", className: "text-base font-medium text-black-600 hover:text-gray-600" },
                        "Liked   ",
                        react_1["default"].createElement("span", { className: 'text-blue-700 dark:text-blue-500' }, "4"))))),
        react_1["default"].createElement("div", null, noteFieldComment)));
}
exports["default"] = NoteField;

//# sourceMappingURL=NoteField.js.map
