"use strict";

/**
 * subtask service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::subtask.subtask", ({ strapi }) => ({
  async createSubtask(formBody) {
    console.log("createTask Service is running");

    try {
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
    } catch (err) {
      console.error("Original Error:", err);
      throw new Error("Failed to create subtask");
    }
  },
  async fetchSubTasks() {
    console.log("createTask Service is running");

    try {
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
    } catch (err) {
      console.error("Original Error:", err);
      throw new Error("Failed to fetch subtasks");
    }
  },
  async fetchSubTask(documentId) {
    console.log("fetchSubTask Service is running");

    try {
      const subtask = await strapi.documents("api::subtask.subtask").findOne({
        documentId: documentId,
        locale: "en",
        fields: ["title", "completed"],
        status: "published",
        populate: ["task"],
      });

      return subtask;
    } catch (err) {
      console.error("Original Error:", err);
      throw new Error("Failed to fetch subtask");
    }
  },
  async updateSubtask(documentId, data) {
    console.log(
      "===============Started running service updateSubtask==============",
    );

    console.log("updateSubtask subtaskId: ", documentId);

    try {
      const updatedSubtask = await strapi
        .documents("api::subtask.subtask")
        .update({
          documentId: documentId,
          data: data,
          fields: ["title", "completed"],
          status: "draft",
          populate: ["task"],
        });

      if (!updatedSubtask) {
        throw new Error("Failed to update subtask");
      }

      return updatedSubtask;
    } catch (err) {
      console.error("Original Error:", err);

      throw new Error("Failed to update subtask");
    }
  },
  async deleteSubtask(documentId) {
    console.log(
      "===============Started running service deleteSubtask==============",
    );

    console.log("deleteSubtask subtaskId: ", documentId);

    try {
      const deletedSubtask = await strapi
        .documents("api::subtask.subtask")
        .delete({
          documentId: documentId,
        });

      if (!deletedSubtask) {
        throw new Error("Failed to delete subtask");
      }

      return deletedSubtask;
    } catch (err) {
      console.error("Original Error:", err);

      throw new Error("Failed to delete subtask");
    }
  },
  async deleteAllSubtasks() {
    console.log(
      "===============Started running service deleteAllSubtasks==============",
    );

    try {
      const documents = await strapi
        .documents("api::subtask.subtask")
        .findMany({
          fields: ["documentId"],
        });

      if (documents.length === 0) {
        return [];
      }

      const deletedSubtasks = [];

      for (const document of documents) {
        const deletedSubtask = await strapi
          .documents("api::subtask.subtask")
          .delete({
            documentId: document.documentId,
          });

        deletedSubtasks.push(deletedSubtask);
      }

      return deletedSubtasks;
    } catch (err) {
      console.error("Original Error:", err);

      throw new Error("Failed to delete all subtasks");
    }
  },
}));
