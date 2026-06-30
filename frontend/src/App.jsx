import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Components
import RootLayout from "./layout/RootLayout.jsx";
import CreateProjectPage from "./pages/CreateProject.jsx"

//Router Actions
import createProject from "./api/actions/createProject.js";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <RootLayout />, children:[
    {path: "/create-project", element: <CreateProjectPage/>, action: createProject}
    ]},
  ]);

  return <RouterProvider router={router} />;
}

export default App;
