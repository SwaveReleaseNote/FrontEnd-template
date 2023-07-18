"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var navbar_1 = require("components/navbar");
var sidebar_1 = require("components/sidebar");
var Footer_1 = require("components/footer/Footer");
var routes_1 = require("routes");
var ProjectDashboard_1 = require("views/admin/default/pages/ProjectDashboard");
function Admin(props) {
    var rest = __rest(props, []);
    var location = react_router_dom_1.useLocation();
    var _a = react_1["default"].useState(false), open = _a[0], setOpen = _a[1];
    var _b = react_1["default"].useState("Main Dashboard"), currentRoute = _b[0], setCurrentRoute = _b[1];
    react_1["default"].useEffect(function () {
        getActiveRoute(routes_1["default"]);
        console.log(location.pathname);
        if (location.pathname === "/admin/default") {
            setOpen(false);
        }
        else if (location.pathname === "/admin/createProject") {
            setOpen(false);
        }
        else {
            setOpen(true);
        }
    }, [location.pathname]);
    react_1["default"].useEffect(function () {
        console.log(open);
    }, [open]);
    var getActiveRoute = function (routes) {
        var activeRoute = "Main Dashboard";
        for (var i = 0; i < routes.length; i++) {
            if (window.location.href.indexOf(routes[i].layout + "/" + routes[i].path) !== -1) {
                setCurrentRoute(routes[i].name);
            }
        }
        return activeRoute;
    };
    var getActiveNavbar = function (routes) {
        var activeNavbar = false;
        for (var i = 0; i < routes.length; i++) {
            if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].secondary;
            }
        }
        return activeNavbar;
    };
    var getRoutes = function (routes) {
        return routes.map(function (prop, key) {
            if (prop.layout === "/admin") {
                if (prop.path === "dashboard/:projectId/:role") {
                    return (react_1["default"].createElement(react_router_dom_1.Route, { path: "/" + prop.path, element: react_1["default"].createElement(ProjectDashboard_1["default"], null), key: key }));
                }
                else {
                    return (react_1["default"].createElement(react_router_dom_1.Route, { path: "/" + prop.path, element: prop.component, key: key }));
                }
            }
            else {
                return null;
            }
        });
    };
    document.documentElement.dir = "ltr";
    return (react_1["default"].createElement("div", { className: "flex h-full w-full" },
        open ? react_1["default"].createElement(sidebar_1["default"], { open: open, onClose: function () { return setOpen(false); } }) : null,
        react_1["default"].createElement("div", { className: "h-full w-fvmfhwull bg-lightPrimary dark:!bg-navy-900" },
            react_1["default"].createElement("main", { className: "mx-12 h-full flex-none transition-all md:pr-2 " + (open ? "xl:ml-[313px]" : "xl:ml-[150px]]") },
                react_1["default"].createElement("div", { className: "h-full" },
                    react_1["default"].createElement(navbar_1["default"], __assign({ onOpenSidenav: function () { return setOpen(true); }, brandText: currentRoute, secondary: getActiveNavbar(routes_1["default"]) }, rest)),
                    react_1["default"].createElement("div", { className: "pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2" },
                        react_1["default"].createElement(react_router_dom_1.Routes, null,
                            getRoutes(routes_1["default"]),
                            react_1["default"].createElement(react_router_dom_1.Route, { path: "/", element: react_1["default"].createElement(react_router_dom_1.Navigate, { to: "/admin/default", replace: true }) }))),
                    react_1["default"].createElement("div", { className: "p-3" },
                        react_1["default"].createElement(Footer_1["default"], null)))))));
}
exports["default"] = Admin;

//# sourceMappingURL=index.js.map
