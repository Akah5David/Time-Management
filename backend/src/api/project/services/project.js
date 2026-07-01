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
        data: formBody.data,
      });

      return project;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  async fetchProjects() {
    try {
      const projects = await strapi.documents("api::project.project").findMany({
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

      return projects;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  async fetchProject(projectId) {
    console.log("projectId:", projectId);

    try {
      const project = await strapi.documents("api::project.project").findOne({
        documentId: projectId,
        local: "en",
        status: "draft",
        fields: ["name", "description", "color", "projectStatus"],
        populate: ["tasks", "users_permissions_user"],
      });

      return project;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
}));
