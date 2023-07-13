"use strict";
exports.__esModule = true;
var Nft3_png_1 = require("assets/img/nfts/Nft3.png");
var avatar1_png_1 = require("assets/img/avatars/avatar1.png");
var avatar2_png_1 = require("assets/img/avatars/avatar2.png");
var avatar3_png_1 = require("assets/img/avatars/avatar3.png");
var NftCard_1 = require("components/card/NftCard");
var ReleaseNote = function () {
    return (React.createElement("div", { className: "mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3" },
        React.createElement("div", { className: "col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2" },
            React.createElement("div", { className: "mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center" },
                React.createElement("ul", { className: "mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12" },
                    React.createElement("li", null,
                        React.createElement("a", { className: "text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white", href: " " }, "Art")),
                    React.createElement("li", null,
                        React.createElement("a", { className: "text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white", href: " " }, "Music")),
                    React.createElement("li", null,
                        React.createElement("a", { className: "text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white", href: " " }, "Collection")),
                    React.createElement("li", null,
                        React.createElement("a", { className: "text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white", href: " " },
                            React.createElement("a", { href: " " }, "Sports"))))),
            React.createElement("div", { className: "z-20 grid grid-cols-1 gap-5 md:grid-cols-3" },
                React.createElement(NftCard_1["default"], { bidders: [avatar1_png_1["default"], avatar2_png_1["default"], avatar3_png_1["default"]], title: "Abstract Colors", author: "Esthera Jackson", price: "0.91", image: Nft3_png_1["default"] }))),
        React.createElement("div", { className: "col-span-1 h-full w-full rounded-xl 2xl:col-span-1" })));
};
exports["default"] = ReleaseNote;

//# sourceMappingURL=index.js.map
