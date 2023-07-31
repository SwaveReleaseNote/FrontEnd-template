import React, { useState, useRef, type KeyboardEvent, type ChangeEvent, useLayoutEffect, type FormEvent } from 'react';
import DropdownMenu from './DropdownMenu';

interface NoteBlock {
   id: number;
   content: string;
}

// 선언하고 사용안한 오류
// interface LabelImage {
//   content: string;
// }

export default function InputText(): JSX.Element {
   const [noteBlocks, setNoteBlocks] = useState<NoteBlock[]>([{ id: 1, content: '' }]);
   const [showDropdown, setShowDropdown] = useState(false);
   const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
   // 선언하고 사용안한 오류
   // const [showLabelImage, setShowLabelImage] = useState();
   // 선언하고 사용안한 오류
   // const [labelImage, setLabeImage] = useRecoilState(labelState);
   const textRef = useRef<HTMLTextAreaElement>(null);

   useLayoutEffect(() => {
      // null일 수 있는 경우 뒤에 ? 붙여주기
      textRef.current?.focus();
   });

   const addNewNoteBlock = (): void => {
      setNoteBlocks(prev => {
         return [...prev, { id: prev[prev.length - 1].id + 1, content: '' }];
      });
   };

   const handleCreateBlockEnterKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>, id: number): void => {
      if (event.key === 'Enter') {
         event.preventDefault();
         addNewNoteBlock();
      }
   };

   const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>, id: number): void => {
      const updatedNoteBlocks = noteBlocks.map(noteBlock =>
         noteBlock.id === id ? { ...noteBlock, content: event.target.value } : noteBlock,
      );
      setNoteBlocks(updatedNoteBlocks);
   };

   const handleTextAreaHeight = (event: FormEvent<HTMLTextAreaElement>, id: number): void => {
      if (textRef.current !== null) {
         textRef.current.style.height = 'auto';
         textRef.current.style.height = String(textRef.current.scrollHeight) + 'px';
      }
   };

   const handleShowLabelsSlashKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>, id: number): void => {
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
   };

   // const handleShowLabel = () => {

   // }

   return (
      <div className=" ml-10 mt-5 w-full flex-col">
         {noteBlocks.map(noteBlock => (
            <textarea
               rows={1}
               ref={textRef}
               id="note-block"
               key={noteBlock.id}
               value={noteBlock.content}
               onChange={event => {
                  handleContentChange(event, noteBlock.id);
               }}
               onKeyDown={event => {
                  handleShowLabelsSlashKeyPress(event, noteBlock.id);
                  handleCreateBlockEnterKeyPress(event, noteBlock.id);
               }}
               onInput={event => {
                  handleTextAreaHeight(event, noteBlock.id);
               }}
               className="w-[80%] resize-none bg-lightPrimary outline-none"
               placeholder="text를 입력해주세요"
            />
         ))}
         {showDropdown && (
            <DropdownMenu
               cursorPosition={cursorPosition}
               onClose={() => {
                  setShowDropdown(false);
               }}
            />
         )}
      </div>
   );
}
