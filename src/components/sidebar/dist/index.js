"use strict";
/* eslint-disable */
exports.__esModule = true;
var hi_1 = require("react-icons/hi");
var Links_1 = require("./components/Links");
var routes_1 = require("routes");
/**
 * @description SdieBar index
 * @param props
 * @returns
 */
var Sidebar = function (props) {
    var open = props.open, onClose = props.onClose;
    return (React.createElement("div", { className: "sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 " + (open ? "translate-x-0" : "-translate-x-96") },
        React.createElement("span", { className: "absolute top-4 right-4 block cursor-pointer xl:hidden", onClick: onClose },
            React.createElement(hi_1.HiX, null)),
        React.createElement("div", { className: "mx-[56px] mt-[50px] flex items-center" },
            React.createElement("div", { className: "mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white" },
                "\uC6B0\uB9AC ",
                React.createElement("span", { className: "font-medium" }, "\uB204\uB9AC"))),
        React.createElement("div", { className: "mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" }),
        React.createElement("ul", { className: "mb-auto pt-1" },
            React.createElement(Links_1["default"], { routes: routes_1["default"] }))));
};
exports["default"] = Sidebar;

//# sourceMappingURL=index.js.map
