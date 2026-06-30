import { Form } from "react-router-dom";
import { useState, useRef } from "react";

//Inbuilt Components

export default function ProjectForm({
  users = [],
  tasks = [],
  defaultValues = {},
}) {
  const [color, setColor] = useState("#3b82f6");

  function setProjectColor(event) {
    setColor(event.target.value);
  }

  return (
    <Form
      method="post"
      encType="application/x-www-form-urlencoded"
      className="bg-blue-700 flex flex-col gap-5 h-full max-w-5xl mx-auto rounded-lg p-8"
    >
      <section className="rounded-lg border p-6 space-y-6">
        <h2 className="text-2xl font-semibold capitalize">
          fill the form to create a project
        </h2>

        {/* Name */}

        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Name <span className="text-red-500">*</span>
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={defaultValues.name ?? ""}
            className="w-full rounded-md border px-4 py-2"
          />
        </div>

        {/* Description */}

        <div>
          <label htmlFor="description" className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={defaultValues.description}
            className="w-full rounded-md border px-4 py-2"
          />
        </div>
      </section>

      {/* Dates */}

      <section className="rounded-lg border p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Project Dates</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startDate" className="block mb-2 font-medium">
              Start Date
              <span className="text-red-500">*</span>
            </label>

            <input
              id="startDate"
              name="startDate"
              type="date"
              required
              defaultValue={defaultValues.startDate}
              className="w-full rounded-md border px-4 py-2"
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block mb-2 font-medium">
              Due Date
              <span className="text-red-500">*</span>
            </label>

            <input
              id="dueDate"
              name="dueDate"
              type="date"
              required
              defaultValue={defaultValues.dueDate}
              className="w-full rounded-md border px-4 py-2"
            />
          </div>
        </div>
      </section>

      {/* Status and Color*/}
      <section className="rounded-lg border p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Status</h2>

        <div className="flex justify-between">
          {/* Status */}

          <div>
            <label htmlFor="projectStatus" className="block mb-2 font-medium">
              Project Status
              <span className="text-red-500">*</span>
            </label>

            <select
              id="projectStatus"
              name="projectStatus"
              required
              defaultValue={defaultValues.projectStatus ?? ""}
              className="w-full rounded-md border px-4 py-2"
            >
              <option value="">Select Status</option>

              {/* Replace these with your actual enum values */}

              <option value="Not Started">Not Started</option>

              <option value="Active">Active</option>

              <option value="Completed">Completed </option>

              <option value="On Hold">On Hold</option>
            </select>
          </div>

          {/* Color */}

          <div>
            <label htmlFor="color" className="block mb-2 font-medium">
              Color <span className="text-red-500">*</span>
            </label>

            <input
              id="color"
              name="color"
              type="color"
              required
              onChange={setProjectColor}
              value={color}
              className="w-full h-[40px] rounded-md border px-4 py-2"
              style={{
                backgroundColor: color,
              }}
            />
          </div>
        </div>
      </section>

      {/* Submit */}

      <div className="flex justify-end gap-4">
        <button type="reset" className="rounded-md border px-6 py-2">
          Reset
        </button>

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Save Project
        </button>
      </div>
    </Form>
  );
}

// Comback to Consider
//  {/* ========================= */}
//       {/* Owner */}
//       {/* ========================= */}

//       <section className="rounded-lg border p-6 space-y-6">

//         <h2 className="text-2xl font-semibold">
//           Project Owner
//         </h2>

//         <div>

//           <label
//             htmlFor="users_permissions_user"
//             className="block mb-2 font-medium"
//           >
//             User
//           </label>

//           <select
//             id="users_permissions_user"
//             name="users_permissions_user"
//             defaultValue={defaultValues.user ?? ""}
//             className="w-full rounded-md border px-4 py-2"
//           >
//             <option value="">
//               Select User
//             </option>

//             {users.map((user) => (
//               <option
//                 key={user.documentId}
//                 value={user.documentId}
//               >========== */}
//       {/* Submit */}
//                 {user.username}
//               </option>
//             ))}

//           </select>

//         </div>

//       </section>

//       {/* ========================= */}
//       {/* Tasks */}
//       {/* ========================= */}

//       <section className="rounded-lg border p-6 space-y-6">

//         <h2 className="text-2xl font-semibold">
//           Tasks
//         </h2>

//         <div>

//           <label
//             htmlFor="tasks"
//             className="block mb-2 font-medium"
//           >
//             Assign Tasks
//           </label>

//           <select
//             id="tasks"
//             name="tasks"
//             multiple
//             className="w-full h-56 rounded-md border px-4 py-2"
//           >
//             {tasks.map((task) => (
//               <option
//                 key={task.documentId}
//                 value={task.documentId}
//               >
//                 {task.title}
//               </option>
//             ))}
//           </select>

//           <p className="mt-2 text-sm text-gray-500">
//             Hold Ctrl (Windows/Linux) or Cmd (Mac) to select multiple tasks.
//           </p>

//         </div>

//       </section>
