"use strict";

/**
 * task service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::task.task", ({ strapi }) => ({
  async createTask(formBody) {
    console.log("createTask Service is running");
    console.log("createTask formBody:", formBody);

    try {
      const createdTask = await strapi.documents("api::task.task").create({
        data: formBody,
        locale: "en",
        fields: ["title", "description", "dueDate", "priority"],
        status: "published",
        populate: ["labels", "project", "subtasks", "reminders", "lists"],
      });

      if (!createdTask) {
        return {};
      }

      return createdTask;
    } catch (err) {
      console.error("Original Error:", err);
      throw err;
    }
  },
  async fetchTasks() {
    console.log("fetchTasks Service is running");

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
        // filters: {
        //   title: {
        //     $startsWith: "b",
        //   },
        // },
      });

      if (tasks.length === 0) {
        return [];
      }
      return tasks;
    } catch (err) {
      console.error("Original Error:", err);
      throw new Error("Failed to fetch tasks");
    }
  },
  async fetchTask(documentId) {
    console.log("fetchTask Service is running");
    console.log("fetchTask documentId:", documentId);

    try {
      const task = await strapi.documents("api::task.task").findOne({
        documentId: documentId,
        locale: "en",
        fields: ["documentId", "title", "description", "dueDate", "priority"],
        status: "published",
        populate: ["labels", "project", "subtasks", "reminders"],
      });

      if (!task) {
        return {};
      }

      return task;
    } catch (err) {
      console.error("Original Error:", err);
      throw new Error("Failed to fetch task");
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
        return {};
      }

      return updatedTask;
    } catch (err) {
      console.error("Original Error:", err);
      throw new Error("Failed to update task");
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
        return {};
      }

      return deletedTask;
    } catch (err) {
      console.error("Original Error:", err);
      throw new Error("Failed to delete task");
    }
  },
  async deleteAllTasks() {
    console.log(
      "===============Started running service deleteAllTasks==============",
    );

    try {
      const documents = await strapi.documents("api::task.task").findMany({
        fields: ["documentId"],
      });

      if (documents.length === 0) {
        return [];
      }

      const deletedTasks = [];

      for (const document of documents) {
        const deletedTask = await strapi.documents("api::task.task").delete({
          documentId: document.documentId,
        });

        deletedTasks.push(deletedTask);
      }

      if (deletedTasks.length === 0) {
        return [];
      }

      return deletedTasks;
    } catch (err) {
      console.error("Original Error:", err);
      throw new Error("Failed to delete all tasks");
    }
  },
}));
