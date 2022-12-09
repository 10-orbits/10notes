import { useEffect, useState,useCallback } from "react";
import Confirm from "./Confirm";
import Note, { CreateNote } from "./Note"
import {v4 as uuid} from 'uuid';
import { getIndex } from "../Helpers/Helper";
import update from 'immutability-helper'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

 function Notes(){
    const data = JSON.parse(localStorage.getItem("Notes"));
    const defaultText ='Click to edit this note';
    const [notes,setNotes]=useState(data?data:[])
    const [modalShow, setModalShow] = useState(false);
    const [deleteID, setDeleteID] = useState(null);
    const [creating, setCreating] = useState(false);
    
    

    const createNewNote = () =>{
        setCreating(true)
        setNotes((prevState) => ([
          {id:uuid(),html:defaultText,opacity:0,color:0},
          ...prevState
        ]
        ))
      }
      const fadeNote=(prevState)=>{
        const idx=getIndex(prevState,deleteID)
        let notetodel=prevState[idx]
        notetodel.opacity=0
        prevState[idx]=notetodel
        return prevState
        //return 
      }

      const deleteNote = () => {
        setNotes((prevState) => ( 
            prevState.filter(item => item.id !== deleteID)
        ))
      }
      const confirmDelete = (id) => {
        setModalShow(true)
        setDeleteID(id)
      }
      const confirmHide = (confirmed) => {
        setModalShow(false)
        if(confirmed){
            setNotes((prevState) => ( 
                fadeNote(prevState)
            ))
          setTimeout(deleteNote,300)
        }
      }
      

      useEffect(() => {
        localStorage.setItem("Notes", JSON.stringify(notes));
        if(creating===true){
            setCreating(false)
            notes[0].opacity=1
            
        }
        setNotes(notes)
      }, [notes,creating]);

      const moveCard = useCallback((dragIndex, hoverIndex) => {
        const notes = JSON.parse(localStorage.getItem("Notes"));
        setNotes((prevCards) =>
          update(notes, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, notes[dragIndex]],
            ],
          }),
        )
      }, [])
      
    return (
       <>
        <CreateNote createNewNote={createNewNote}></CreateNote>
        <DndProvider backend={HTML5Backend}>
        {
            
            notes.map((note,i)=>(<Note index={i} moveCard={moveCard} color={note.color} opacity={note.opacity} placeholder={defaultText} key={note.id} html={note.html} id={note.id} confirmDelete={confirmDelete} />))
        }
        </DndProvider>
        <Confirm
        show={modalShow}
        onHide={confirmHide}
        />
      </>
   )
}
export default Notes

