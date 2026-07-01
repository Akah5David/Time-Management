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

    let projectBody = ctx.request.body;

    console.log("projectBody: ", projectBody);

    const newProject = await strapi
      .service("api::project.project")
      .createNewProject(projectBody);

    ctx.body = newProject;
  },
  async fetchProjects(ctx) {
    console.log("====== CONTROLLER HIT ======");
    console.log(ctx);

    const projects = await strapi
      .service("api::project.project")
      .fetchProjects();

    ctx.body = projects;
  },
  async fetchProject(ctx) {
    console.log("====== CONTROLLER HIT ======");
    console.log(ctx);

    let { id } = ctx.request.params;

    console.log("project ID: ", id);

    const project = await strapi
      .service("api::project.project")
      .fetchProject(id);

    ctx.body = project;
  },
}));
