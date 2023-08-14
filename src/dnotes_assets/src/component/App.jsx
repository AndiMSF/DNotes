import React, {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dnotes } from "../../../declarations/dnotes";

function App() {

  const [arrayNotes, setArrayNotes] = useState([])

  function addNotes(input){
    setArrayNotes((prevItems) => {
      dnotes.createNote(input.title, input.content)
      return [input, ...prevItems]
    })
  }

  function removeNotes(id) {
    dnotes.removeNote(id)
    setArrayNotes((prevItems) => {
      return prevItems.filter((notes, index) => {
        return index !== id
      })
    })
  }

  async function fetchData(){
    const arrayNotes = await dnotes.showNotes();
    setArrayNotes(arrayNotes);
  }

  useEffect(()=>{
    fetchData()
  }, [])

  return (
    <div>
      <Header />
      <CreateArea onClicked={addNotes}/>
      <div className="container">
      {arrayNotes.map((semuaNotes, index) => {
        return <Note key={index} id={index} title={semuaNotes.title} content={semuaNotes.content} onDeleted={removeNotes}/>
      })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
