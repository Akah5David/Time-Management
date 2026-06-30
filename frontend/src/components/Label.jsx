import { Form } from "react-router-dom";

export default function LabelForm({
  users = [],
  tasks = [],
  defaultValues = {},
}) {
  return (
    <Form method="post" className="space-y-8 max-w-4xl mx-auto">

      {/* ========================= */}
      {/* Label Information */}
      {/* ========================= */}

      <section className="rounded-lg border p-6 space-y-6">

        <h2 className="text-2xl font-semibold">
          Label Information
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

        {/* Color */}

        <div>
          <label
            htmlFor="color"
            className="block mb-2 font-medium"
          >
            Color <span className="text-red-500">*</span>
          </label>

          <input
            id="color"
            name="color"
            type="text"
            placeholder="#3B82F6"
            required
            defaultValue={defaultValues.color}
            className="w-full rounded-md border px-4 py-2"
          />

          <p className="mt-2 text-sm text-gray-500">
            Enter a valid hex color (e.g. #3B82F6).
          </p>
        </div>

      </section>

      {/* ========================= */}
      {/* Owner */}
      {/* ========================= */}

      <section className="rounded-lg border p-6 space-y-6">

        <h2 className="text-2xl font-semibold">
          Owner
        </h2>

        <div>

          <label
            htmlFor="users_permissions_user"
            className="block mb-2 font-medium"
          >
            User
          </label>

          <select
            id="users_permissions_user"
            name="users_permissions_user"
            defaultValue={defaultValues.user ?? ""}
            className="w-full rounded-md border px-4 py-2"
          >
            <option value="">
              Select User
            </option>

            {users.map((user) => (
              <option
                key={user.documentId}
                value={user.documentId}
              >
                {user.username}
              </option>
            ))}
          </select>

        </div>

      </section>

      {/* ========================= */}
      {/* Tasks */}
      {/* ========================= */}

      <section className="rounded-lg border p-6 space-y-6">

        <h2 className="text-2xl font-semibold">
          Tasks
        </h2>

        <div>

          <label
            htmlFor="tasks"
            className="block mb-2 font-medium"
          >
            Assign Tasks
          </label>

          <select
            id="tasks"
            name="tasks"
            multiple
            className="w-full h-56 rounded-md border px-4 py-2"
          >
            {tasks.map((task) => (
              <option
                key={task.documentId}
                value={task.documentId}
              >
                {task.title}
              </option>
            ))}
          </select>

          <p className="mt-2 text-sm text-gray-500">
            Hold Ctrl (Windows/Linux) or Cmd (Mac) to select multiple tasks.
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
          Save Label
        </button>

      </div>

    </Form>
  );
}