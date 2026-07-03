"use strict";

/**
 * subtask controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::subtask.subtask", ({ strapi }) => ({
  async createSubtask(ctx) {
    console.log("CreatTask Running");

    console.log(ctx);

    const { body: taskBody } = ctx.request;

    const result = await strapi
      .service("api::subtask.subtask")
      .createSubtask(taskBody);

    ctx.body = result;
  },

  async fetchSubTasks(ctx) {
    console.log("CreatTask Running");

    console.log(ctx);

    const result = await strapi.service("api::subtask.subtask").fetchSubTasks();

    ctx.body = result;
  },
  async fetchSubTask(ctx) {
    console.log("fetchSubTask Running");

    console.log(ctx);

    const { documentId } = ctx.params;

    const result = await strapi
      .service("api::subtask.subtask")
      .fetchSubTask(documentId);

    ctx.body = result;
  },
  async updateSubtask(ctx) {
    console.log("===============Started running updateSubtask==============");

    try {
      const { documentId } = ctx.params;
      const { body } = ctx.request;

      const result = await strapi
        .service("api::subtask.subtask")
        .updateSubtask(documentId, body);

      if (!result) {
        throw new Error("Failed to update subtask");
      }

      ctx.body = result;
    } catch (err) {
      console.error("updateSubtask Error Message: ", err);

      throw err;
    }
  },
  async deleteSubtask(ctx) {
    console.log("===============Started running deleteSubtask==============");

    try {
      const { documentId } = ctx.params;

      const result = await strapi
        .service("api::subtask.subtask")
        .deleteSubtask(documentId);

      if (!result) {
        throw new Error("Failed to delete subtask");
      }

      ctx.body = result;
    } catch (err) {
      console.error("deleteSubtask Error Message: ", err);

      throw err;
    }
  },
  async deleteAllSubtasks(ctx) {
    console.log(
      "===============Started running deleteAllSubtasks==============",
    );

    try {
      let deletedAllSubtasks = await strapi
        .service("api::subtask.subtask")
        .deleteAllSubtasks();

      if (!deletedAllSubtasks) {
        throw new Error("Failed to delete all subtasks");
      }

      ctx.body = deletedAllSubtasks;
    } catch (err) {
      console.error("deleteAllSubtasks Error Message: ", err);

      throw err;
    }
  },
}));
