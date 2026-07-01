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
  async fetchReminder(reminderId) {
    console.log("createTask Service is running");
    console.log("Reminder Id: ", reminderId);

    try {
      const reminder = await strapi
        .documents("api::reminder.reminder")
        .findOne({
          documentId: reminderId,
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
}));
