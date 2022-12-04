import React from "react"
function MenuItem ({icon,title,css,handleClick}){
    
    return(
          <button onClick={handleClick} className={(css?'btn-'+css:'btn-outline-secondary')+"  btn-sm btn m-1"} title={title}>{icon}</button>
        );
      
}


export default MenuItem