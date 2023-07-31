import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: any, option?: any): void => {
  cookies.set(name, value, { ...option });
};

export const getCookie = (name: string): any => {
  return cookies.get(name);
};

export const removeCookie = (name: string, option?: any): void => {
  cookies.remove(name, { ...option });
};
