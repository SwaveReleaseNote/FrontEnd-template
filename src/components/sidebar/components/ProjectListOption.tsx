/*eslint-disable*/
import React from "react";

interface Project {
    count: number,
    createDate: string,
    description: string,
    id: number,
    name: string,
    role: string,
    version: string
}

export default function ProjectListOption(props: {projectOption: Project}): JSX.Element {

    return (
        <option className="font-bold text-navy-700 dark:text-white leading-1 ml-4 flex">
            {props.projectOption.name}
        </option>
    )
}