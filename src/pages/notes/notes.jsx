import React, { useEffect, useState } from 'react'
import { CgSearch } from "react-icons/cg";
import './notes.css'
import Notescomponent from '../../components/notescomponent/notescomponent';
import { IoMdAdd } from "react-icons/io";
import Popup from '../../components/notescomponent/popup/popup';




function Notes() {
  const [isVisible, setisVisible] = useState(false)
  const [notesTitle, setNotesTitle] = useState('')
  const [notesContent, setNotesContent] = useState('')
  const [notesList, setNotesList] = useState(JSON.parse(localStorage.getItem('noteslist')) ?? [])
  useEffect(() => {
    localStorage.setItem('noteslist', JSON.stringify(notesList))
  }, [notesList])
  const [editIndex, setEditIndex] = useState()

  // const notesList = [
  //   {
  //     title: "My Birthday",
  //     content: "July 21"
  //   },
  //   {
  //     title: "Buddy ma Birthday",
  //     content: "June 09"
  //   },
  //   {
  //     title: "Deeksha Birthday",
  //     content: "April 22"
  //   }
  // ]
  function addButtonClicked() {
    console.log('add')
    setisVisible(true)
  }
  function cancelButtonClicked() {
    setisVisible(false)
  }
  function doneClicked() {
    let notes = {
      notesTitle: notesTitle,
      notesContent: notesContent
    }
    setNotesList([...notesList, notes])
    setisVisible(false)
    setNotesTitle('')
    setNotesContent('')
  }
  function updateClicked() {
    let editnotes = {
      notesTitle: notesTitle,
      notesContent: notesContent
    }
    console.log(editnotes)
    let oldnotes = notesList
    let updatedNotes = []
    oldnotes.map((item, index) => {
      if (editIndex === index) {
        updatedNotes.push(editnotes)
      }
      else {
        updatedNotes.push(item)
      }

    })
    setNotesList(updatedNotes)
    setisVisible(false)

  }
  function deleteClicked(notesIndex) {
    let oldNotes = notesList
    let updatedNotes = []
    oldNotes.map((item, index) => {
      if (notesIndex != index) {
        updatedNotes.push(item)
      }
    })
    setNotesList(updatedNotes)
  }
  function editClicked(notesIndex) {
    let editnotes = notesList[notesIndex]
    setisVisible(true)
    console.log(editnotes)
    setNotesTitle(editnotes.notesTitle)
    setNotesContent(editnotes.notesContent)
    setEditIndex(notesIndex)

  }


  return (
    <div className='mainNotesContainer'>
      <div className='notesInput'>
        <CgSearch className='searchIcon' />
        <input className='textInput' type='text' placeholder='Search notes....' />
      </div>
      <div className='notesList'>
        {
          notesList.map((item, index) => (
            <Notescomponent notesIndex={index} notesItem={item} deleteClicked={deleteClicked} editClicked={editClicked} />

          ))}
      </div>
      <div className='notButton' onClick={addButtonClicked}>
        <div className='addButton'>
          <IoMdAdd />
        </div>
      </div>
      {isVisible &&
        <div className='popUp'>
          <Popup cancelButtonClicked={cancelButtonClicked} doneClicked={doneClicked} notesTitle={notesTitle} setNotesTitle={setNotesTitle} notesContent={notesContent} setNotesContent={setNotesContent} updateClicked={updateClicked} />
        </div>}
    </div>
  )
}

export default Notes