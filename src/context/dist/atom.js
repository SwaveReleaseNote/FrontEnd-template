"use strict";
exports.__esModule = true;
var recoil_1 = require("recoil");
exports.noteFieldState = recoil_1.atom({
    key: "noteFieldState",
    "default": {
        id: 0,
        version: "",
        block: [
            {
                label: "",
                text: ""
            }
        ],
        comment: [
            {
                writer: "",
                content: ""
            }
        ]
    }
});
exports.labelState = recoil_1.atom({
    key: "labelState",
    "default": {
        label: "",
        text: ""
    }
});

//# sourceMappingURL=atom.js.map
