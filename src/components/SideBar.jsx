import React from 'react'
import Button from './Button.jsx'

function SideBar({handleAddProject, projects, onSelectProject, selectedProjectId}) {
  return (
    <div className = "bg-[#4F46E5] h-screen w-1/3 rounded-tr-3xl px-horizPadding py-vertPadding " >
      <h1 className = "font-bold uppercase text-white mt-4 tracking-wide">
        Your Projects
      </h1>
      <div>
        <Button onClick = {handleAddProject}>+ Add Project</Button>
      </div>
        <ul className = "mt-8">
          {
            projects.map((project) => {
                let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-800"
                if(project.id === selectedProjectId){
                  cssClasses += " text-stone-200 bg-stone-800"
                }else{
                  cssClasses += " text-stone-400"
                }
                return (
                  <li  key = {project.id}>
                    <button className = {cssClasses} onClick = {() => onSelectProject(project.id)}>
                      {project.title}
                    </button>
                  </li>
                )
              }
          )}
        </ul>
    </div>
  )
}

export default SideBar

