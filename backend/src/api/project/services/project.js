"use strict";

/**
 * project service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::project.project", ({ strapi }) => ({
  async createNewProject(formBody) {
    console.log("formBody:", formBody);

    try {
      const project = await strapi.documents("api::project.project").create({
        data: formBody,
      });

      return project;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  async fetchProjects() {
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

      if (!fetchedProjects) {
        throw new Error("Failed to fetch project");
      }
      return fetchedProjects;
    } catch (err) {
      console.error(err);
      throw err;
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
          local: "en",
          status: "draft",
          fields: ["name", "description", "color", "projectStatus"],
          populate: ["tasks", "users_permissions_user"],
        });

      if (!fetchedProject) {
        throw new Error("Failed to fetch project");
      }
      return fetchedProject;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  async updateProject(documentId, data) {
    console.log(
      "===============Started running service updateProject==============",
    );

    console.log("updateProject projectId: ", documentId);

    try {
      const updatedProject = await strapi
        .documents("api::project.project")
        .update({
          documentId: documentId,
          data: data,
          fields: ["name", "color"],
          status: "published",
          populate: ["tasks", "users_permission_user"],
        });

      if (!updatedProject) {
        throw new Error("Failed to update project");
      }

      return updatedProject;
    } catch (err) {
      console.error("updateProject Service error message: ", err);

      throw err;
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
        throw new Error("Failed to update project");
      }

      return deletedProject;
    } catch (err) {
      console.error("deleteProject Service error message: ", err);

      throw err;
    }
  },
  async deleteAllProjects() {
    console.log(
      "===============Started running service deleteProjects==============",
    );

    try {
      const deletedProjects = await strapi
        .documents("api::project.project")
        .deleteMany();

      if (!deletedProjects) {
        throw new Error("Failed to delete project");
      }

      return deletedProjects;
    } catch (err) {
      console.error("deleteAllProjects Service error message: ", err);

      throw err;
    }
  },
}));
