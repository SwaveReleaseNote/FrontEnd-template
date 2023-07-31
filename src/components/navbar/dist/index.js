"use strict";
exports.__esModule = true;
var dropdown_1 = require("components/dropdown");
var fi_1 = require("react-icons/fi");
var react_router_dom_1 = require("react-router-dom");
var Navbar_png_1 = require("assets/img/layout/Navbar.png");
var bs_1 = require("react-icons/bs");
var fi_2 = require("react-icons/fi");
var ri_1 = require("react-icons/ri");
var io_1 = require("react-icons/io");
var recoil_1 = require("recoil");
var atom_1 = require("../../context/atom");
var react_router_dom_2 = require("react-router-dom");
var react_1 = require("react");
var Navbar = function (props) {
    var onOpenSidenav = props.onOpenSidenav, brandText = props.brandText;
    var _a = react_1["default"].useState(false), darkmode = _a[0], setDarkmode = _a[1];
    var login = recoil_1.useRecoilValue(atom_1.loginState);
    var _b = react_1.useState(""), searchTerm = _b[0], setSearchTerm = _b[1];
    var navigate = react_router_dom_2.useNavigate();
    var handleKeyDown = function (event) {
        if (event.key === "Enter") {
            navigate("/admin/project/searchResult", {
                state: {
                    searchTerm: { searchTerm: searchTerm }
                }
            });
            setSearchTerm("");
        }
    };
    var handleChange = function (event) {
        setSearchTerm(event.target.value);
    };
    return (react_1["default"].createElement("nav", { className: " w-full sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]" },
        react_1["default"].createElement("div", { className: "ml-[6px]" },
            react_1["default"].createElement("div", { className: "h-6 w-[224px] pt-1" },
                react_1["default"].createElement("a", { className: "text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white", href: " " },
                    "Pages",
                    react_1["default"].createElement("span", { className: "mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white" },
                        " ",
                        "/",
                        " ")),
                react_1["default"].createElement(react_router_dom_1.Link, { className: "text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white", to: "#" }, brandText)),
            react_1["default"].createElement("p", { className: "shrink text-[33px] capitalize text-navy-700 dark:text-white" },
                react_1["default"].createElement(react_router_dom_1.Link, { to: "#", className: "font-bold capitalize hover:text-navy-700 dark:hover:text-white" }, brandText))),
        react_1["default"].createElement("div", { className: "relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[500px] xl:gap-2" },
            react_1["default"].createElement("div", { className: "flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]" },
                react_1["default"].createElement("p", { className: "pl-3 pr-2 text-xl" },
                    react_1["default"].createElement(fi_2.FiSearch, { className: "h-4 w-4 text-gray-400 dark:text-white" })),
                react_1["default"].createElement("input", { value: searchTerm, onChange: handleChange, onKeyDown: handleKeyDown, type: "text", placeholder: "\uD504\uB85C\uC81D\uD2B8 \uAC80\uC0C9...", className: "block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit" })),
            react_1["default"].createElement("span", { className: "flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden", onClick: onOpenSidenav },
                react_1["default"].createElement(fi_1.FiAlignJustify, { className: "h-5 w-5" })),
            react_1["default"].createElement(dropdown_1["default"], { button: react_1["default"].createElement("p", { className: "cursor-pointer" },
                    react_1["default"].createElement(io_1.IoMdNotificationsOutline, { className: "h-4 w-4 text-gray-600 dark:text-white" })), animation: "origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out", children: react_1["default"].createElement("div", { className: "flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]" },
                    react_1["default"].createElement("div", { className: "flex items-center justify-between" },
                        react_1["default"].createElement("p", { className: "text-base font-bold text-navy-700 dark:text-white" }, "Notification"),
                        react_1["default"].createElement("p", { className: "text-sm font-bold text-navy-700 dark:text-white" }, "Mark all read")),
                    react_1["default"].createElement("button", { className: "flex w-full items-center" },
                        react_1["default"].createElement("div", { className: "flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white" },
                            react_1["default"].createElement(bs_1.BsArrowBarUp, null)),
                        react_1["default"].createElement("div", { className: "ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm" },
                            react_1["default"].createElement("p", { className: "mb-1 text-left text-base font-bold text-gray-900 dark:text-white" }, "New Update: Horizon UI Dashboard PRO"),
                            react_1["default"].createElement("p", { className: "font-base text-left text-xs text-gray-900 dark:text-white" }, "A new update for your downloaded item is available!"))),
                    react_1["default"].createElement("button", { className: "flex w-full items-center" },
                        react_1["default"].createElement("div", { className: "flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white" },
                            react_1["default"].createElement(bs_1.BsArrowBarUp, null)),
                        react_1["default"].createElement("div", { className: "ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm" },
                            react_1["default"].createElement("p", { className: "mb-1 text-left text-base font-bold text-gray-900 dark:text-white" }, "New Update: Horizon UI Dashboard PRO"),
                            react_1["default"].createElement("p", { className: "font-base text-left text-xs text-gray-900 dark:text-white" }, "A new update for your downloaded item is available!")))), classNames: "py-2 top-4 -left-[230px] md:-left-[440px] w-max" }),
            react_1["default"].createElement(dropdown_1["default"], { button: react_1["default"].createElement("p", { className: "cursor-pointer" },
                    react_1["default"].createElement(io_1.IoMdInformationCircleOutline, { className: "h-4 w-4 text-gray-600 dark:text-white" })), children: react_1["default"].createElement("div", { className: "flex w-[350px] flex-col gap-2 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none" },
                    react_1["default"].createElement("div", { style: {
                            backgroundImage: "url(" + Navbar_png_1["default"] + ")",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover"
                        }, className: "mb-2 aspect-video w-full rounded-lg" }),
                    react_1["default"].createElement("a", { target: "blank", href: "https://horizon-ui.com/pro?ref=live-free-tailwind-react", className: "px-full linear flex cursor-pointer items-center justify-center rounded-xl bg-brand-500 py-[11px] font-bold text-white transition duration-200 hover:bg-brand-600 hover:text-white active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200" }, "Buy Horizon UI PRO"),
                    react_1["default"].createElement("a", { target: "blank", href: "https://horizon-ui.com/docs-tailwind/docs/react/installation?ref=live-free-tailwind-react", className: "px-full linear flex cursor-pointer items-center justify-center rounded-xl border py-[11px] font-bold text-navy-700 transition duration-200 hover:bg-gray-200 hover:text-navy-700 dark:!border-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:active:bg-white/10" }, "See Documentation"),
                    react_1["default"].createElement("a", { target: "blank", href: "https://horizon-ui.com/?ref=live-free-tailwind-react", className: "hover:bg-black px-full linear flex cursor-pointer items-center justify-center rounded-xl py-[11px] font-bold text-navy-700 transition duration-200 hover:text-navy-700 dark:text-white dark:hover:text-white" }, "Try Horizon Free")), classNames: "py-2 top-6 -left-[250px] md:-left-[330px] w-max", animation: "origin-[75%_0%] md:origin-top-right transition-all duration-300 ease-in-out" }),
            react_1["default"].createElement("div", { className: "cursor-pointer text-gray-600", onClick: function () {
                    if (darkmode) {
                        document.body.classList.remove("dark");
                        setDarkmode(false);
                    }
                    else {
                        document.body.classList.add("dark");
                        setDarkmode(true);
                    }
                } }, darkmode ? (react_1["default"].createElement(ri_1.RiSunFill, { className: "h-4 w-4 text-gray-600 dark:text-white" })) : (react_1["default"].createElement(ri_1.RiMoonFill, { className: "h-4 w-4 text-gray-600 dark:text-white" }))),
            react_1["default"].createElement(dropdown_1["default"], { button: 
                // <img
                //   className="h-10 w-10 rounded-full"
                //   src={avatar}
                //   alt="Elon Musk"
                // />
                react_1["default"].createElement("div", { className: "flex w-full flex-col gap-2 rounded-[20px]" },
                    react_1["default"].createElement("p", { className: "cursor-pointer overflow-break dark:text-white" },
                        "Hello ",
                        react_1["default"].createElement("b", null, login.name),
                        " \uD83D\uDC7B\u2699\uFE0F")), children: react_1["default"].createElement("div", { className: "ml-40 flex h-[135px] w-[135px] flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none" },
                    react_1["default"].createElement("div", { className: "ml-5 mt-3" },
                        react_1["default"].createElement("div", { className: "flex items-center gap-2" },
                            react_1["default"].createElement("p", { className: "text-sm font-bold text-navy-700 dark:text-white" },
                                "\uD83D\uDC4B Hey, ",
                                react_1["default"].createElement("b", null, login.name)),
                            " ")),
                    react_1["default"].createElement("div", { className: "mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " }),
                    react_1["default"].createElement("div", { className: "ml-4 mt-3 flex flex-col" },
                        react_1["default"].createElement("a", { href: "/user/MyPage", className: "text-sm text-gray-800 dark:text-white hover:dark:text-white" }, "My Page"),
                        react_1["default"].createElement("a", { href: "/user/LogOut", className: "mt-3 text-sm font-medium text-red-500 hover:text-red-500" }, "Log Out"))), classNames: "py-2 top-8 -left-[180px] w-max" }))));
};
exports["default"] = Navbar;

//# sourceMappingURL=index.js.map
