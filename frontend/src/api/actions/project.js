import { redirect } from "react-router-dom";

let createProject = async ({ request }) => {
  let formData = await request.formData();

  const data = Object.fromEntries(formData);

  console.log(import.meta.env.VITE_STRAPI_BASE_URL);

  try {
    let response = await fetch(
      `${import.meta.env.VITE_STRAPI_BASE_URL}/projects/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        body: JSON.stringify({
          data,
        }),
      },
    );

    console.log(response.status);

    if (!response.ok) {
      throw new Error("Project creation failed");
    }

    const result = await response.json();

    console.log("Action Result: ", result);

    return redirect("/projects");
  } catch (error) {
    throw error;
  }
};

export default createProject;
