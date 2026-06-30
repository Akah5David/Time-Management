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
}));
