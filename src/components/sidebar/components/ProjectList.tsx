/*eslint-disable*/

import React, {MouseEvent, useEffect, useState} from 'react';
import api from "../../../context/api";
import {Link, useLocation} from "react-router-dom";
import projectsMockData from "../mockData/noteListData.json"
import noteMockData from "../../label/mockData/NoteFiledMockData.json"
import {RecoilLoadable, useRecoilState} from "recoil";
import {noteFieldState} from "../../../context/atom";
import routes from "../../../routes";
import DashIcon from "../../icons/DashIcon";

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

function ProjectList(): JSX.Element {
    const location = useLocation();

    const noteRoute = routes.at(0); // ReleaseNote 컴포넌트

    // todo: noteRoute is possibly 'undefined'
    const activeRoute = (routeName: string) => {
        return location.pathname.includes(routeName);
    }

    const [projects, setProjects] = useState<Project[]>();
    const [selectedProject, setSelectedProject] = useState<Project>();
    const [releaseNoteId, setReleaseNoteId] = useState<number>();
    const [isSelect, setIsSelect] = useState(false);
    const [selectNote, setSelectNote] = useRecoilState(noteFieldState);
    // useEffect(() => {
    //
    //     const fetchProjects = async (): Promise<void> => {
    //         try{
    //             const response = await api.get('project/release-note/version-list')
    //             const projectList = response.data
    //             console.log("프로젝트 리스트를 받아옵니다")
    //             console.log(projectList)
    //             setProjects(projectList);
    //             setProjects(mockData.projects)
    //         }
    //         catch (error) {
    //             console.error(error)
    //         }
    //     }
    //
    //     fetchProjects().catch(error => {
    //         console.error('오류오류')
    //         console.error('Error fetching project dashboard:', error);
    //     })
    // })

    // Mock Data Test
    useEffect(() => {
        setProjects(projectsMockData.projects)
    }, []);

    const handleSelectProject = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        console.log("select 클릭함")
        projects?.map(p => {
            p.projectName === event.target.value ? setSelectedProject(p) : p;
        })
        setIsSelect(true);
    };

    // 리코일을 사용하여 릴리즈 노트 클릭했을때 해당 릴리즈 노트로 가도록 설정
    // useEffect(() => {
    //     const fetchNote = async (): Promise<void> => {
    //         try{
    //             const response = await api.get(`project/release-note/${releaseNoteId}`)
    //             const fetchData = response.data
    //             setSelectNote(fetchData)
    //
    //             console.log(releaseNoteId + " 릴리즈 노트 데이터 가져옴")
    //
    //             // todo: 라우팅 해주자?
    //         }
    //         catch (error) {
    //             console.error(error)
    //         }
    //     }
    //
    //     fetchNote().catch(error => {
    //         console.log(error)
    //     });
    //
    // }, [releaseNoteId]);

    // Mock Data Test
    useEffect(() => {
        setSelectNote(noteMockData)
    }, [releaseNoteId]);
    const handleNoteButtonClick = (event: MouseEvent<HTMLButtonElement>, id: number) => {
        setReleaseNoteId(id);
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
                <li>
                    {/* 프로젝트 리스트 옵션 부분 */}
                    <select
                        onChange={event => handleSelectProject(event)}
                        value={selectedProject?.projectName}
                    >
                        {projects?.map(projectOptions => (
                            <option
                                className="font-bold text-navy-700 dark:text-white leading-1 ml-4 flex"
                                value={projectOptions.projectName}
                                key={projectOptions.projectName}
                            >
                                {projectOptions.projectName}
                            </option>
                        ))}
                    </select>
                </li>
                {isSelect && (
                    <div className="flex inline-flex items-end">
                        {/*릴리즈 노트 리스트*/}
                        {selectedProject?.releaseNoteVersionList.map(note => (
                            <div>
                                <Link to={noteRoute.layout + "/"+ noteRoute.path}>
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
                                        {activeRoute(noteRoute.path)
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