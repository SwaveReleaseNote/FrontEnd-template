"use strict";
exports.__esModule = true;
/* eslint-disable */
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var DashIcon_1 = require("components/icons/DashIcon");
var SidebarList_1 = require("./SidebarList");
// chakra imports
exports.SidebarLinks = function (props) {
    // Chakra color mode
    var location = react_router_dom_1.useLocation();
    var routes = props.routes;
    // verifies if routeName is the one active (in browser input)
    var activeRoute = function (routeName) {
        return location.pathname.includes(routeName);
    };
    // TODO: 릴리즈 노트일 경우 Sidebar에 List로 나오도록 설정
    var createLinks = function (routes) {
        return routes.map(function (route, index) {
            if (route.layout === "/admin" ||
                route.layout === "/auth" ||
                route.layout === "/default" ||
                route.layout === "/rtl") {
                return (react_1["default"].createElement(react_router_dom_1.Link, { key: index, to: route.layout + "/" + route.path },
                    react_1["default"].createElement("div", { className: "relative mb-3 flex hover:cursor-pointer" },
                        react_1["default"].createElement("li", { className: "my-[3px] flex cursor-pointer items-center px-8", key: index },
                            react_1["default"].createElement("span", { className: "" + (activeRoute(route.path) === true
                                    ? "font-bold text-brand-500 dark:text-white"
                                    : "font-medium text-gray-600") },
                                route.icon ? route.icon : react_1["default"].createElement(DashIcon_1["default"], null),
                                " "),
                            react_1["default"].createElement("div", null, route.name === "Release Note"
                                ? react_1["default"].createElement(SidebarList_1["default"], { routeName: route.name, activeRoute: activeRoute }) : react_1["default"].createElement("p", { className: "leading-1 ml-4 flex " + (activeRoute(route.path) === true
                                    ? "font-bold text-navy-700 dark:text-white"
                                    : "font-medium text-gray-600") }, route.name))),
                        activeRoute(route.path) ? (react_1["default"].createElement("div", { className: "absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" })) : null)));
            }
        });
    };
    // BRAND
    return react_1["default"].createElement(react_1["default"].Fragment, null, createLinks(routes));
};
exports["default"] = exports.SidebarLinks;

//# sourceMappingURL=Links.js.map
