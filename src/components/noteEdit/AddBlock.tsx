/*eslint-disable*/

import ContentEditable, {ContentEditableEvent} from "react-contenteditable";
import React, {useEffect, useRef, useState} from "react"
import {render} from "@testing-library/react";
import New from '../../assets/img/label/NEW.png'
import Update from '../../assets/img/label/UPDATE.png'
import Delete from '../../assets/img/label/DELETE.png'
import Stop from '../../assets/img/label/STOP.png'
import etc from '../../assets/img/label/ETC.png'
import DropdownMenu from "../../views/admin/note/components/DropdownMenu";
import {useRecoilState} from "recoil";
import {blockState, contextsState} from "../../context/atom";
import project from "../../views/admin/profile/components/Project";


interface context {
    context: string,
    index: number,
    tag: string
}

interface block {
    contexts: context[],
    label: string,
}

function AddBlock(props: {block: block, blocks: block[], setBlocks: React.Dispatch<React.SetStateAction<block[]>>, index: number}) : JSX.Element {

    const [contexts, setContexts] = useState<context[]>([{context: '', index: 0, tag: ''}]);
    const [selectedLabel, setSelectedLabel] = useState<string>('');
    const optionLabelList = ["Label을 선택해주세요","New", "Update", "Delete", "Stop", "etc"]
    const labeling = [New, Update, Delete, Stop, etc]
    const textRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([]);
    const focusingNewText = useRef<HTMLTextAreaElement>(null);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [cursorPosition, setCursorPosition] = useState({top: 0, left: 0});
    const [blockRecoilState, setBlockRecoilState] = useRecoilState(blockState)

    useEffect(() => {
        textRefs.current[contexts.length-1]?.current?.focus()

        // block 업데이트
        const updatedBlock = props.blocks.map((block, blockIndex) =>
            blockIndex === props.index
                ? {...block, contexts: contexts, label: selectedLabel}
                : block
        )
        props.setBlocks(updatedBlock)

        setBlockRecoilState(props.blocks)
        console.log(blockRecoilState)
    }, [contexts, selectedLabel]);

    // section 내부에서 text area 생성되도록 만들기
    const addContext = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key==='Enter') {
            console.log("Enter 눌림")
            event.preventDefault()
            setContexts(prev => {
                return [...prev, {context: '', index: prev[prev.length-1].index + 1, tag: ''}]
            })
        }
    }

    // section 에 context value 값 바뀌도록 만들기
    const handleContextChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, contextIndex: number) => {
        const updateContext = contexts.map(context =>
            context.index === index
                ? {...context, context: event.target.value}
                : context
        )
        setContexts(updateContext)

    }

    const handleSelectLabel = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLabel(event.target.value)
    }

    const showLabelImage = (labelOption : string) => {
        switch (labelOption) {
            case "New":
                return (
                    <img className='my-5 rounded-xl w-1/12 max-w-lg shadow-xl' src={New}/>
                )
            case "Update":
                return (
                    <img className='my-5 rounded-xl w-1/12 max-w-lg shadow-xl' src={Update}/>
                )
            case "Delete":
                return (
                    <img className='my-5 rounded-xl w-1/12 max-w-lg shadow-xl' src={Delete}/>
                )
            case "Stop":
                return (
                    <img className='my-5 rounded-xl w-1/12 max-w-lg shadow-xl' src={Stop}/>
                )
            case "etc":
                return (
                    <img className='my-5 rounded-xl w-1/12 max-w-lg shadow-xl' src={etc}/>
                )
        }
    }

    const handleShowDropdown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const {selectionStart, offsetLeft, offsetTop, offsetHeight} = event.currentTarget;
        selectionStart === null
            ? setCursorPosition({
                top: offsetTop + offsetHeight,
                left: offsetLeft * 8
            })
            : setCursorPosition({
                top: offsetTop + offsetHeight,
                left: offsetLeft + selectionStart * 8 , // 8px 간격으로 표시하도록 설정 (임의로 설정)
            });
        setShowDropdown(true)
    }

    return (
        <div>
            <hr className="mt-5"/>
            {/* 라벨 선택 부분*/}
            <div className="flex w-full justify-between mt-5">
                <div className='flex-col'>
                    <select
                        onChange={event => handleSelectLabel(event)} value={selectedLabel}
                    >
                        {optionLabelList.map((label) => (
                            <option value={label} key={label}>
                                {label}
                            </option>
                        ))}
                    </select>
                    {showLabelImage(selectedLabel)}
                </div>
                <button>
                    x
                </button>
            </div>

            {/*Text 작성 부분 엔터 누를 때 마다 추가 되도록*/}
            <div className="mt-7 w-full flex-col" id='text'>
                {contexts.map((context, contextIndex) => (
                    <input
                        className="w-[80%] resize-none bg-lightPrimary outline-none "
                        key={context.index}
                        value={context.context}
                        ref={textRefs.current[contextIndex]}
                        placeholder={"text를 입력해주세요"}
                        onChange={event => handleContextChange(event, context.index, contextIndex)}
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                addContext(event)
                            }

                            if (event.key === '/') {
                                handleShowDropdown(event)
                            }
                        }}
                    >
                    </input>
                ))}
                {showDropdown && (
                    <DropdownMenu
                        // 버튼을 클릭하면 show dropdown 사라지도록 만들기
                        cursorPosition={cursorPosition}
                        onClose={() => {
                            setShowDropdown(false);
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default AddBlock;
