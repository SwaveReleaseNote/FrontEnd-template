/* eslint-disable */

import {HiX} from "react-icons/hi";
import Links from "./components/Links";

import routes from "sideBarRoutes";
import ProjectList from "./components/ProjectList";

/**
 * @description SdieBar index
 * @param props
 * @returns
 */

const Sidebar = (props: {
    open: boolean;
    onClose: React.MouseEventHandler<HTMLSpanElement>;
}) => {
    const {open, onClose} = props;
    return (
        <div
            className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
                open ? "translate-x-0" : "-translate-x-96"
            }`}
        >
            <span
                className="absolute top-4 right-4 block cursor-pointer xl:hidden"
                onClick={onClose}>
                <HiX/>
            </span>
            <div className={`mx-[56px] mt-[50px] flex items-center`}>
                <div
                    className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
                    우리 <span className="font-medium">누리</span>
                </div>
            </div>
            <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30"/>
            {/* Nav item */}

            {/*프로젝트 선택 & 프로젝트 내부 릴리즈 노트*/}
            <div className=" flex pt-1">
                <ProjectList/>
            </div>
            <ul className="mb-auto pt-1">
                <Links routes={routes}/>
            </ul>
        </div>
    );
};

export default Sidebar;