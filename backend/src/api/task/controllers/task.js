"use strict";

/**
 * task controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::task.task", ({ strapi }) => ({
  async createTask(ctx) {
    console.log("====== CONTROLLER HIT createTask ======");
    console.log(ctx.request.body);

    try {
      const { body: taskBody } = ctx.request;

      const result = await strapi
        .service("api::task.task")
        .createTask(taskBody);

      if (!result) {
        return ctx.notFound("Unable to create Task");
      }

      ctx.body = result;
    } catch (err) {
      console.log("createTask Error Message", err);
      throw err;
    }
  },

  async fetchTasks(ctx) {
    console.log("====== CONTROLLER HIT fetchTasks ======");

    try {
      const tasks = await strapi.service("api::task.task").fetchTasks();

      if (tasks.length === 0) {
        return ctx.notFound("No Task found");
      }
      ctx.body = tasks;
    } catch (err) {
      console.log("fetchTasks Error Message", err);

      throw err;
    }
  },
  async fetchTask(ctx) {
    console.log("====== CONTROLLER HIT fetchTask ======");
    const { documentId } = ctx.params;

    console.log("Task Id: ", documentId);

    try {
      const result = await strapi
        .service("api::task.task")
        .fetchTask(documentId);

      if (!result) {
        return ctx.notFound("Task not found");
      }

      ctx.body = result;
    } catch (err) {
      console.log("fetchTask Error Message", err);
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
        return ctx.notFound("Failed to update task");
      }

      ctx.body = result;
    } catch (err) {
      console.log("updateTask Error Message", err);
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
        return ctx.notFound("Failed to delete task");
      }

      ctx.body = result;
    } catch (err) {
      console.log("deleteTask Error Message", err);

      throw err;
    }
  },
  async deleteAllTasks(ctx) {
    console.log("===============Started running deleteAllTasks==============");

    try {
      let deletedAllTasks = await strapi
        .service("api::task.task")
        .deleteAllTasks();

      if (deletedAllTasks.length === 0) {
        return ctx.notFound("Failed to all tasks");
      }

      ctx.body = deletedAllTasks;
    } catch (err) {
      console.log("deleteAllTasks Error Message", err);

      throw err;
    }
  },
}));
