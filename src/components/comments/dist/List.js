"use strict";
exports.__esModule = true;
var atom_1 = require("context/dist/atom");
var react_1 = require("react");
var recoil_1 = require("recoil");
var NoteFiledMockData_json_1 = require("../label/mockData/NoteFiledMockData.json");
var avatar5_png_1 = require("../../assets/img/avatars/avatar5.png");
var card_1 = require("components/card");
function List() {
    var _a;
    // 댓글 내용
    var _b = recoil_1.useRecoilState(atom_1.commentState), comments = _b[0], setComments = _b[1];
    setComments(NoteFiledMockData_json_1["default"].mock.releaseNote.comment);
    var view = (_a = comments) === null || _a === void 0 ? void 0 : _a.map(function (comment) {
        return (react_1["default"].createElement(card_1["default"], { extra: "w-full p-4 h-full" },
            react_1["default"].createElement("div", { className: "flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none" },
                react_1["default"].createElement("div", { className: "flex items-center" },
                    react_1["default"].createElement("div", { className: "" },
                        react_1["default"].createElement("img", { className: "h-[83px] w-[83px] rounded-lg", src: avatar5_png_1["default"], alt: "" })),
                    react_1["default"].createElement("div", { className: "ml-4" },
                        react_1["default"].createElement("p", { className: "text-base font-medium text-navy-700 dark:text-white" }, comment.content),
                        react_1["default"].createElement("p", { className: "mt-2 text-sm text-gray-600" },
                            "BackEnd Department",
                            react_1["default"].createElement("a", { className: "ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white", href: " " }, comment.writer)))))));
    });
    return (react_1["default"].createElement("div", null, view));
}
exports["default"] = List;

//# sourceMappingURL=List.js.map
