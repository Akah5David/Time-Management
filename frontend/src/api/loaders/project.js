const viewProjects = async ({ params, request }) => {
  console.log("Loader called");
  console.log(import.meta.env.VITE_STRAPI_BASE_URL);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_STRAPI_BASE_URL}/projects`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          //   Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_Token}`,
        },
      },
    );

    console.log("Response Status: ", response.status);

    if (!response.ok) {
      throw new Error("Projects fetch failed");
    }

    let data = await response.json();

    console.log("Projects data: ", data);
    return { data };
  } catch (err) {
    console.error(err);

    throw err;
  }
};

const viewProject = async ({ params, request }) => {
  console.log("Loader called");
  let projectId = params.id;
  console.log("projectId: ", projectId);

  console.log(import.meta.env.VITE_STRAPI_BASE_URL);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_STRAPI_BASE_URL}/projects/${projectId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          //   Authorization: `${import.meta.env.VITE_STRAPI_API_Token}`,
        },
      },
    );

    console.log("Response Status: ", response.status);

    if (!response.ok) {
      throw new Error(`failed to fetch project with ProjectId: ${projectId}`);
    }

    let data = await response.json();
    console.log("Project data: ", data);

    return { data };
  } catch (err) {
    console.error(err);

    throw err;
  }
};

export const projectLoaders = {
  viewProject,
  viewProjects,
};
