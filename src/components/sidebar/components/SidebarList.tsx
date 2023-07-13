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

    const [projectOption, setProjectOption] = useState<String>();
    const [myProject, setMyProject] = useState<projectType[]>(data.mock.projects);
    const [releaseNotesInCurrentProject, setReleaseNotesInCurrentProject] = useState<projectType[]>();

    const changeProjectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        var nowProjectName: string = value;
        setProjectOption(value);

        // 현재 내가 선택한 option의 프로젝트만 받아 올 것
        // 그 선택한 option 프로젝트가 위의 value 안에 담겨 있다.
        // TODO: 제대로 안담긴다.
        const currentProject: projectType[] = myProject.filter((value: projectType) => value.projectName === nowProjectName);
        setReleaseNotesInCurrentProject(currentProject);
    }

    var projects = myProject.map((project) => <SidebarProject myProject={project} />);

    var notes = releaseNotesInCurrentProject?.map((note: projectType) =>
        note.releaseNotes.map((release) => <SidebarNote myNote={release} />));

    return (
        <aside id="sidebar-multi-level-sidebar">
            <div className="bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        {/* 프로젝트 리스트 옵션 부분 */}
                        <select onChange={changeProjectOption}>
                            <option selected disabled className={`${activeRoute(route.path) === true
                                ? "font-bold text-navy-700 dark:text-white"
                                : "font-medium text-gray-600"
                                }`}>
                                백에서 접근한 현재 프로젝트
                            </option>
                            {projects}
                        </select>
                    </li>
                    <li>
                        <div className="text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            {notes}
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default SidebarList;
