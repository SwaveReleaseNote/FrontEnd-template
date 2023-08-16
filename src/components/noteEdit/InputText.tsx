/*eslint-disable*/
import React, {useState} from "react"
import AddBlock from "./AddBlock";

interface context {
    context: string,
    index: number,
    tag: string
}

interface block {
    contexts: context[],
    label: string,
}

function InputText(): JSX.Element {

    const [blocks, setBlocks] = useState<block[]>([{contexts: [{context: '', index: 0, tag: ''}], label: ''}]);
    // section 분리

    // create button 누르면 post

    // + 버튼 누르면 section 생성
    const addNewBlock = () => {
        setBlocks(prevState => {
            return [...prevState, {contexts: [{context: '', index: 0, tag: ''}], label: ''}]
        })
    }

    const renderAddBlock = (): JSX.Element[] => {
        return blocks.map((block, index: number) => {
            return <AddBlock block={block} setBlocks={setBlocks} index={index}/>
        });
    }

    return (
        // map 돌리기
        <div className="mb-5 ml-10 w-full flex-col" id='text'>
            {renderAddBlock()}
            <button
                className="mt-5 mb-5"
                onClick={() => addNewBlock()}
            >
                +
            </button>
        </div>

    )
}

export default InputText


