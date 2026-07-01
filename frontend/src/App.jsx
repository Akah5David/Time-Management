import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Import Pages
import RootLayout from "./layout/RootLayout.jsx";
import CreateProjectPage from "./pages/Projects/CreateProject.jsx";
import ProjectsPage from "./pages/Projects/Projects.jsx";
import ProjectPage from "./pages/Projects/Project.jsx";

//Router Actions function
import createProject from "./api/actions/project.js";

//Router Loaders function
import { projectLoaders } from "./api/loaders/project.js";

function App() {
  const { viewProjects, viewProject} = projectLoaders;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/create-project",
          element: <CreateProjectPage />,
          action: createProject,
        },
        {
          path: "/projects",
          element: <ProjectsPage />,
          loader: viewProjects,
          children: [
            { path: ":id", element: <ProjectPage />, loader: viewProject, HydrateFallback: '<h1 className>Hi wellcome to my project</h1>' },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
