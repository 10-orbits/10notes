import { useState } from "react";
import { getIndex } from "../Helpers/Helper";
import { stripHtml } from "string-strip-html";
function ContentEditable(props){
    //const[ihtml,setHtml]=useState(props.html)
    const[editable,setEditable]=useState(false)
    const makeEditable=()=>{
        setEditable(true)
    }
    const saveEdits=(e)=>{
        //setHtml(e.target.innerHTML) 
        const notes = JSON.parse(localStorage.getItem("Notes"));
        const idx=getIndex(notes,props.id)
        
        let note_to_update=notes[idx];
        note_to_update.html=stripHtml(e.target.innerHTML,{ignoreTags:['br','div']}).result
        //note_to_update.html=e.target.innerHTML
        notes[idx]=note_to_update
        localStorage.setItem("Notes", JSON.stringify(notes));
    }
    return(
        <div className="w-100"
        onClick={makeEditable} 
        onInput={saveEdits}
        contentEditable={(editable)?'true':false}
        suppressContentEditableWarning={true}
        style={{opacity:props.opacity}} placeholder-text={props.placeholder} dangerouslySetInnerHTML={{__html: props.html}}/>
    )
}

export default ContentEditable