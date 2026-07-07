"use strict";

/**
 * reminder service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::reminder.reminder", ({ strapi }) => ({
  async createReminders(formBody) {
    console.log("createReminders Service is running");
    console.log("createReminders formBody:", formBody);

    try {
      const createdReminder = await strapi
        .documents("api::reminder.reminder")
        .create({
          data: formBody,
          locale: "en",
          fields: ["remindAt", "sent", "message"],
          status: "published",
          populate: ["task"],
        });

      if (!createdReminder) {
        return {};
      }

      return createdReminder;
    } catch (err) {
      console.error("Original Error:", err);
      throw new Error("Failed to create reminder");
    }
  },
  async fetchReminders() {
    console.log("fetchReminders Service is running");

    try {
      // expected to return an array of reminder objects
      const reminders = await strapi
        .documents("api::reminder.reminder")
        .findMany({
          locale: "en",
          fields: ["remindAt", "sent", "message"],
          status: "draft",
          populate: ["task"],
          sort: "remindAt:asc",
          pagination: {
            limit: 10,
            start: 0,
          },
          filters: {
            sent: {
              $eq: "True",
            },
          },
        });

      if (reminders.length === 0) {
        return [];
      }

      return reminders;
    } catch (err) {
      console.error("Original Error:", err);
      throw new Error("Failed to fetch reminders");
    }
  },
  async fetchReminder(documentId) {
    console.log("fetchReminder Service is running");
    console.log("Reminder Id: ", documentId);

    try {
      const reminder = await strapi
        .documents("api::reminder.reminder")
        .findOne({
          documentId: documentId,
          locale: "en",
          fields: ["remindAt", "sent", "message"],
          status: "published",
          populate: ["task"],
        });

      if (!reminder) {
        C;
      }

      return reminder;
    } catch (err) {
      console.error("Original Error:", err);
      throw new Error("Failed to fetch reminder");
    }
  },
  async updateReminder(documentId, data) {
    console.log(
      "===============Started running service updateReminder==============",
    );

    console.log("updateReminder reminderId: ", documentId);

    try {
      const updatedReminder = await strapi
        .documents("api::reminder.reminder")
        .update({
          documentId: documentId,
          data: data,
          fields: ["remindAt", "sent", "message"],
          status: "published",
          populate: ["task"],
        });

      if (!updatedReminder) {
        return {};
      }

      return updatedReminder;
    } catch (err) {
      console.error("Original Error:", err);
      throw new Error("Failed to update reminder");
    }
  },
  async deleteReminder(documentId) {
    console.log(
      "===============Started running service deleteReminder==============",
    );

    console.log("deleteReminder reminderId: ", documentId);

    try {
      const deletedReminder = await strapi
        .documents("api::reminder.reminder")
        .delete({
          documentId: documentId,
        });

      if (!deletedReminder) {
        return {};
      }


      return deletedReminder;
    } catch (err) {
      console.error("Original Error:", err);
      throw new Error("Failed to delete reminder");
    }
  },
  async deleteAllReminders() {
    console.log(
      "===============Started running service deleteAllReminders==============",
    );

    try {
      const documents = await strapi
        .documents("api::reminder.reminder")
        .findMany({
          fields: ["documentId"],
        });

      if (documents.length === 0) {
        return [];
      }

      const deletedReminders = [];

      for (const document of documents) {
        const deletedReminder = await strapi
          .documents("api::reminder.reminder")
          .delete({
            documentId: document.documentId,
          });

        deletedReminders.push(deletedReminder);
      }

      return deletedReminders;
    } catch (err) {
      console.error("Original Error:", err);

      throw new Error("Failed to delete all reminders");
    }
  },
}));
