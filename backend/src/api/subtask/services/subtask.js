"use strict";

/**
 * subtask service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::subtask.subtask", ({ strapi }) => ({
  async createSubtask(formBody) {
    console.log("createTask Service is running");

    const createdSubtask = await strapi
      .documents("api::subtask.subtask")
      .create({
        data: formBody,
        locale: "en",
        fields: ["title", "completed"],
        status: "draft",
        populate: ["task"],
      });

    return createdSubtask;
  },
  async fetchSubTasks() {
    console.log("createTask Service is running");

    const subtasks = await strapi.documents("api::subtask.subtask").findMany({
      locale: "en",
      fields: ["title", "completed"],
      status: "draft",
      populate: ["task"],
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

    return subtasks;
  },
  async fetchSubTask(taskId) {
    console.log("createTask Service is running");

    const subtasks = await strapi.documents("api::subtask.subtask").findOne({
      documentId: taskId,
      locale: "en",
      fields: ["title", "completed"],
      status: "published",
      populate: ["task"],
    });

    return subtasks;
  },
}));
