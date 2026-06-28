import React from 'react'
import Task from './Task.jsx'

function selectedObject({project, onDelete, onAddTask, onDeleteTask, tasks}) {
  const formattedDate = new Date(project.date).toLocaleTimeString('en-Us', {year: 'numeric', month: 'short', day: 'numeric',})
  return (
    <div className = "h-full w-2/3">
      <div className = 'w-[35rem] mt-16 ml-divMargin'>
        <header className = "pb-4 mb-4 border-b-2 border-stone-300">
          <div className = "flex items-center justify-between">
            <h2 className = "text-3xl font-bold text-stone-600 mb-2">{project.title}</h2>
            <button className = "text-stone-600 hover: text-ston-950" onClick = {onDelete}>Delete</button>
          </div>
          <p className = "mb-4 text-stone-4">{formattedDate}</p>
          <p className = "text-stone-600 whitespace-pre-wrap">{project.description}</p> {/*"whitespace-pre-wrap" is used to keep the line space between two paragraphs after the form or description has been submitted */}
        </header>
        <Task onAdd = {onAddTask} onDelete = {onDeleteTask} tasks = {tasks}/>
      </div>
    </div>

  )
}

export default selectedObject
