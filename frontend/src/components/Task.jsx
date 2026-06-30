// import { Form } from "react-router-dom";
// export default function () {
 
//   return (
//     <Form method = "post" action = "/tasks">
//       <input type = "text" name="title" placeholder="Enter your Name"></input>
//       <textarea name="description" rows="10" placeholder="Enter Task Description"></textarea>
//       <input type = "datetime-local"></input>
//       <select>
//         <option value = ""></option>
//         <option value = "others"></option>
//       </select>
//       <input type = ""></input>
//     </Form>
//   );
// }


import { Form } from "react-router-dom";

export default function TaskForm({
  projects = [],
  labels = [],
}) {
  return (
    <Form method="post" className="space-y-6">

      {/* ================= BASIC INFORMATION ================= */}

      <section className="space-y-4 border rounded-lg p-5">

        <h2 className="text-xl font-semibold">
          Basic Information
        </h2>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium">
            Title *
          </label>

          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block font-medium"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={5}
            className="w-full border rounded-md p-2"
          />
        </div>

      </section>

      {/* ================= DATES ================= */}

      <section className="space-y-4 border rounded-lg p-5">

        <h2 className="text-xl font-semibold">
          Dates
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label htmlFor="dueDate">
              Due Date
            </label>

            <input
              id="dueDate"
              name="dueDate"
              type="datetime-local"
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label htmlFor="completedAt">
              Completed At
            </label>

            <input
              id="completedAt"
              name="completedAt"
              type="datetime-local"
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label htmlFor="reminderDate">
              Reminder Date
            </label>

            <input
              id="reminderDate"
              name="reminderDate"
              type="datetime-local"
              className="w-full border rounded-md p-2"
            />
          </div>

        </div>

      </section>

      {/* ================= STATUS ================= */}

      <section className="space-y-4 border rounded-lg p-5">

        <h2 className="text-xl font-semibold">
          Status
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <div>

            <label htmlFor="priority">
              Priority *
            </label>

            <select
              id="priority"
              name="priority"
              required
              className="w-full border rounded-md p-2"
            >
              <option value="">
                Select Priority
              </option>

              <option value="LOW">
                Low
              </option>

              <option value="MEDIUM">
                Medium
              </option>

              <option value="HIGH">
                High
              </option>

              <option value="URGENT">
                Urgent
              </option>

            </select>

          </div>

          <div>

            <label htmlFor="taskStatus">
              Task Status *
            </label>

            <select
              id="taskStatus"
              name="taskStatus"
              required
              className="w-full border rounded-md p-2"
            >
              <option value="">
                Select Status
              </option>

              <option value="TODO">
                Todo
              </option>

              <option value="IN_PROGRESS">
                In Progress
              </option>

              <option value="REVIEW">
                Review
              </option>

              <option value="COMPLETED">
                Completed
              </option>

            </select>

          </div>

        </div>

      </section>

      {/* ================= TIME ================= */}

      <section className="space-y-4 border rounded-lg p-5">

        <h2 className="text-xl font-semibold">
          Time
        </h2>

        <div>

          <label htmlFor="estimatedTime">
            Estimated Time (hours)
          </label>

          <input
            id="estimatedTime"
            name="estimatedTime"
            type="number"
            min="0"
            className="w-full border rounded-md p-2"
          />

        </div>

      </section>

      {/* ================= PROJECT ================= */}

      <section className="space-y-4 border rounded-lg p-5">

        <h2 className="text-xl font-semibold">
          Project
        </h2>

        <select
          name="project"
          className="w-full border rounded-md p-2"
        >

          <option value="">
            Select Project
          </option>

          {projects.map(project => (
            <option
              key={project.documentId}
              value={project.documentId}
            >
              {project.title}
            </option>
          ))}

        </select>

      </section>

      {/* ================= LABELS ================= */}

      <section className="space-y-4 border rounded-lg p-5">

        <h2 className="text-xl font-semibold">
          Labels
        </h2>

        <select
          multiple
          name="labels"
          className="w-full border rounded-md p-2 h-40"
        >

          {labels.map(label => (
            <option
              key={label.documentId}
              value={label.documentId}
            >
              {label.name}
            </option>
          ))}

        </select>

      </section>

      {/* ================= ATTACHMENTS ================= */}

      <section className="space-y-4 border rounded-lg p-5">

        <h2 className="text-xl font-semibold">
          Attachments
        </h2>

        <input
          type="file"
          multiple
          name="attachments"
          className="block"
        />

      </section>

      {/* ================= DETAILS COMPONENT ================= */}

      <section className="space-y-4 border rounded-lg p-5">

        <h2 className="text-xl font-semibold">
          Details
        </h2>

        <div>

          <label>
            Description
          </label>

          <textarea
            name="details.description"
            rows={4}
            className="w-full border rounded-md p-2"
          />

        </div>

        <div>

          <label>
            Age
          </label>

          <input
            type="text"
            name="details.age"
            className="w-full border rounded-md p-2"
          />

        </div>

      </section>

      {/* ================= SUBTASKS ================= */}

      <section className="space-y-4 border rounded-lg p-5">

        <h2 className="text-xl font-semibold">
          Subtasks
        </h2>

        <textarea
          name="subtasks"
          rows={5}
          placeholder="One subtask per line"
          className="w-full border rounded-md p-2"
        />

      </section>

      {/* ================= REMINDERS ================= */}

      <section className="space-y-4 border rounded-lg p-5">

        <h2 className="text-xl font-semibold">
          Reminders
        </h2>

        <textarea
          name="reminders"
          rows={4}
          placeholder="Reminder notes..."
          className="w-full border rounded-md p-2"
        />

      </section>

      {/* ================= SUBMIT ================= */}

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-md"
      >
        Save Task
      </button>

    </Form>
  );
}
