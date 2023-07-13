import React, { useState } from 'react'

export default function SidebarProject(props: any) {
    const [myProject, setMyProject] = useState(props.myProject);

    return (
        <option className={`leading-1 ml-4 flex`} value={myProject.projectName}>{myProject.projectName}</option>
    )
    
}
