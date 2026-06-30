import { Form } from "react-router-dom";

export default function SubtaskForm({
  tasks = [],
  defaultValues = {},
}) {
  return (
    <Form method="post" className="space-y-6">

      {/* ========================= */}
      {/* Basic Information */}
      {/* ========================= */}

      <section className="rounded-lg border p-6 space-y-4">

        <h2 className="text-xl font-semibold">
          Subtask Information
        </h2>

        {/* Title */}

        <div>
          <label
            htmlFor="title"
            className="block mb-2 font-medium"
          >
            Title <span className="text-red-500">*</span>
          </label>

          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={defaultValues.title}
            className="w-full rounded-md border px-4 py-2"
          />
        </div>

        {/* Completed */}

        <div className="flex items-center gap-3">

          <input
            id="completed"
            name="completed"
            type="checkbox"
            defaultChecked={defaultValues.completed}
            className="h-5 w-5"
          />

          <label htmlFor="completed">
            Completed
          </label>

        </div>

      </section>

      {/* ========================= */}
      {/* Task Relation */}
      {/* ========================= */}

      <section className="rounded-lg border p-6 space-y-4">

        <h2 className="text-xl font-semibold">
          Parent Task
        </h2>

        <select
          name="task"
          defaultValue={defaultValues.task ?? ""}
          className="w-full rounded-md border px-4 py-2"
        >
          <option value="">
            Select a Task
          </option>

          {tasks.map((task) => (
            <option
              key={task.documentId}
              value={task.documentId}
            >
              {task.title}
            </option>
          ))}
        </select>

      </section>

      {/* ========================= */}
      {/* Submit */}
      {/* ========================= */}

      <div className="flex justify-end">

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Save Subtask
        </button>

      </div>

    </Form>
  );
}