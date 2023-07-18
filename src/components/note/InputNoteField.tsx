import React from 'react'
import data from './mockData/mockNoteData.json'
import { type } from 'os';

/**
 * @description 릴리즈노트 작성 컴포넌트
 */
interface TextBlock {
    type: lable;
    block: string;
}

type lable = {
    labelName: string;
}

export default function inputNoteField(pros: {
    version: string;
    releaseDate: Date;
    text: TextBlock[];
}) {

    return (
        <div>inputNote</div>
    )
}
