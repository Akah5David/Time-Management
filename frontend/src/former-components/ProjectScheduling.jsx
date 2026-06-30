import React from "react";
import Button from "../reusable-components/Button.jsx";

function ProjectScheduling({ handleAddProject }) {
  return (
    <div className="bg-[red] flex flex-col justify-center items-center h-screen w-screen">
      <img src="../../logo.png" alt="note book" className="w-16 h-16" />
      <h1 className="font-bold capitalize mt-4 text-3xl tracking-wide">
        No project selected
      </h1>
      <p className="tracking-wide mt-4 text-xl">
        Select a project or get started with a new one
      </p>
      <p>
        <Button onClick={handleAddProject}>Create new project</Button>
      </p>
    </div>
  );
}

export default ProjectScheduling;
