"use strict";
exports.__esModule = true;
var react_1 = require("react");
// Admin Imports
var default_1 = require("views/admin/default");
var marketplace_1 = require("views/admin/marketplace");
var tables_1 = require("views/admin/tables");
// Auth Imports
var SignIn_1 = require("views/auth/SignIn");
// Icon Imports
var md_1 = require("react-icons/md");
var MyPage_1 = require("views/auth/MyPage");
var CreateProject_1 = require("views/admin/default/pages/CreateProject");
var ProjectDashboard_1 = require("views/admin/default/pages/ProjectDashboard");
var SearchProjectList_1 = require("views/admin/default/pages/SearchProjectList");
var routes = [
    {
        name: "Release Note",
        layout: "/admin",
        path: "release-note",
        icon: react_1["default"].createElement(md_1.MdOutlineShoppingCart, { className: "h-6 w-6" }),
        component: react_1["default"].createElement(marketplace_1["default"], null),
        secondary: true
    },
    {
        name: "Project Dashboard",
        layout: "/admin",
        path: "default",
        icon: react_1["default"].createElement(md_1.MdHome, { className: "h-6 w-6" }),
        component: react_1["default"].createElement(default_1["default"], null)
    },
    {
        name: "Create Project",
        layout: "/admin",
        path: "createProject",
        icon: react_1["default"].createElement(md_1.MdHome, { className: "h-6 w-6" }),
        component: react_1["default"].createElement(CreateProject_1["default"], null)
    },
    {
        name: "Search ProjectList",
        layout: "/admin",
        path: "project/searchResult",
        icon: react_1["default"].createElement(md_1.MdHome, { className: "h-6 w-6" }),
        component: react_1["default"].createElement(SearchProjectList_1["default"], null)
    },
    {
        name: "Project Dashboard",
        layout: "/admin",
        path: "dashboard",
        icon: react_1["default"].createElement(md_1.MdHome, { className: "h-6 w-6" }),
        component: react_1["default"].createElement(ProjectDashboard_1["default"], null)
    },
    {
        name: "Data Tables",
        layout: "/admin",
        icon: react_1["default"].createElement(md_1.MdBarChart, { className: "h-6 w-6" }),
        path: "data-tables",
        component: react_1["default"].createElement(tables_1["default"], null)
    },
    // {
    //   name: "Profile",
    //   layout: "/admin",
    //   path: "profile",
    //   icon: <MdPerson className="h-6 w-6" />,
    //   component: <Profile />,
    // },
    {
        name: "Profile",
        layout: "/admin",
        path: "profile",
        icon: react_1["default"].createElement(md_1.MdPerson, { className: "h-6 w-6" }),
        component: react_1["default"].createElement(MyPage_1["default"], null)
    },
    {
        name: "Sign In",
        layout: "/auth",
        path: "sign-in",
        icon: react_1["default"].createElement(md_1.MdLock, { className: "h-6 w-6" }),
        component: react_1["default"].createElement(SignIn_1["default"], null)
    },
    {
        name: "NoteFiled Test",
        layout: "/admin",
        path: "release-note",
        icon: react_1["default"].createElement(md_1.MdOutlineShoppingCart, { className: "h-6 w-6" }),
        component: react_1["default"].createElement(marketplace_1["default"], null)
    }
];
exports["default"] = routes;

//# sourceMappingURL=routes.js.map
