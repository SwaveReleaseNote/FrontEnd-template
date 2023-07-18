"use strict";
exports.__esModule = true;
var react_1 = require("react");
var avatar5_png_1 = require("../../assets/img/avatars/avatar5.png");
var card_1 = require("components/card");
function Input() {
    // 작성 내용
    // 등록 버튼
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(card_1["default"], { extra: "w-full p-4 h-full" },
            react_1["default"].createElement("div", { className: "flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none" },
                react_1["default"].createElement("div", { className: "w-full flex items-center" },
                    react_1["default"].createElement("div", { className: "" },
                        react_1["default"].createElement("img", { className: "h-[83px] w-[83px] rounded-lg", src: avatar5_png_1["default"], alt: "" })),
                    react_1["default"].createElement("div", { className: "w-full ml-4 flex-1" },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("p", { className: "mt-2 text-sm text-gray-600" },
                                "BackEnd Department",
                                react_1["default"].createElement("a", { className: "ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white", href: " " }, "testtest")),
                            react_1["default"].createElement("textarea", { id: "message", className: "mt-4 mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500\r\n                            focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", placeholder: "\uB313\uAE00\uC744 \uC791\uC131\uD574 \uC8FC\uC138\uC694..." })),
                        react_1["default"].createElement("div", { className: ' flex justify-end' },
                            react_1["default"].createElement("button", { type: "button", className: "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" }, "\uB313\uAE00 \uB0A8\uAE30\uAE30"))))))));
}
exports["default"] = Input;

//# sourceMappingURL=Input.js.map
