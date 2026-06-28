import {useState} from "react"

export default function NewTask({onAdd}){
const [enteredValue, setEnteredValue] = useState('')

    function handleValue(event){
        setEnteredValue(event.target.value)
    }

    function handleClick(){
        if(enteredValue.trim() === ''){
            return;
        }
        onAdd(enteredValue);
        setEnteredValue('')
    }
    return(
        <div className = "flex items-center gap-4">
            <input type="text" className = "w-64 px-2 py-1 rounded-sm bg-stone-200" onChange = {handleValue} value = {enteredValue}/>
            <button className = "text-stone-700 hover:text-stone-950" onClick = {handleClick}>Add Task</button>
        </div>
    )
}