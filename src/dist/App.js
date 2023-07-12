"use strict";
exports.__esModule = true;
var react_router_dom_1 = require("react-router-dom");
var admin_1 = require("layouts/admin");
var auth_1 = require("layouts/auth");
var App = function () {
    return (React.createElement(react_router_dom_1.Routes, null,
        React.createElement(react_router_dom_1.Route, { path: "auth/*", element: React.createElement(auth_1["default"], null) }),
        React.createElement(react_router_dom_1.Route, { path: "admin/*", element: React.createElement(admin_1["default"], null) }),
        React.createElement(react_router_dom_1.Route, { path: "/", element: React.createElement(react_router_dom_1.Navigate, { to: "/admin", replace: true }) })));
};
exports["default"] = App;

//# sourceMappingURL=App.js.map
