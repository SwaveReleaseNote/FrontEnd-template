/*eslint-disable*/

import React, {MouseEvent, useEffect, useState} from 'react';
import api from "../../../context/api";
import {Link, useLocation} from "react-router-dom";
import projectsMockData from "../mockData/noteListData.json"
import noteMockData from "../../label/mockData/NoteFiledMockData.json"
import {RecoilLoadable, useRecoilState} from "recoil";
import {noteFieldState, noteIdState, projectIdState} from "../../../context/atom";
import routes from "../../../routes";
import DashIcon from "../../icons/DashIcon";
import {MdOutlineShoppingCart} from "react-icons/md";
import ReleaseNote from "../../../views/admin/marketplace";

interface Note {
    releaseNoteId: number,
    version: string;
}

interface Project {
    projectId: number,
    projectName: string,
    releaseNoteVersionList: Note[],
    subscribe: boolean;
}

interface Route {
    name: string,
    layout: string,
    path: string,
    icon: JSX.Element,
    component: JSX.Element,
    secondary: true;
}

function ProjectList(): JSX.Element {
    const location = useLocation();

    const noteRoute: Route = {
        name: "Release Note",
        layout: "/admin",
        path: "release-note",
        icon: <MdOutlineShoppingCart className="h-6 w-6" />,
        component: <ReleaseNote />,
        secondary: true,
    }; // ReleaseNote 컴포넌트

    useEffect(() => {
        console.log(location)
    }, [location]);


    const activeRoute = (routeName: string) => {
        return location.pathname.includes(routeName);
    }

    const [projects, setProjects] = useState<Project[]>();
    const [selectedProject, setSelectedProject] = useState<Project>();
    const [selectedProjectId, setSelectedProjectId] = useRecoilState(projectIdState)
    const [selectNote, setSelectNote] = useRecoilState(noteFieldState);
    const [selectNoteId, setSelectNoteId] = useRecoilState(noteIdState);
    const [isSelect, setIsSelect] = useState(false);

    // api 로 받아온 데이터를 projects에 넣어준다
    useEffect(() => {

        const fetchProjects = async (): Promise<void> => {
            try{
                const response = await api.get('project/release-note/version-list')
                const projectList = response.data
                console.log("프로젝트 리스트를 받아옵니다")
                console.log(projectList)
                setProjects(projectList);
            }
            catch (error) {
                console.error(error)
            }
        }

        fetchProjects().catch(error => {
            console.error('오류오류')
            console.error('Error fetching project dashboard:', error);
        })
    }, [])

    // // Mock Data Test
    // useEffect(() => {
    //     setProjects(projectsMockData.projects)
    //     console.log("프로젝트 set 되는 useEffect 실행됨~")
    // }, []);

    const handleSelectProject = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        console.log("select 클릭함")
        projects?.map(p => {
            p.projectName === event.target.value
                ? setSelectedProject(p)
                : null;
            setSelectedProjectId(p.projectId)
        })
        setIsSelect(true);
    };

    const handleSelectNote = (id: number) => {
        console.log("선택된 노트의 id = " + id)
        setSelectNoteId(id);
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
                <li>
                    {/* 프로젝트 리스트 옵션 부분 */}
                    <select
                        onChange={event => handleSelectProject(event)}
                        placeholder="프로젝트를 선택해주세요"
                        value={selectedProject?.projectName}
                    >
                        {projects?.map(projectOptions => (
                            <option
                                className="font-bold text-navy-700 dark:text-white leading-1 ml-4 flex"
                                value={projectOptions.projectName}
                                key={projectOptions.projectId}
                            >
                                {projectOptions.projectName}
                            </option>
                        ))}
                    </select>
                </li>
                {(
                    <div className=" align-middle">
                        {/*릴리즈 노트 리스트*/}
                        {selectedProject?.releaseNoteVersionList.map(note => (
                            <div>
                                <Link
                                    onClick={() => handleSelectNote(note.releaseNoteId)}
                                    key={note.releaseNoteId} to={noteRoute.layout + "/"+ noteRoute.path + "/" + note.releaseNoteId}>
                                    <div className="relative mb-3 flex hover:cursor-pointer">
                                        <li
                                            className="my-[3px] flex cursor-pointer items-center px-8"
                                        >
                                        <span
                                            className="font-bold text-brand-500 dark:text-white"
                                        >
                                          {noteRoute.icon ? noteRoute.icon : <DashIcon />}{" "}
                                        </span>
                                            <div>
                                                <p
                                                    className="font-bold text-navy-700 dark:text-white"
                                                >
                                                    {note.version}
                                                </p>
                                            </div>
                                        </li>
                                        {activeRoute(noteRoute.path + "/" + note.releaseNoteId)
                                            ? (<div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400"/>)
                                            : null
                                        }
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
                <li>
                    {/* TODO: 크기 고정해야합니다 */}
                    <div className="text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default ProjectList;