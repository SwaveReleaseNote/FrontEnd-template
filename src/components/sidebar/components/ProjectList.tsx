/*eslint-disable*/

import React, {useEffect, useState} from 'react';
import api from "../../../context/api";
import {useLocation} from "react-router-dom";
import mockData from "../mockData/noteListData.json"

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
    const [projects, setProjects] = useState<Project[]>();
    const [selectedProject, setSelectedProject] = useState<Project>();
    const [isSelect, setIsSelect] = useState(false);

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

    useEffect(() => {
        setProjects(mockData.projects)
    }, []);

    const handleSelectProject = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        console.log("select 클릭함")
        projects?.map(p => {
            p.projectName === event.target.value ? setSelectedProject(p) : p;
        })
        setIsSelect(true);
    };

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
                            <button className="flex">
                                {note.version}
                            </button>
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