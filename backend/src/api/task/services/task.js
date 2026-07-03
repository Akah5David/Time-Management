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
  async fetchTask(documentId) {
    console.log("fetchTask Service is running");

    try {
      const task = await strapi.documents("api::task.task").findOne({
        documentId: documentId,
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
  async updateTask(documentId, data) {
    console.log(
      "===============Started running service updateTask==============",
    );

    console.log("updateTask taskId: ", documentId);

    try {
      const updatedTask = await strapi.documents("api::task.task").update({
        documentId: documentId,
        data: data,
        fields: ["title", "description", "dueDate", "priority"],
        status: "published",
        populate: ["labels", "project", "subtasks", "reminders", "lists"],
      });

      if (!updatedTask) {
        throw new Error("Failed to update task");
      }

      return updatedTask;
    } catch (err) {
      console.error("updateTask Service error message: ", err);

      throw err;
    }
  },
  async deleteTask(documentId) {
    console.log(
      "===============Started running service deleteTask==============",
    );

    console.log("deleteTask taskId: ", documentId);

    try {
      const deletedTask = await strapi.documents("api::task.task").delete({
        documentId: documentId,
      });

      if (!deletedTask) {
        throw new Error("Failed to delete task");
      }

      return deletedTask;
    } catch (err) {
      console.error("deleteTask Service error message: ", err);

      throw err;
    }
  },
  async deleteAllTasks() {
    console.log(
      "===============Started running service deleteAllTasks==============",
    );

    try {
      const deletedTasks = await strapi
        .documents("api::task.task")
        .deleteMany();

      if (!deletedTasks) {
        throw new Error("Failed to delete all tasks");
      }

      return deletedTasks;
    } catch (err) {
      console.error("deleteAllTasks Service error message: ", err);

      throw err;
    }
  },
}));
