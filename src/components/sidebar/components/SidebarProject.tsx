import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

export default function SidebarProject(props: any) {
    const [myProject, setMyProject] = useState(props.myProject);
    let location = useLocation();
  
    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName: string) => {
      return location.pathname.includes(routeName);
    };
    
    // TODO: 프로젝트 선택할때 마다 프로젝트 세줄 요약 라우팅되도록
    // TODO: 선택되어있는 프로젝트 릴리즈노트 리스트 보여지도록
    return (
        <option className={`${activeRoute(myProject.projectName) === true
            ? "font-bold text-navy-700 dark:text-white"
            : "font-medium text-gray-600"
            } leading-1 ml-4 flex `} value={myProject.projectName}>{myProject.projectName}</option>
    )
    
}