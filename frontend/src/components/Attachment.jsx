import { Form } from "react-router-dom";

export default function AttachmentForm({
  tasks = [],
  defaultValues = {},
}) {
  return (
    <Form
      method="post"
      encType="multipart/form-data"
      className="space-y-8 max-w-4xl mx-auto"
    >
      {/* ========================= */}
      {/* Attachment Information */}
      {/* ========================= */}

      <section className="rounded-lg border p-6 space-y-6">

        <h2 className="text-2xl font-semibold">
          Attachment Information
        </h2>

        {/* Name */}

        <div>
          <label
            htmlFor="name"
            className="block mb-2 font-medium"
          >
            Name <span className="text-red-500">*</span>
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={defaultValues.name}
            className="w-full rounded-md border px-4 py-2"
          />
        </div>

      </section>

      {/* ========================= */}
      {/* Related Task */}
      {/* ========================= */}

      <section className="rounded-lg border p-6 space-y-6">

        <h2 className="text-2xl font-semibold">
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
      {/* Media Upload */}
      {/* ========================= */}

      <section className="rounded-lg border p-6 space-y-6">

        <h2 className="text-2xl font-semibold">
          Files
        </h2>

        <div>

          <label
            htmlFor="file"
            className="block mb-2 font-medium"
          >
            Upload File(s)
          </label>

          <input
            id="file"
            name="file"
            type="file"
            multiple
            className="block w-full rounded-md border p-3"
          />

          <p className="mt-2 text-sm text-gray-500">
            You can upload one or more files.
          </p>

        </div>

      </section>

      {/* ========================= */}
      {/* Submit */}
      {/* ========================= */}

      <div className="flex justify-end gap-4">

        <button
          type="reset"
          className="rounded-md border px-6 py-2"
        >
          Reset
        </button>

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition"
        >
          Save Attachment
        </button>

      </div>

    </Form>
  );
}