"use strict";
exports.__esModule = true;
var FooterAuthDefault_1 = require("components/footer/FooterAuthDefault");
var auth_png_1 = require("assets/img/auth/auth.png");
var react_router_dom_1 = require("react-router-dom");
var routes_1 = require("routes");
var FixedPlugin_1 = require("components/fixedPlugin/FixedPlugin");
/**
 * @description : Login Index
 */
function Auth() {
    var getRoutes = function (routes) {
        return routes.map(function (prop, key) {
            if (prop.layout === "/auth") {
                return (React.createElement(react_router_dom_1.Route, { path: "/" + prop.path, element: prop.component, key: key }));
            }
            else {
                return null;
            }
        });
    };
    document.documentElement.dir = "ltr";
    return (React.createElement("div", null,
        React.createElement("div", { className: "relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900" },
            React.createElement(FixedPlugin_1["default"], null),
            React.createElement("main", { className: "mx-auto min-h-screen" },
                React.createElement("div", { className: "relative flex" },
                    React.createElement("div", { className: "mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]" },
                        React.createElement("div", { className: "mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full" },
                            React.createElement(react_router_dom_1.Link, { to: "/admin", className: "mt-0 w-max lg:pt-10" },
                                React.createElement("div", { className: "mx-auto flex h-fit w-fit items-center hover:cursor-pointer" },
                                    React.createElement("svg", { width: "8", height: "12", viewBox: "0 0 8 12", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                        React.createElement("path", { d: "M6.70994 2.11997L2.82994 5.99997L6.70994 9.87997C7.09994 10.27 7.09994 10.9 6.70994 11.29C6.31994 11.68 5.68994 11.68 5.29994 11.29L0.709941 6.69997C0.319941 6.30997 0.319941 5.67997 0.709941 5.28997L5.29994 0.699971C5.68994 0.309971 6.31994 0.309971 6.70994 0.699971C7.08994 1.08997 7.09994 1.72997 6.70994 2.11997V2.11997Z", fill: "#A3AED0" })),
                                    React.createElement("p", { className: "ml-3 text-sm text-gray-600" }, "Back to Dashboard"))),
                            React.createElement(react_router_dom_1.Routes, null,
                                getRoutes(routes_1["default"]),
                                React.createElement(react_router_dom_1.Route, { path: "/", element: React.createElement(react_router_dom_1.Navigate, { to: "/auth/sign-in", replace: true }) })),
                            React.createElement("div", { className: "absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]" },
                                React.createElement("div", { className: "absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]", style: { backgroundImage: "url(" + auth_png_1["default"] + ")" } }))),
                        React.createElement(FooterAuthDefault_1["default"], null)))))));
}
exports["default"] = Auth;

//# sourceMappingURL=index.js.map
