import {useState, useRef} from "react"
import NoProject from "./components/NoProject.jsx"
import SideBar from "./components/SideBar.jsx"
import NewProject from "./components/NewProject.jsx"
import SelectedProject from "./components/selectedProject.jsx"

function App() {
  const [addProject, setAddProject] = useState({
    SelectedProjectId: undefined,
    projects: [],
    tasks: []
  })// selected projec id is set to undefined when no project is created, null when a project is created, and a value when a project is selected

  function handleAddTask(text){
    setAddProject((prevProjects => {
      let taskId = Math.random();

      let newTask = {
        text: text,
        projectId: prevProjects.SelectedProjectId,
        id: taskId
      }
      return{
        ...prevProjects,
        tasks:[ newTask, ...prevProjects.tasks]
      }
    }))
  }

  console.log(addProject.tasks)

  function handleTaskDelete(id){
    setAddProject((prevProjects => {
      return{
        ...prevProjects,
        tasks: prevProjects.tasks.filter((task) => task.id !== id)//use to return an array that contains list of elements that satisfy the given condition, and delete the elements that does not meet the condition from the array.
      }
    }))
  }
  
  function handleSelectProject(id){
    setAddProject((prevProjects => {
      return{
        ...prevProjects,
        SelectedProjectId: id
      }
    }))
  }

  //rendering a jsx conditionally when project is created or not
  function handleStartAddProject(){
    setAddProject((prevProjects => {
      return{
        ...prevProjects,
        SelectedProjectId: null
      }
    }))
  }
   function handleCancelProject(){
      setAddProject((prevProjects => {
        return{
          ...prevProjects,
          SelectedProjectId: undefined
        }
      }))
   }

  function handleAddProject(project){
    let projectId = Math.random()
    const newProject = {
      ...project,
      id: projectId
    }
    setAddProject(prevProject => {
      return{
        ...prevProject,
        SelectedProjectId: undefined,
        projects: [...prevProject.projects, newProject]
      }
    })
  }

  function handleDeleteProject(){
    setAddProject((prevProjects => {
      return{
        ...prevProjects,
        SelectedProjectId: undefined,
        projects: prevProjects.projects.filter((project) => project.id !== prevProjects.SelectedProjectId)//use to return an array that contains list of elements that satisfy the given condition, and delete the elements that does not meet the condition from the array.
      }
    }))
  }


  let projectSelected = addProject.projects.find((project) => project.id === addProject.SelectedProjectId)

  let content = <SelectedProject project = {projectSelected} onDelete = {handleDeleteProject} onAddTask = {handleAddTask} onDeleteTask = {handleTaskDelete} tasks = {addProject.tasks}/>;

  if(addProject.SelectedProjectId === null){
    content = <NewProject onAdd = {handleAddProject} onCancel = {handleCancelProject}/>
  }else if (addProject.SelectedProjectId === undefined){
    content = <NoProject handleAddProject = {handleStartAddProject} />
  }


  return (
    <main className = "flex w-full h-full mt-7">
      <SideBar handleAddProject = {handleStartAddProject} projects = {addProject.projects} onSelectProject = {handleSelectProject} selectedProjectId={addProject.SelectedProjectId}/>
      {content}
    </main>
  );
}

export default App;
