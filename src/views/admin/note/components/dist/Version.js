"use strict";
exports.__esModule = true;
var card_1 = require("components/card");
var react_1 = require("react");
function Version(props) {
    // 최신 버전 받아오기
    var latestVersion = props.latestVersion;
    var _a = react_1.useState(), major = _a[0], setMajor = _a[1];
    var _b = react_1.useState(), minor = _b[0], setMinor = _b[1];
    var _c = react_1.useState(), patch = _c[0], setPatch = _c[1];
    // 버전 Major Minor Patch 파싱 후 세팅
    react_1.useEffect(function () {
        var split = latestVersion.split(".", 3);
        console.log(split);
        setMajor(+split[0]);
        setMinor(+split[1]);
        setPatch(+split[2]);
    }, []);
    var handleClickType = function () {
        // 색상 진하게
        // Version 저장
    };
    console.log(major, minor, patch);
    return (react_1["default"].createElement(card_1["default"], { extra: "w-full p-4 h-full mb-4" },
        react_1["default"].createElement("div", { className: ' flex flex-col items-center' },
            react_1["default"].createElement("header", { className: "relative flex items-center justify-between pt-4" },
                react_1["default"].createElement("div", { className: "text-2xl font-bold text-navy-700 dark:text-white" }, "Version Card Test")),
            react_1["default"].createElement("p", { className: 'mt-3 text-lg font-medium text-gray-800 dark:text-white' },
                "Current Version",
                react_1["default"].createElement("span", { className: 'text-blue-700 dark:text-blue-500' },
                    " ",
                    latestVersion)),
            react_1["default"].createElement("div", { className: 'grid grid-cols-2 w-[80%] text-center justify-between mt-5 mb-3 font-extrabold leading-none tracking-tight \r\n        dark:text-white text-gray-800' },
                react_1["default"].createElement("div", { className: '' }, "TYPE"),
                react_1["default"].createElement("div", null, "NEXT VERSION")),
            react_1["default"].createElement("hr", { className: 'flex w-full mb-5 dark:text-gray-800' }),
            react_1["default"].createElement("div", { className: ' w-[80%] justify-between grid grid-cols-2 text-center m-' },
                react_1["default"].createElement("div", { className: ' hover:cursor-pointer text-gray-400 grid-cols-1' },
                    react_1["default"].createElement("div", { onClick: handleClickType },
                        react_1["default"].createElement("button", null, "Major")),
                    react_1["default"].createElement("div", { onClick: handleClickType },
                        react_1["default"].createElement("button", null, "Minor")),
                    react_1["default"].createElement("div", { onClick: handleClickType },
                        react_1["default"].createElement("button", null, "Patch"))),
                react_1["default"].createElement("div", { className: ' text-gray-400 grid-cols-2' },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("span", null,
                            major + 1,
                            ".0.1")),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("span", null,
                            major,
                            ".",
                            minor + 1,
                            ".1")),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("span", null,
                            major,
                            ".",
                            minor,
                            ".",
                            patch + 1)))))));
}
exports["default"] = Version;

//# sourceMappingURL=Version.js.map
