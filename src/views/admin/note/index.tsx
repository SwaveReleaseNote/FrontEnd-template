import React, { useState, useRef, useEffect, Component, KeyboardEvent, ChangeEvent, useLayoutEffect } from 'react'
import NoteField from 'components/note/NoteField'
import tableDataDevelopment from "../tables/variables/tableDataDevelopment";
import tableDataCheck from "../tables/variables/tableDataCheck";
import CheckTable from "../tables/components/CheckTable";
import tableDataColumns from "../tables/variables/tableDataColumns";
import tableDataComplex from "../tables/variables/tableDataComplex";
import DevelopmentTable from "../tables/components/DevelopmentTable";
import ColumnsTable from "../tables/components/ColumnsTable";
import ComplexTable from "../tables/components/ComplexTable";
import Version from './components/Version';
import Date from './components/Date';
import SideMenubar from './components/SideMenubar';

interface NoteBlock {
  id: number;
  content: string;
}

export default function Index() {

  const mockLatestVersion = "3.6.5";
  const [noteBlocks, setNoteBlocks] = useState<NoteBlock[]>([
    {id:1, content: ""},
  ]);
  const textRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    textRef.current.focus();
  });

  const addNewNoteBlock = () => {
    setNoteBlocks((prev) => {
      return (
        [...prev, {id: prev[prev.length-1].id+1, content:''}] 
      );
    });
  };
  
  const handleCreateBlockEnterKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>, id: number) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addNewNoteBlock();
    }
  }

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>, id: number) => {
    const updatedNoteBlocks = noteBlocks.map((noteBlock) =>
      noteBlock.id === id ? { ...noteBlock, content: event.target.value } : noteBlock
    );
    setNoteBlocks(updatedNoteBlocks);
  };

  // 엔터 누를 때 마다 textarea 나오도록 만들기
  // const newNoteBlock = document.getElementById("note-block");

  // function createNewNoteContent() {
  //   const newNoteContent = document.createElement("textarea");
  //   newNoteContent.classList.add("note-content");

  //   newNoteBlock.appendChild(newNoteContent);

  //   newNoteContent.focus();
  // };

  // document.addEventListener("keydown", function(event) {
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //     createNewNoteContent();
  //   }
  // })

  return (
    <div className="h-full grid-cols-1 gap-5 2xl:grid-cols-3">
      <div className="flex justify-between col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <div className='mt-5 w-full'>
          {noteBlocks.map((noteBlock) => (
            <textarea
            ref={textRef}
            id="note-block"
            key={noteBlock.id}
            value={noteBlock.content}
            onChange={(e) => handleContentChange(e, noteBlock.id)}
            onKeyDown={(e) => handleCreateBlockEnterKeyPress(e, noteBlock.id)} />
          ))

          }
          <textarea id="note-content" placeholder='test'></textarea>
        </div>
        {/* 버전, 날짜 생성 카드 */}
        <SideMenubar width={280}>
          <div className="mt-5 flex-row justify-center h-auto ">
            <Version latestVersion={mockLatestVersion} />
            <Date />
          </div>
        </SideMenubar>
      </div>
    </div>
  )
}
