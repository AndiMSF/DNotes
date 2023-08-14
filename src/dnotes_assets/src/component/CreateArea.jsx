import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add"
import Fab from "@material-ui/core/Fab"
import Zoom from "@material-ui/core/Zoom"

function CreateArea(props) {

  const [input, setInput] = useState({title:"",content: ""});
  const [showForm, setShowForm] = useState(false)

  function showSomething(){
    setShowForm(true)
  }

  function handleInput(event){
    const {name, value} = event.target
    
    setInput((prevValue)=>{ 
      if(name === "title"){
        return {title: value, content:prevValue.content}
      } else if (name === "content"){
        return {content:value, title:prevValue.title}
      }
    })
  }

  return (
    <div>
      <form className="create-note">
        {showForm && <input onChange={handleInput} name="title" placeholder="Title" value={input.title} />}
        <textarea onClick={showSomething} onChange={handleInput} name="content" placeholder="Take a note..." value={input.content} rows={showForm ? "3" : "1"} />
        <Zoom in={showForm}>
        <Fab onClick={(event)=>{
          props.onClicked(input) 
          setInput({title:"",content: ""})
          event.preventDefault()
          }}><AddIcon /></Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
