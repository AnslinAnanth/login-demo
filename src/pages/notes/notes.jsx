import React, { useEffect, useState } from 'react'
import { CgSearch } from "react-icons/cg";
import './notes.css'
import Notescomponent from '../../components/notescomponent/notescomponent';
import { IoMdAdd } from "react-icons/io";
import Popup from '../../components/notescomponent/popup/popup';
import { Audio } from 'react-loader-spinner';




function Notes() {


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

  const BASE_URL = 'https://script.google.com/macros/s/AKfycbyDc4-4K2hj3GL7Ckb4GX7DXCteRJ0DHwjgb6am5NYq2Aom4dGiaqU9L74gkABBBDYh/exec'
  const [isVisible, setisVisible] = useState(false)
  const [notesTitle, setNotesTitle] = useState('')
  const [notesContent, setNotesContent] = useState('')
  const [notesList, setNotesList] = useState([])
  const [editIndex, setEditIndex] = useState()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
    
      getNotesAPI()
    } catch (error) {
      setLoaded(false)
      console.error(error)
    }
  },)
  async function getNotesAPI() {
    setLoaded(true)
    const url = `${BASE_URL}?action=getNotes`
     const response = await fetch(url, {
      redirect: "follow",
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    })
    
    if (response.ok) {
      
      const result = await response.text()
      let list = JSON.parse(result).notesList
      setNotesList(list)
      setLoaded(false)
      
    } else {
       console.log("Something went wrong")
       setLoaded(false)
    }
  }

  async function postNotesAPI(note) {
    const url = `${BASE_URL}?action=postNotes`

    const response = await fetch(url, {
      redirect: "follow",
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    })

    if (response.ok) {
      getNotesAPI()
      setisVisible(false)
      setNotesTitle('')
      setNotesContent('')
    } else {
      console.log("Something went wrong")
    }
  }

  async function putNotesApi(note) {
    const url = `${BASE_URL}?action=putNotes`

    const response = await fetch(url, {
      redirect: "follow",
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    })

    if (response.ok) {
      getNotesAPI()
      setisVisible(false)
      setNotesTitle('')
      setNotesContent('')
    } else {
      console.log("Something went wrong")
    }
  }

  async function deleteNotesAPI(note) {
    const url = `${BASE_URL}?action=deleteNotes`

    const response = await fetch(url, {
      redirect: "follow",
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    })

    if (response.ok) {
      getNotesAPI()
      setisVisible(false)
      setNotesTitle('')
      setNotesContent('')
    } else {
      console.log("Something went wrong")
    }
  }

  function addButtonClicked() {
    console.log('add')
    setisVisible(true)
  }
  function cancelButtonClicked() {
    setisVisible(false)
  }
  function doneClicked() {
    let note = {
      title: notesTitle,
      note: notesContent
    }
    try {
      postNotesAPI(note)
    } catch (error) {
      console.error(error)
    }
  }

  function updateClicked() {
    let editnotes = {
      id: editIndex,
      title: notesTitle,
      note: notesContent
    }
    console.log(editnotes)
    try {
      putNotesApi(editnotes)
    } catch (error) {
      console.error(error)
    }
  }

  function deleteClicked(noteId) {
    let deleteNote = {
      id: noteId
    }

    try {
      deleteNotesAPI(deleteNote)
    } catch (error) {
      console.error(error)
    }
  }

  function editClicked(notesIndex) {
    let editnotes = notesList[notesIndex]
    setisVisible(true)
    console.log(editnotes)
    setNotesTitle(editnotes.title)
    setNotesContent(editnotes.note)
    setEditIndex(editnotes.id)

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
      {loaded &&
        <div className='loader'>
          <Audio
            height="50"
            width="50"
            radius="5"
            color="black"
            ariaLabel="loading"
            
          />
        </div>}
    </div>
  )
}

export default Notes