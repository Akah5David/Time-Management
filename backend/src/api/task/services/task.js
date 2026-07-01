"use strict";

/**
 * task service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::task.task", ({ strapi }) => ({
  async createTask(formBody) {
    console.log("createTask Service is running");

    try {
      const createdTask = await strapi.documents("api::task.task").create({
        data: formBody,
        locale: "en",
        fields: ["title", "description", "dueDate", "priority"],
        status: "published",
        populate: ["labels", "project", "subtasks", "reminders", "lists"],
      });

      if (createdTask.length === 0) {
        throw new Error("NO Task Was created by the Document service API");
      }

      return createdTask;
    } catch (err) {
      console.error("createTask Service Error Message: ", err);

      throw err;
    }
  },
  async fetchTasks() {
    console.log("createTask Service is running");

    try {
      const tasks = await strapi.documents("api::task.task").findMany({
        locale: "en",
        fields: ["title", "description", "dueDate", "priority"],
        status: "published",
        populate: ["labels", "project", "subtasks", "reminders", "lists"],
        sort: "title:asc",
        pagination: {
          limit: 10,
          start: 0,
        },
        filters: {
          title: {
            $startsWith: "b",
          },
        },
      });

      if (tasks.length === 0) {
        throw new Error("NO Task Was created by the Document service API");
      }
      return tasks;
    } catch (err) {
      console.error("fetchTasks Service Error Message: ", err);

      throw err;
    }
  },
  async fetchTask(taskId) {
    console.log("createTask Service is running");

    try {
      const task = await strapi.documents("api::task.task").findOne({
        documentId: taskId,
        locale: "en",
        fields: ["title", "description", "dueDate", "priority"],
        status: "published",
        populate: ["labels", "project", "subtasks", "reminders"],
      });

      if (!task) {
        throw new Error("NO Task Was created by the Document service API");
      }

      return task;
    } catch (err) {
      console.error("fetchTask Service Error Message: ", err);

      throw err;
    }
  },
}));
