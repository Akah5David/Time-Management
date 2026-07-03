"use strict";

/**
 * task controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::task.task", ({ strapi }) => ({
  async createTask(ctx) {
    console.log("CreatTask Running");

    console.log(ctx);

    const { body: taskBody } = ctx.request;

    const result = await strapi.service("api::task.task").createTask(taskBody);

    ctx.body = result;
  },

  async fetchTasks(ctx) {
    console.log("fetchTasks Running");

    console.log(ctx);

    try {
      const tasks = await strapi.service("api::task.task").fetchTasks();

      if (tasks.length === 0) {
        throw new Error("There are no Tasks Existing");
      }
      ctx.body = tasks;
    } catch (err) {
      console.error("fetchTasks Controller Error Message: ", err);

      throw err;
    }
  },
  async fetchTask(ctx) {
    console.log("fetchTask Running");

    console.log(ctx);

    const { documentId } = ctx.params;
    try {
      const result = await strapi
        .service("api::task.task")
        .fetchTask(documentId);

      if (!result) {
        throw new Error("No Task exist");
      }

      ctx.body = result;
    } catch (err) {
      console.error("fetchTask Controller Error Message: ", err);

      throw err;
    }
  },
  async updateTask(ctx) {
    console.log("===============Started running updateTask==============");

    try {
      const { documentId } = ctx.params;
      const { body } = ctx.request;

      const result = await strapi
        .service("api::task.task")
        .updateTask(documentId, body);

      if (!result) {
        throw new Error("Failed to update task");
      }

      ctx.body = result;
    } catch (err) {
      console.error("updateTask Error Message: ", err);

      throw err;
    }
  },
  async deleteTask(ctx) {
    console.log("===============Started running deleteTask==============");

    try {
      const { documentId } = ctx.params;

      const result = await strapi
        .service("api::task.task")
        .deleteTask(documentId);

      if (!result) {
        throw new Error("Failed to delete task");
      }

      ctx.body = result;
    } catch (err) {
      console.error("deleteTask Error Message: ", err);

      throw err;
    }
  },
  async deleteAllTasks(ctx) {
    console.log("===============Started running deleteAllTasks==============");

    try {
      let deletedAllTasks = await strapi
        .service("api::task.task")
        .deleteAllTasks();

      if (!deletedAllTasks) {
        throw new Error("Failed to delete all tasks");
      }

      ctx.body = deletedAllTasks;
    } catch (err) {
      console.error("deleteAllTasks Error Message: ", err);

      throw err;
    }
  },
}));
