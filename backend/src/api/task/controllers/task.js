"use strict";

/**
 * task controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::task.task", ({ strapi }) => ({
  async createTask(ctx) {
    console.log("CreatTask Running");

    console.log(ctx);

    const taskBody = ctx.request.body;

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

    let taskId = ctx.params.id;
    try {
      const task = await strapi.service("api::task.task").fetchTask(taskId);

      if (!task) {
        throw new Error("No Task exist");
      }

      ctx.body = task;
    } catch (err) {
      console.error("fetchTask Controller Error Message: ", err);

      throw err;
    }
  },
}));
