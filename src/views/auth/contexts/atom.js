import { atom } from "recoil";

export const loginState = atom({
    key: "loginState",
    default: {
        state :false,
        name: "",
        info: "",
        email: "",
        department: "",
        token: ""
    }
});
