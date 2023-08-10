/*eslint-disable*/
import React, {useEffect, useState} from 'react';
import api from "../../../context/api";

function NoteList(props: {projectId: number | undefined}): JSX.Element {
    const [notes, setNotes] = useState();

    useEffect(() => {
        const fetchNoteList = async (): Promise<void> => {
            try{
                const response = await api.get(`project/${props.projectId}/release-notes`)
                const noteListData = response.data;
                setNotes(noteListData);
            }
            catch (error) {
                console.error('릴리즈 노트 받아오는데 에러 생김', error);
            }
        };

        fetchNoteList().catch(error => {
            console.error("릴리즈 노트 받아오는데 에러 생김", error);
        });
    }, [])

    return (
        <div></div>
    );
}

export default NoteList;