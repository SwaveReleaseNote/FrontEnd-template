import {atom} from 'recoil'

export const noteFieldState = atom({
    key: "noteFieldState",
    default: {
        blocks: [
            {
                contexts: [
                    {
                        context: "",
                        index: 0,
                        tag: ""
                    }
                ],
                Label: ""
            }
        ],
        comment: [
            {
                context:0,
                LastModifiedDate:"",
                name:"",
                releaseNoteId: 0,
                version: ""
            }
        ],
        count: 0,
        creator: "",
        LastModified: "",
        Liked: 0,
        releaseDate: "",
        releaseNoteId: 0,
        summary: "",
        version: ""
    }
});

export const labelState = atom({
    key: "labelState",
    default: [{
        label:"",
        text:""
    }]
})

export const commentState = atom({
    key: "commentState",
    default: [{
        id:0,
        writer:"",
        content:""
    }]
})

export const loginState = atom({
  key: "loginState",
  default: {
    state: false,
    id: -1,
    name: "atom",
    info: null,
    email: null,
    token: null,
    department: "부서 0",
  },
});

/**
 * 사이드바에 해당하는 내용이다
 * 프로젝트 리스트, 릴리즈노트 리스트
 */
export const sideBarState = atom({
  key: "sideBarState",
  default: {
    projectList: [],
    releaseNoteList: [],
  },
});

export const noteBlockState = atom({
    key: "noteBlockState",
    default: {
        id: 0,
        content: '',
    }
})