"use strict";

/**
 * project controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::project.project", ({ strapi }) => ({
  //Creatin a new Project
  async createNewProject(ctx) {
    console.log("====== CONTROLLER HIT ======");
    console.log(ctx);

    const { body: projectBody } = ctx.request;

    console.log("projectBody: ", projectBody);
    try {
      const newProject = await strapi
        .service("api::project.project")
        .createNewProject(projectBody);

      if (!newProject) {
        throw new Error("Failed to create new project");
      }

      ctx.body = newProject;
    } catch (err) {
      console.log("createNewProject Error Message", err);
      throw err;
    }
  },
  async fetchProjects(ctx) {
    console.log("====== CONTROLLER HIT fetchProjects ======");

    try {
      const fetchedProjects = await strapi
        .service("api::project.project")
        .fetchProjects();

      if (!fetchedProjects) {
        throw new Error("Failed to fetch all projects");
      }

      ctx.body = fetchedProjects;
    } catch (err) {
      console.log("fetchProjects Error Message", err);
      throw err;
    }
  },
  async fetchProject(ctx) {
    console.log("====== CONTROLLER HIT ======");
    console.log(ctx);

    try {
      const { documentId } = ctx.params;

      const result = await strapi
        .service("api::project.project")
        .fetchProject(documentId);

      if (!result) {
        throw new Error("Failed to fetch project");
      }

      ctx.body = result;
    } catch (err) {
      console.log("fetchProject Error Message", err);
      throw err;
    }
  },
  async updateProject(ctx) {
    console.log("===============Started running updateProject==============");

    try {
      const { documentId } = ctx.params;
      const { body } = ctx.request;

      const result = await strapi
        .service("api::project.project")
        .updateProject(documentId, body);

      if (!result) {
        throw new Error("Failed to update project");
      }

      //returns createdLabel to the front end
      ctx.body = result;
    } catch (err) {
      console.error("updateProject Error Message: ", err);

      throw err;
    }
  },
  async deleteProject(ctx) {
    console.log("===============Started running deleteProject==============");

    try {
      const { documentId } = ctx.params;

      const result = await strapi
        .service("api::project.project")
        .deleteProject(documentId);

      if (!result) {
        throw new Error("Failed to delete project");
      }

      //returns createdLabel to the front end
      ctx.body = result;
    } catch (err) {
      console.error("deleteProject Error Message: ", err);

      throw err;
    }
  },
  async deleteAllProjects(ctx) {
    console.log(
      "===============Started running deleteAllProjects==============",
    );

    try {
      let deletedAllProjects = await strapi
        .service("api::project.project")
        .deleteAllProjects();

      if (!deletedAllProjects) {
        throw new Error("Failed to delete all projects");
      }

      //returns createdLabel to the front end
      ctx.body = deletedAllProjects;
    } catch (err) {
      console.error("deleteAllProjects Error Message: ", err);

      throw err;
    }
  },
}));
