

import { useState } from "react";
import { getIndex } from "../Helpers/Helper";
import ContentEditable from "./ContentEditable";
import Icons from "./Icons";
function Note(props){
    const width=(!props.opacity)?'1px':''
    const hideText=(!props.opacity)?'d-none':''
    const colors=['','#ffff0099','#ff000099','#00ff0099']
    const[color,setColor]=useState(props.color)
    const changeColor=()=>{
        let currentColor=color+1
        currentColor=(currentColor > colors.length - 1) ? 0 : currentColor;

        setColor(currentColor);
        const notes = JSON.parse(localStorage.getItem("Notes"));
        const idx=getIndex(notes,props.id)
        let note_to_update=notes[idx];
        note_to_update.color=currentColor
        notes[idx]=note_to_update
        localStorage.setItem("Notes", JSON.stringify(notes));
    }
    return(
        <div className="col-lg-3 my-2" style={{width:width}}>
            <div className="note glass d-flex justify-content-between p-3" style={{backgroundColor:colors[color]}}>
            <div className={hideText+" w-100 d-flex"} style={{overflow:'hidden'}}>
                <ContentEditable id={props.id} html={props.html} placeholder={props.placeholder}></ContentEditable>
            </div>
                <div className={hideText+" d-flex flex-column"}>
                    <span onClick={()=>changeColor()} style={{color:(color+1)<colors.length?colors[color+1]:'#ffffff99'}} className=" d-inline-block px-1 rounded">{Icons().circle}</span>
                    <span className="d-inline-block px-1 rounded" style={{fontSize:'24px'}}>{Icons().sound}</span>
                    <span onClick={() => props.confirmDelete(props.id)}   className="text-danger d-inline-block px-1 rounded">{Icons().trash}</span>
                    
                </div>
                </div>
            
        </div>  
    )
}

export function CreateNote({createNewNote}){
    return(
        <div className="col-lg-3 my-2" >
            <div onClick={createNewNote} className="create-note glass d-flex justify-content-center align-items-center p-3">
            +
            </div>
        </div>  
    )
}

export default Note