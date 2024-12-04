import React, { useState } from 'react'
import './popup.css'
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

function Popup(props) {
    const { cancelButtonClicked, doneClicked, notesTitle, setNotesTitle, notesContent, setNotesContent,updateClicked } = props
    const [isNew, setIsNew] = useState(notesTitle === '' ?? true)
    return (
        <div className='mainContainer'>
            <div className='mainPop'>
                <div className='popNote'>
                    <h5>Add new note</h5>
                </div>
                <div className='popInp'>
                    <input type='text' placeholder='Title' className='inp' value={notesTitle} onChange={(event) => setNotesTitle(event.target.value)} />
                    <textarea type='text' placeholder='Notes Content' value={notesContent} onChange={(event) => setNotesContent(event.target.value)} />
                </div>

                <div className='popIcon'>
                    {isNew ? <p className='addbn' onClick={doneClicked}>Add</p> : <p className='addbn' onClick={updateClicked}>Update</p>}

                    <p className='cancelbn' onClick={cancelButtonClicked}> Cancel</p>
                </div>
            </div>
        </div>
    )
}

export default Popup