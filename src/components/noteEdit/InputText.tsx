/*eslint-disable*/
import React, {useEffect, useState} from "react"
import AddBlock from "./AddBlock";
import api from "../../context/api";
import {useRecoilState, useRecoilValue} from "recoil";
import {blockState, contextsState, projectIdState} from "../../context/atom";
import axios from "axios";
import createProject from "../../views/admin/default/pages/CreateProject";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;

interface context {
    context: string,
    index: number,
    tag: string
}

interface block {
    contexts: context[],
    label: string,
}

interface noteFrom {
    blocks: [
        {
            contexts: [
                {
                    context: "",
                    index: 0,
                    tag: ""
                }
            ],
            label: "",
        }
    ],
    releaseDate: "",
    version: ""
}

function InputText(): JSX.Element {

    const [blocks, setBlocks] = useState<block[]>([{contexts: [{context: '', index: 0, tag: ''}], label: ''}]);
    const [contextsRecoilState, setContextsRecoilState] = useRecoilState(contextsState)
    const [blockRecoilState, setBlockRecoilState] = useRecoilState(blockState)

    const addNewBlock = () => {
        setBlocks(prevState => {
            return [...prevState, {contexts: [{context: '', index: 0, tag: ''}], label: ''}]
        })
        setBlockRecoilState(blocks)
    }

    const renderAddBlock = (): JSX.Element[] => {
        return blocks.map((block, index: number) => {
            return <AddBlock block={block} blocks={blocks} setBlocks={setBlocks} index={index}/>
        });
    }

    return (
        // map 돌리기
        <div className="mb-5 ml-10 w-full flex-col" id='text'>
            {renderAddBlock()}
            <button
                className="text-white bg-gradient-to-br from-purple-300 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1 text-center mt-3 mr-2 mb-2"
                onClick={() => addNewBlock()}
            >
                +
            </button>
        </div>

    )
}

export default InputText


