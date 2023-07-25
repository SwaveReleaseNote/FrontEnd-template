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
    "default": [{
            label: "",
            text: ""
        }]
});
exports.commentState = recoil_1.atom({
    key: "commentState",
    "default": [{
            writer: "",
            content: ""
        }]
});
exports.loginState = recoil_1.atom({
    key: "loginState",
    "default": {
        state: false,
        id: -1,
        name: "atom",
        info: null,
        email: null,
        token: null,
        department: "부서 0"
    }
});
/**
 * 사이드바에 해당하는 내용이다
 * 프로젝트 리스트, 릴리즈노트 리스트
 */
exports.sideBarState = recoil_1.atom({
    key: "sideBarState",
    "default": {
        projectList: [],
        releaseNoteList: []
    }
});
exports.noteBlockState = recoil_1.atom({
    key: "noteBlockState",
    "default": {
        id: 0,
        content: ''
    }
});

//# sourceMappingURL=atom.js.map
