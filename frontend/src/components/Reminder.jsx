import { Form } from "react-router-dom";

export default function ReminderForm({
  tasks = [],
  defaultValues = {},
}) {
  return (
    <Form
      method="post"
      className="space-y-6 max-w-4xl mx-auto"
    >
      {/* ========================= */}
      {/* Reminder Information */}
      {/* ========================= */}

      <section className="rounded-lg border p-6 space-y-5">

        <h2 className="text-xl font-semibold">
          Reminder Information
        </h2>

        {/* Reminder Date */}

        <div>
          <label
            htmlFor="remindAt"
            className="block mb-2 font-medium"
          >
            Reminder Date
          </label>

          <input
            id="remindAt"
            name="remindAt"
            type="datetime-local"
            defaultValue={defaultValues.remindAt}
            className="w-full rounded-md border px-4 py-2"
          />
        </div>

        {/* Message */}

        <div>
          <label
            htmlFor="message"
            className="block mb-2 font-medium"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            rows={4}
            defaultValue={defaultValues.message}
            className="w-full rounded-md border px-4 py-2 resize-none"
          />
        </div>

        {/* Sent */}

        <div className="flex items-center gap-3">

          <input
            id="sent"
            name="sent"
            type="checkbox"
            defaultChecked={defaultValues.sent}
            className="h-5 w-5"
          />

          <label htmlFor="sent">
            Sent
          </label>

        </div>

      </section>

      {/* ========================= */}
      {/* Task Relationship */}
      {/* ========================= */}

      <section className="rounded-lg border p-6 space-y-5">

        <h2 className="text-xl font-semibold">
          Related Task
        </h2>

        <div>

          <label
            htmlFor="task"
            className="block mb-2 font-medium"
          >
            Task
          </label>

          <select
            id="task"
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

        </div>

      </section>

      {/* ========================= */}
      {/* Submit */}
      {/* ========================= */}

      <div className="flex justify-end">

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition"
        >
          Save Reminder
        </button>

      </div>

    </Form>
  );
}