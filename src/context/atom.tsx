import {atom} from 'recoil'

export const noteFieldState = atom({
    key: "noteFieldState",
    default: {
        id:0,
        version:"",
        block: [
            {
                label:"",
                text:""
            }
        ],
        comment: [
            {
                writer:"",
                content:""
            }
        ]
    }
});

export const labelState = atom({
    key: "labelState",
    default: {
        label:"",
        text:""
    }
})