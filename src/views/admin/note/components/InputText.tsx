/* eslint-disable */

import React, {
    useState,
    useRef,
    type KeyboardEvent,
    type ChangeEvent,
    useLayoutEffect,
    type FormEvent,
    useEffect,
    RefObject
} from 'react';
import DropdownMenu from './DropdownMenu';
import {filterDropdownOptions} from 'context/atom';
import {useRecoilState} from 'recoil';

interface NoteBlock {
    id: number;
    content: string;
}

// 선언하고 사용안한 오류
// interface LabelImage {
//   content: string;
// }

export default function InputText(): JSX.Element {
    const deselectedOptions = [
        'new',
        'update',
        'stop',
        'delete',
        'etc'
    ];

    const [noteBlocks, setNoteBlocks] = useState<NoteBlock[]>([{id: 1, content: ''}]);
    const [activeBlock, setActiveBlock] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({top: 0, left: 0});

    const textRef = useRef<HTMLTextAreaElement>(null);

    const [hasTextInDropdown, setHasTextInDropdown] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [hasInputValue, setHasInputValue] = useState(false);
    const [dropdownOptions, setDropdownOptions] = useRecoilState(filterDropdownOptions);

    const [isInputSlash, setIsInputSlash] = useState(false);
    const [isLaveling, setIsLaveling] = useState(false);

    // 현재 블록에 focus 주기
    useEffect(() => {
        textRef.current?.focus()
    })

    const addNewNoteBlock = (): void => {
        setNoteBlocks(prev => {
            return [...prev, {id: prev[prev.length - 1].id + 1, content: ''}];
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
            noteBlock.id === id
                ? {...noteBlock, content: event.target.value}
                : noteBlock,
        );
        setNoteBlocks(updatedNoteBlocks);
    };

    const handleNoteFocus = (id: number) => {
        setActiveBlock(id);
    }

    const handleUtilKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>, id: number) => {
        // '/' 버튼 누르지 않은 상태에서
        if (!isInputSlash) {
            if (event.key === "/") {
                const {selectionStart, offsetLeft, offsetTop, offsetHeight} = event.currentTarget;
                setCursorPosition({
                    top: offsetTop + offsetHeight,
                    left: offsetLeft + selectionStart * 8, // 8px 간격으로 표시하도록 설정 (임의로 설정)
                });

                setIsInputSlash(true);
                setShowDropdown(true);
            }
        }
        // '/' 버튼 눌러진 상태라면
        else if(isInputSlash === true){
            var value: string = inputValue;

            if (event.code.substring(0, event.code.length - 1) === 'Key') {
                // input value 에 '/' 이후 값을 점차 추가해준다
                value += event.key;

                setInputValue(value);
                console.log(inputValue);
                setHasInputValue(true);
            } else if (event.key === 'Backspace') {
                value = value.substring(0, value.length - 1);
                console.log(value);
                setInputValue(value);
                if (inputValue === '') {
                    setHasInputValue(false);
                }
            }

            // dropdown option을 바꿔 준다.
            const tmps: string[] = [];
            deselectedOptions.filter((option => {
                if (option.includes(inputValue)) {
                    console.log("다음 항목들이 자동완성 : " + option);
                    tmps.push(option)
                }
            }))
            console.log(tmps);
            setDropdownOptions(tmps);

            // 드롭다운을 끌 경우
            if (!hasInputValue) {
                if (event.key === 'Backspace' || event.key === 'Escape' || event.key === 'Space') {
                    // 드롭다운 메뉴 초기화
                    setDropdownOptions([
                        'new',
                        'update',
                        'stop',
                        'delete',
                        'etc'
                    ])
                    setIsInputSlash(false);
                    setShowDropdown(false);
                    setInputValue('');
                }
            }
        }

    }

    return (
        <div className=" ml-10 mt-5 w-full flex-col" id='text'>
            {noteBlocks.map(noteBlock => (
                <textarea
                    rows={1}
                    id="note-block"
                    key={noteBlock.id}
                    ref={textRef}
                    value={noteBlock.content}
                    onChange={event => {
                        handleContentChange(event, noteBlock.id);
                    }}
                    onClick={() => handleNoteFocus(noteBlock.id)}
                    onKeyDown={event => {
                        handleUtilKeyPress(event, noteBlock.id);
                        handleCreateBlockEnterKeyPress(event, noteBlock.id);
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
