import React, { useState } from 'react'
import data from '../mockData/noteListData.json'
import SidebarProject from './SidebarProject'
import SidebarNote from './SidebarNote'

type releaseNote = {
    id: number;
    version: string;
};

type projectType = {
    id: number;
    projectName: String;
    releaseNotes: releaseNote[];
};

function SidebarList(props: any) {

    const route = props.routeName;
    const activeRoute = props.activeRoute;

    const [selectedProject, setSelectedProject] = useState<projectType>();
    const [myProject, setMyProject] = useState<projectType[]>(data.mock.projects);
    const [releaseNoteList, setReleaseNoteList] = useState<releaseNote[]>();
    const [releaseNotesInCurrentProject, setReleaseNotesInCurrentProject] = useState<projectType[]>();

    const handleSelectProject = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedProject(myProject.filter((currentProject: projectType) => currentProject.projectName === value)[0]);
        console.log(selectedProject);

        setReleaseNoteList(selectedProject.releaseNotes);
    }

    var notes = releaseNoteList?.map((release) => <SidebarNote myNote={release} />);
    var projects = myProject?.map((project) => <SidebarProject myProject={project} />);

    return (
        <div className="bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
                <li>
                    {/* 프로젝트 리스트 옵션 부분 */}
                    <select onChange={handleSelectProject}>
                        {projects}
                    </select>
                </li>
                <li>
                    {/* TODO: 크기 고정해야합니다 */}
                    <div className="text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        {notes}
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default SidebarList;
