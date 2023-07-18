"use strict";
exports.__esModule = true;
var react_router_dom_1 = require("react-router-dom");
var recoil_1 = require("recoil");
var admin_1 = require("layouts/admin");
var auth_1 = require("layouts/auth");
var Auth_1 = require("views/auth/Auth");
var MyPage_1 = require("views/auth/MyPage");
var DepartmentSelect_1 = require("./views/auth/DepartmentSelect");
var App = function () {
    return (React.createElement(recoil_1.RecoilRoot, null,
        React.createElement(react_router_dom_1.Routes, null,
            React.createElement(react_router_dom_1.Route, { path: "auth/*", element: React.createElement(auth_1["default"], null) }),
            React.createElement(react_router_dom_1.Route, { path: "/oauth/callback/:provider", element: React.createElement(Auth_1["default"], null) }),
            React.createElement(react_router_dom_1.Route, { path: "/admin/*", element: React.createElement(admin_1["default"], null) }),
            React.createElement(react_router_dom_1.Route, { path: "/", element: React.createElement(react_router_dom_1.Navigate, { to: "/auth/sign-in", replace: true }) }),
            React.createElement(react_router_dom_1.Route, { path: "/mypage/*", element: React.createElement(MyPage_1["default"], null) }),
            React.createElement(react_router_dom_1.Route, { path: "/department/*", element: React.createElement(DepartmentSelect_1["default"], null) }))));
};
exports["default"] = App;

//# sourceMappingURL=App.js.map
