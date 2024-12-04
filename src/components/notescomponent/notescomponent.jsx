import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import './notescomponent.css'
import Popup from './popup/popup';

function Notescomponent(props) {
  const{notesItem,notesIndex,deleteClicked,editClicked}=props
  
  function dClicked(){
    deleteClicked(notesIndex)
  }
  function eClicked(){
    editClicked(notesIndex)
  }
  return (
    <div className='mainNotesComponent'>
      <div className='subNotesComponent'>
        <div className='notesComponentHeader'>
          <h2>{notesItem.notesTitle}</h2>
          <div className='dcIcon'>
          <FaRegEdit onClick={eClicked}/>
          <MdDelete onClick={dClicked} />
          </div>
        </div>
        <div className='content'>
          <p>{notesItem.notesContent}</p>
        </div>
      </div>
    </div>
  )
}

export default Notescomponent