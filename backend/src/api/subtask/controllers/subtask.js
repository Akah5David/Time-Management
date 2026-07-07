"use strict";

/**
 * subtask controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::subtask.subtask", ({ strapi }) => ({
  async createSubtask(ctx) {
    console.log("====== CONTROLLER HIT createSubtask ======");
    console.log(ctx.request.body);

    console.log(ctx.request.body);
    console.log(typeof ctx.request.body);

    try {
      const { body: taskBody } = ctx.request;

      const result = await strapi
        .service("api::subtask.subtask")
        .createSubtask(taskBody);

      ctx.body = result;
    } catch (err) {
      console.log("createSubtask Error Message", err);
      throw err;
    }
  },

  async fetchSubTasks(ctx) {
    console.log("====== CONTROLLER HIT fetchSubTasks ======");

    try {
      const result = await strapi
        .service("api::subtask.subtask")
        .fetchSubTasks();

      ctx.body = result;
    } catch (err) {
      console.log("fetchSubTasks Error Message", err);
      throw err;
    }
  },
  async fetchSubTask(ctx) {
    console.log("====== CONTROLLER HIT fetchSubTask ======");
    console.log(ctx.params);

    try {
      const { documentId } = ctx.params;

      const result = await strapi
        .service("api::subtask.subtask")
        .fetchSubTask(documentId);

      if (!result) {
        return ctx.notFound("Subtask not found");
      }

      ctx.body = result;
    } catch (err) {
      console.log("fetchSubTask Error Message", err);
      throw err;
    }
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
      console.log("updateSubtask Error Message", err);

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
      console.log("deleteSubtask Error Message", err);

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
      console.log("deleteAllSubtasks Error Message", err);

      throw err;
    }
  },
}));
