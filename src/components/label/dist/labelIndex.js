"use strict";
exports.__esModule = true;
/**
 * @description 라벨 컴포넌트 : 라벨과 Text를 보여준다
 */
var react_1 = require("react");
var NEW_png_1 = require("../../assets/img/label/NEW.png");
var UPDATE_png_1 = require("../../assets/img/label/UPDATE.png");
var DELETE_png_1 = require("../../assets/img/label/DELETE.png");
var STOP_png_1 = require("../../assets/img/label/STOP.png");
var ETC_png_1 = require("../../assets/img/label/ETC.png");
function LabelIndex(props) {
    var block = props.NoteFieldBlock;
    switch (block.label) {
        case 'new':
            return (react_1["default"].createElement("div", { className: 'my-10' },
                react_1["default"].createElement("span", null,
                    react_1["default"].createElement("img", { className: 'my-5 rounded-xl w-1/12 max-w-lg shadow-xl', src: NEW_png_1["default"] })),
                react_1["default"].createElement("div", { className: 'break-words w-full text-clip mt-2 px-2 inline-block' },
                    react_1["default"].createElement("p", null, block.text))));
        case 'update':
            return react_1["default"].createElement("div", { className: 'my-10' },
                react_1["default"].createElement("span", null,
                    react_1["default"].createElement("img", { className: 'my-5 rounded-xl w-1/12 max-w-lg shadow-xl', src: UPDATE_png_1["default"] })),
                react_1["default"].createElement("div", { className: ' break-words w-full text-clip mt-2 px-2 inline-block' },
                    react_1["default"].createElement("p", null, block.text)));
        case 'delete':
            return react_1["default"].createElement("div", { className: 'my-10' },
                react_1["default"].createElement("span", null,
                    react_1["default"].createElement("img", { className: 'my-5 rounded-xl w-1/12 max-w-lg shadow-xl', src: DELETE_png_1["default"] })),
                react_1["default"].createElement("div", { className: 'break-words w-full text-clip mt-2 px-2 inline-block' },
                    react_1["default"].createElement("p", null, block.text)));
        case 'stop':
            return react_1["default"].createElement("div", { className: 'my-10' },
                react_1["default"].createElement("span", null,
                    react_1["default"].createElement("img", { className: 'my-5 rounded-xl w-1/12 max-w-lg shadow-xl', src: STOP_png_1["default"] })),
                react_1["default"].createElement("div", { className: 'break-words w-full text-clip mt-2 px-2 inline-block' },
                    react_1["default"].createElement("p", null, block.text)));
        case 'etc':
            return react_1["default"].createElement("div", { className: 'my-10' },
                react_1["default"].createElement("span", null,
                    react_1["default"].createElement("img", { className: 'my-5 rounded-xl w-1/12 max-w-lg shadow-xl', src: ETC_png_1["default"] })),
                react_1["default"].createElement("div", { className: 'break-words w-full text-clip mt-2 px-2 inline-block' },
                    react_1["default"].createElement("p", null, block.text)));
    }
    // new, update, delete, stop, etc
    return (react_1["default"].createElement("div", null, "test"));
}
exports["default"] = LabelIndex;
;

//# sourceMappingURL=labelIndex.js.map
