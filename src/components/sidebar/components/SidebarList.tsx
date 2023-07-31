import React, { useState } from 'react';
import data from '../mockData/noteListData.json';
import SidebarProject from './SidebarProject';
import SidebarNote from './SidebarNote';

interface ReleaseNote {
   id: number;
   version: string;
}

interface ProjectType {
   id: number;
   projectName: string;
   releaseNotes: ReleaseNote[];
}

function SidebarList(props: any): JSX.Element {
   const [selectedProject, setSelectedProject] = useState<ProjectType>();
   const [myProject] = useState<ProjectType[]>(data.mock.projects);
   const [releaseNoteList, setReleaseNoteList] = useState<ReleaseNote[]>();

   const handleSelectProject = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      const value = event.target.value;
      setSelectedProject(myProject.filter((currentProject: ProjectType) => currentProject.projectName === value)[0]);
      console.log(selectedProject);

      if (selectedProject != null) {
        setReleaseNoteList(selectedProject.releaseNotes);
     } else {
        setReleaseNoteList([]);
     }
   };

   const projects = myProject?.map(project => <SidebarProject key={project.id} myProject={project} />);
   const notes = releaseNoteList?.map(release => <SidebarNote key={release.id} myNote={release} />);

   return (
      <div className="bg-gray-50 dark:bg-gray-800">
         <ul className="space-y-2 font-medium">
            <li>
               {/* 프로젝트 리스트 옵션 부분 */}
               <select onChange={handleSelectProject}>{projects}</select>
            </li>
            <li>
               {/* TODO: 크기 고정해야합니다 */}
               <div className="text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  {notes}
               </div>
            </li>
         </ul>
      </div>
   );
}

export default SidebarList;
