"use strict";

/**
 * reminder controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::reminder.reminder",
  ({ strapi }) => ({
    //Creatin a new Project
    async createReminders(ctx) {
      console.log("====== CONTROLLER HIT ======");
      console.log(ctx);

      const { body: reminderbody } = ctx.request;

      console.log("reminderbody: ", reminderbody);

      const newReminders = await strapi
        .service("api::reminder.reminder")
        .createNewProject(reminderbody);

      ctx.body = newReminders;
    },
    async fetchReminders(ctx) {
      console.log("====== CONTROLLER HIT ======");
      console.log(ctx);

      const reminders = await strapi
        .service("api::reminder.reminder")
        .fetchProjects();

      ctx.body = reminders;
    },
    async fetchReminder(ctx) {
      console.log("====== CONTROLLER HIT ======");
      console.log(ctx);

      const { documentId } = ctx.params;

      console.log("Reminder ID: ", documentId);

      const result = await strapi
        .service("api::reminder.reminder")
        .fetchReminder(documentId);

      ctx.body = result;
    },
    async updateReminder(ctx) {
      console.log(
        "===============Started running updateReminder==============",
      );

      try {
        const { documentId } = ctx.params;
        const { body } = ctx.request;

        const result = await strapi
          .service("api::reminder.reminder")
          .updateReminder(documentId, body);

        if (!result) {
          throw new Error("Failed to update reminder");
        }

        ctx.body = result;
      } catch (err) {
        console.error("updateReminder Error Message: ", err);

        throw err;
      }
    },
    async deleteReminder(ctx) {
      console.log(
        "===============Started running deleteReminder==============",
      );

      try {
        const { documentId } = ctx.params;

        const result = await strapi
          .service("api::reminder.reminder")
          .deleteReminder(documentId);

        if (!result) {
          throw new Error("Failed to delete reminder");
        }

        ctx.body = result;
      } catch (err) {
        console.error("deleteReminder Error Message: ", err);

        throw err;
      }
    },
    async deleteAllReminders(ctx) {
      console.log(
        "===============Started running deleteAllReminders==============",
      );

      try {
        let deletedAllReminders = await strapi
          .service("api::reminder.reminder")
          .deleteAllReminders();

        if (!deletedAllReminders) {
          throw new Error("Failed to delete all reminders");
        }

        ctx.body = deletedAllReminders;
      } catch (err) {
        console.error("deleteAllReminders Error Message: ", err);

        throw err;
      }
    },
  }),
);
