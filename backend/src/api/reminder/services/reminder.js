"use strict";

/**
 * reminder service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::reminder.reminder", ({ strapi }) => ({
  async createReminders(formBody) {
    console.log("createReminders Service is running");

    const createdReminders = await strapi
      .documents("api::reminder.reminder")
      .create({
        data: formBody,
        locale: "en",
        fields: ["remindAt", "sent", "message"],
        status: "published",
        populate: ["task"],
      });

    return createdReminders;
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
          sort: "task:asc",
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
        throw new Error("No Reminder exist");
      }

      return reminders;
    } catch (err) {
      console.error(err);
      throw err;
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
        throw new Error("No Reminder exist");
      }

      return reminder;
    } catch (err) {
      console.error(err);

      throw err;
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
        throw new Error("Failed to update reminder");
      }

      return updatedReminder;
    } catch (err) {
      console.error("updateReminder Service error message: ", err);

      throw err;
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
        throw new Error("Failed to delete reminder");
      }

      return deletedReminder;
    } catch (err) {
      console.error("deleteReminder Service error message: ", err);

      throw err;
    }
  },
  async deleteAllReminders() {
    console.log(
      "===============Started running service deleteAllReminders==============",
    );

    try {
      const deletedReminders = await strapi
        .documents("api::reminder.reminder")
        .deleteMany();

      if (!deletedReminders) {
        throw new Error("Failed to delete all reminders");
      }

      return deletedReminders;
    } catch (err) {
      console.error("deleteAllReminders Service error message: ", err);

      throw err;
    }
  },
}));
