/* eslint-disable */

import {useState, useEffect} from "react";
import {DragDropContext, Droppable} from "react-beautiful-dnd";

import EditableBlock from "../editableBlock";
import usePrevious from "../hooks/usePrevious";
import {objectId, setCaretToEnd} from "../util";

// A page is represented by an array containing several blocks
// [
//   {
//     _id: "5f54d75b114c6d176d7e9765",
//     html: "Heading",
//     tag: "h1",
//     imageUrl: "",
//   },
//   {
//     _id: "5f54d75b114c6d176d7e9766",
//     html: "I am a <strong>paragraph</strong>",
//     tag: "p",
//     imageUrl: "",
//   },
//     _id: "5f54d75b114c6d176d7e9767",
//     html: "/im",
//     tag: "img",
//     imageUrl: "images/test.png",
//   }
// ]

interface NoteBlock {
    id :number,
    html: string,
    tag: string,
    imageUrl: string;
}

const EditablePage = ({id, fetchedBlocks}: any) => {

    const [blocks, setBlocks] = useState<NoteBlock[]>(fetchedBlocks);
    const [currentBlockId, setCurrentBlockId] = useState(null);

    const prevBlocks = usePrevious(blocks);

    // Handling the cursor and focus on adding and deleting blocks
    useEffect(() => {
        // If a new block was added, move the caret to it
        if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
            const nextBlockPosition =
                blocks.map((b) => b._id).indexOf(currentBlockId) + 1 + 1;
            const nextBlock = document.querySelector(
                `[data-position="${nextBlockPosition}"]`
            );
            if (nextBlock) {
                nextBlock.focus();
            }
        }
        // If a block was deleted, move the caret to the end of the last block
        if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
            const lastBlockPosition = prevBlocks
                .map((b) => b._id)
                .indexOf(currentBlockId);
            const lastBlock = document.querySelector(
                `[data-position="${lastBlockPosition}"]`
            );
            if (lastBlock) {
                setCaretToEnd(lastBlock);
            }
        }
    }, [blocks, prevBlocks, currentBlockId]);

    const updateBlockHandler = (currentBlock) => {
        const index = blocks.map((b) => b._id).indexOf(currentBlock.id);
        const oldBlock = blocks[index];
        const updatedBlocks = [...blocks];
        updatedBlocks[index] = {
            ...updatedBlocks[index],
            tag: currentBlock.tag,
            html: currentBlock.html,
            imageUrl: currentBlock.imageUrl,
        };
        setBlocks(updatedBlocks);
        // If the image has been changed, we have to delete the
        // old image file on the server
    };

    const addBlockHandler = (currentBlock) => {
        setCurrentBlockId(currentBlock.id);
        const index = blocks.map((b) => b._id).indexOf(currentBlock.id);
        const updatedBlocks = [...blocks];
        const newBlock = {_id: objectId(), tag: "p", html: "", imageUrl: ""};
        updatedBlocks.splice(index + 1, 0, newBlock);
        updatedBlocks[index] = {
            ...updatedBlocks[index],
            tag: currentBlock.tag,
            html: currentBlock.html,
            imageUrl: currentBlock.imageUrl,
        };
        setBlocks(updatedBlocks);
    };

    const deleteBlockHandler = (currentBlock) => {
        if (blocks.length > 1) {
            setCurrentBlockId(currentBlock.id);
            const index = blocks.map((b) => b._id).indexOf(currentBlock.id);
            const deletedBlock = blocks[index];
            const updatedBlocks = [...blocks];
            updatedBlocks.splice(index, 1);
            setBlocks(updatedBlocks);
            // If the deleted block was an image block, we have to delete
        }
    };

    return (
        <>
            <Droppable droppableId={id}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {blocks.map((block) => {
                            const position =
                                blocks.map((b) => b._id).indexOf(block._id) + 1;
                            return (
                                <EditableBlock
                                    key={block._id}
                                    position={position}
                                    id={block._id}
                                    tag={block.tag}
                                    html={block.html}
                                    imageUrl={block.imageUrl}
                                    pageId={id}
                                    addBlock={addBlockHandler}
                                    deleteBlock={deleteBlockHandler}
                                    updateBlock={updateBlockHandler}
                                />
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </>
    );
};

export default EditablePage;
