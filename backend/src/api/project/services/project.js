"use strict";

/**
 * project service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::project.project", ({ strapi }) => ({
  async createNewProject(formBody) {
    console.log("createNewProject Service is running");
    console.log("createNewProject formBody:", formBody);

    try {
      const project = await strapi.documents("api::project.project").create({
        data: formBody,
      });

      return project;
    } catch (err) {
      console.error("Original Error:", err);
      throw new Error("Failed to create project");
    }
  },
  async fetchProjects() {
    console.log("fetchProjects Service is running");

    try {
      const fetchedProjects = await strapi
        .documents("api::project.project")
        .findMany({
          local: "en",
          status: "draft",
          fields: ["name", "description", "color", "projectStatus"],
          populate: ["tasks", "users_permissions_user"],
          pagination: {
            limit: 10,
            start: 0,
          },
          sort: "name:asc",
        });

      if (fetchedProjects.length === 0) {
        return [];
      }
      return fetchedProjects;
    } catch (err) {
      console.error("Original Error:", err);
      throw new Error("Failed to fetch projects");
    }
  },
  async fetchProject(documentId) {
    console.log("fetchProject Service is running");

    console.log("projectId:", documentId);

    try {
      const fetchedProject = await strapi
        .documents("api::project.project")
        .findOne({
          documentId: documentId,
          fields: ["name", "description", "color", "projectStatus"],
          populate: ["tasks", "users_permissions_user"],
        });

      console.log("Fetched Project:", fetchedProject);

      return fetchedProject;
    } catch (err) {
      console.error("Original Error:", err);

      throw new Error("Failed to fetch project");
    }
  },
  async updateProject(documentId, body) {
    console.log(
      "===============Started running service updateProject==============",
    );

    console.log("updateProject projectId: ", documentId);
    console.log("updateProject body: ", body);

    try {
      const updatedProject = await strapi
        .documents("api::project.project")
        .update({
          documentId: documentId,
          data: body,
          fields: ["name", "color"],
          status: "published",
          populate: ["tasks", "users_permissions_user"],
        });

      if (!updatedProject) {
        throw new Error("Failed to update project");
      }

      return updatedProject;
    } catch (err) {
      console.error("Original Error:", err);
      throw new Error("Failed to update project");
    }
  },
  async deleteProject(documentId) {
    console.log(
      "===============Started running service deleteProject==============",
    );

    console.log("deleteProject projectId: ", documentId);

    try {
      const deletedProject = await strapi
        .documents("api::project.project")
        .delete({
          documentId: documentId,
        });

      if (!deletedProject) {
        throw new Error("Failed to delete project");
      }

      return deletedProject;
    } catch (err) {
      console.error("Original Error:", err);
      throw new Error("Failed to delete project");
    }
  },
  async deleteAllProjects() {
    console.log(
      "===============Started running service deleteAllProjects==============",
    );

    const documentService = strapi.documents("api::project.project");

    console.log("current documents()", Object.keys(documentService));

    try {
      const documents = await strapi
        .documents("api::project.project")
        .findMany({
          fields: ["documentId"],
        });

      if (documents.length === 0) {
        return [];
      }

      const deletedProjects = [];

      for (const document of documents) {
        const deletedProject = await strapi
          .documents("api::project.project")
          .delete({ documentId: document.documentId });

        deletedProjects.push(deletedProject);
      }

      return deletedProjects;
    } catch (err) {
      console.error("Original Error:", err);
      throw new Error("Failed to delete all projects");
    }
  },
}));
