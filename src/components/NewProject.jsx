import Input from "./Input.jsx"
import {useRef, useState} from "react"
import Modal from "./Modal.jsx"

function NewProject({onAdd, onCancel}) {
    const dialog = useRef();

    const titleRef =  useRef();
    const DescriptionRef =  useRef()
    const dateRef =  useRef()

    function handleSave(){
      const enteredTitle = titleRef.current.value;
      const enteredDescription =  DescriptionRef.current.value
      const enteredDate =  dateRef.current.value;

      if(enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDate.trim() === ''){
          dialog.current.open();
          return;
      }
      
      onAdd(
        {
          title: enteredTitle,
          description: enteredDescription,
          date: enteredDate
        }
      );
    }

  return(
    <>
      <Modal ref = {dialog} buttonInfo = "Okay">
        <h1 className = "text-xl font-bold text-stone-700 my-4">invalid Input</h1>
        <p className = "text-stone-600 mb-4">Oops ... looks like you forgot to enter a value</p>
        <p className = "text-stone-600 mb-4">Please make sure you provide a valid value for every input field</p>
      </Modal>
      <div className = "flex flex-col justify-center items-center h-full w-2/3">
        <div className = "w-full ml-divMargin">
            <p className = "flex justify-end w-10/12">
                  <button className = "bg-transparent text-[black] px-5 py-2 tracking-wider" onClick = {onCancel}>Cancel</button>
                  <button className = "bg-[#4F46E5] text-[#FFFFFF] px-5 py-2 rounded-md tracking-wider" onClick = {handleSave}>Save</button>
            </p>
            <Input ref = {titleRef} label = "Title" type = "text" />
            <Input ref = {DescriptionRef} label = "Description" textarea/>
            <Input ref = {dateRef} label = "Due-Date" type = "date"/>
        </div>
      </div>
    </>

  )
}

export default NewProject
