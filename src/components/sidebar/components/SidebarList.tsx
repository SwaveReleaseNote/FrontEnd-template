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
            test
        </div>
    )
}

export default SidebarList;
