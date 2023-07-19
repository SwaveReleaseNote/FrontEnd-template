"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Input_1 = require("./Input");
var List_1 = require("./List");
function CommentIndex(props) {
    var comment = props.NoteFieldComment;
    console.log(comment.content);
    return (
    // TODO: 개발자냐 구독자냐에 따라 seen check 볼 수 있게 만들기
    react_1["default"].createElement("div", { className: 'relative flex flex-col rounded-[20px]\r\n     bg-white bg-clip-border shadow-3xl shadow-shadow-500\r\n      dark:!bg-navy-800 dark:text-white dark:shadow-none' },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(List_1["default"], null)),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(Input_1["default"], null))));
}
exports["default"] = CommentIndex;

//# sourceMappingURL=CommentIndex.js.map
