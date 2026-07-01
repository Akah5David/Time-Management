import {
  useLoaderData,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useRef, useState } from "react";

//Import Components
import Task from "../../components/Task";
import Modal from "../../reusable-components/Modal.jsx";

export default function ProjectPage() {
  const loaderData = useLoaderData();
  const navigateTo = useNavigate();
  const dialog = useRef();

  console.log("loaderData: ", loaderData);

  const projectId = loaderData[0].documentId;

  const titleRef = useRef();
  const DescriptionRef = useRef();
  const dateRef = useRef();

  function handleSave() {
    const enteredTitle = titleRef.current.value;
    const enteredDescription = DescriptionRef.current.value;
    const enteredDate = dateRef.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDate.trim() === ""
    ) {
      dialog.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      date: enteredDate,
    });
  }

  //Navigate to a specific project
  function projectNavigation() {
    navigateTo(`/projects/${projectId}`);
    rend
  }

  return (
    <div className="bg-yellow-400 flex justify-center items-center w-full min-h-screen">
      <Modal>
        <Task />
      </Modal>
      <div>
        <button onClick={projectNavigation} className="bg-blue-300">
          Create New Task
        </button>
      </div>
      <Outlet />
    </div>
  );
}
