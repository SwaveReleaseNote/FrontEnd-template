import React, { useState, useRef, useEffect, Component, KeyboardEvent, ChangeEvent, useLayoutEffect, FormEvent } from 'react'
import DropdownMenu from './DropdownMenu';

interface NoteBlock {
  id: number;
  content: string;
}

export default function InputText() {
  const [noteBlocks, setNoteBlocks] = useState<NoteBlock[]>([{ id: 1, content: "" },]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const textRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    textRef.current.focus();
  });

  const addNewNoteBlock = () => {
    setNoteBlocks((prev) => {
      return (
        [...prev, { id: prev[prev.length - 1].id + 1, content: '' }]
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

  const handleTextAreaHeight = (event: FormEvent<HTMLTextAreaElement>, id: number) => {
    textRef.current.style.height = 'auto';
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
  }

  const handleSelectLabelSlashKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>, id: number) => {
    if (event.key === '/') {
      // '/' 키가 눌렸을 때 드롭다운 메뉴를 표시
      const { selectionStart, offsetLeft, offsetTop, offsetHeight } = event.currentTarget;
      setCursorPosition({
        top: offsetTop + offsetHeight,
        left: offsetLeft + selectionStart * 8, // 8px 간격으로 표시하도록 설정 (임의로 설정)
      });
      setShowDropdown(true);
    } else if (event.key === 'Backspace' || event.key === 'Escape') {
      // 'Escape' 키가 눌렸을 때 드롭다운 메뉴를 닫음
      setShowDropdown(false);
    }
  }

  return (
    <div className=' ml-10 mt-5 w-full flex-col'>
      {noteBlocks.map((noteBlock) => (
        <textarea
          rows={1}
          ref={textRef}
          id="note-block"
          key={noteBlock.id}
          value={noteBlock.content}
          onChange={(event) => handleContentChange(event, noteBlock.id)}
          onKeyDown={(event) => {
            handleSelectLabelSlashKeyPress(event, noteBlock.id)
            handleCreateBlockEnterKeyPress(event, noteBlock.id)
          }}
          onInput={(event) => handleTextAreaHeight(event, noteBlock.id)}
          className='w-[80%] resize-none bg-lightPrimary outline-none'
          placeholder='text를 입력해주세요' />
      ))}
      {showDropdown && (
        <DropdownMenu cursorPosition={cursorPosition} onClose={() => setShowDropdown(false)} />
      )}
    </div>
  )
}
