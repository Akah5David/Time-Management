import { Form } from "react-router-dom";

export default function UserForm({
  roles = [],
  tasks = [],
  projects = [],
  labels = [],
}) {
  return (
    <Form
      method="post"
      className="space-y-8 max-w-5xl mx-auto"
    >
      {/* ===================== */}
      {/* Account Information */}
      {/* ===================== */}

      <section className="border rounded-lg p-6 space-y-4">

        <h2 className="text-xl font-semibold">
          Account Information
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          {/* Username */}

          <div>
            <label className="block mb-2 font-medium">
              Username *
            </label>

            <input
              type="text"
              name="username"
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Email */}

          <div>
            <label className="block mb-2 font-medium">
              Email *
            </label>

            <input
              type="email"
              name="email"
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Provider */}

          <div>
            <label className="block mb-2 font-medium">
              Provider
            </label>

            <input
              type="text"
              name="provider"
              placeholder="local"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Password */}

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              className="w-full border rounded-lg p-2"
            />
          </div>

        </div>

      </section>

      {/* ===================== */}
      {/* Tokens */}
      {/* ===================== */}

      <section className="border rounded-lg p-6 space-y-4">

        <h2 className="text-xl font-semibold">
          Authentication Tokens
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          {/* Reset Token */}

          <div>
            <label className="block mb-2 font-medium">
              Reset Password Token
            </label>

            <input
              type="text"
              name="resetPasswordToken"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Confirmation Token */}

          <div>
            <label className="block mb-2 font-medium">
              Confirmation Token
            </label>

            <input
              type="text"
              name="confirmationToken"
              className="w-full border rounded-lg p-2"
            />
          </div>

        </div>

      </section>

      {/* ===================== */}
      {/* Status */}
      {/* ===================== */}

      <section className="border rounded-lg p-6 space-y-4">

        <h2 className="text-xl font-semibold">
          Status
        </h2>

        <div className="space-y-4">

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              name="confirmed"
            />

            Confirmed

          </label>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              name="blocked"
            />

            Blocked

          </label>

        </div>

      </section>

      {/* ===================== */}
      {/* Role */}
      {/* ===================== */}

      <section className="border rounded-lg p-6 space-y-4">

        <h2 className="text-xl font-semibold">
          Role
        </h2>

        <select
          name="role"
          className="w-full border rounded-lg p-2"
        >
          <option value="">
            Select Role
          </option>

          {roles.map(role => (
            <option
              key={role.documentId}
              value={role.documentId}
            >
              {role.name}
            </option>
          ))}
        </select>

      </section>

      {/* ===================== */}
      {/* Tasks */}
      {/* ===================== */}

      <section className="border rounded-lg p-6 space-y-4">

        <h2 className="text-xl font-semibold">
          Tasks
        </h2>

        <select
          multiple
          name="tasks"
          className="w-full border rounded-lg p-2 h-48"
        >
          {tasks.map(task => (
            <option
              key={task.documentId}
              value={task.documentId}
            >
              {task.title}
            </option>
          ))}
        </select>

      </section>

      {/* ===================== */}
      {/* Projects */}
      {/* ===================== */}

      <section className="border rounded-lg p-6 space-y-4">

        <h2 className="text-xl font-semibold">
          Projects
        </h2>

        <select
          multiple
          name="projects"
          className="w-full border rounded-lg p-2 h-48"
        >
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

      {/* ===================== */}
      {/* Labels */}
      {/* ===================== */}

      <section className="border rounded-lg p-6 space-y-4">

        <h2 className="text-xl font-semibold">
          Labels
        </h2>

        <select
          multiple
          name="labels"
          className="w-full border rounded-lg p-2 h-48"
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

      {/* ===================== */}
      {/* Submit */}
      {/* ===================== */}

      <div className="flex justify-end">

        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-blue-600 text-white"
        >
          Save User
        </button>

      </div>

    </Form>
  );
}