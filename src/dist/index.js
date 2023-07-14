"use strict";
exports.__esModule = true;
var client_1 = require("react-dom/client");
var recoil_1 = require("recoil");
var react_router_dom_1 = require("react-router-dom");
require("./index.css");
var App_1 = require("./App");
var root = client_1["default"].createRoot(document.getElementById("root"));
root.render(React.createElement(recoil_1.RecoilRoot, null,
    React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(App_1["default"], null))));

//# sourceMappingURL=index.js.map
