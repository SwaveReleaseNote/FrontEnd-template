/*eslint-disable*/

import React, {useEffect, useState} from 'react';
import api from "../../../context/api";
import {useLocation} from "react-router-dom";
import {useSafeLayoutEffect} from "@chakra-ui/hooks";
import project from "../../../views/admin/profile/components/Project";
import SidebarProject from "./SidebarProject";
import ProjectListOption from "./ProjectListOption";
import NoteList from "./NoteList";

interface Project {
    count: number,
    createDate: string,
    description: string,
    id: number,
    name: string,
    role: string,
    version: string
}

function ProjectList(): JSX.Element {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [projects, setProjects] = useState<Project[]>();
    const [selectedProject, setSelectedProject] = useState<Project>();
    const [isSelect, setIsSelect] = useState(false);

    useEffect(() => {

        const fetchProjects = async (): Promise<void> => {
            try{
                const response = await api.get('projects')
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
            console.error('Error fetching project dashboard:', error);
        })
    },[])

    const handleSelectProject = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const value = event.target.value;
        setSelectedProject(projects?.filter((currentProject: Project) => currentProject.name === value)[0]);
        setIsSelect(true);
        console.log(selectedProject);
    };

    const projectOptions = projects?.map(projectOption => <ProjectListOption projectOption={projectOption}/>)

    return (
        <div className="bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
                <li>
                    {/* 프로젝트 리스트 옵션 부분 */}
                    <select onChange={handleSelectProject}>{projectOptions}</select>
                </li>
                {isSelect && (
                    <div>
                        {/*릴리즈 노트 리스트*/}
                        <NoteList projectId={selectedProject?.id} />
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