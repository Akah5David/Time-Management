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
      console.log("====== CONTROLLER HIT createReminders ======");
      console.log(ctx.request.body);

      try {
        const { body: reminderbody } = ctx.request;

        console.log("reminderbody: ", reminderbody);

        const newReminders = await strapi
          .service("api::reminder.reminder")
          .createReminders(reminderbody);

          if(newReminders.length === 0){
            return ctx.notFound("Failed To create Reminder")
          }

        ctx.body = newReminders;
      } catch (err) {
        console.log("createReminders Error Message", err);
        throw err;
      }
    },
    async fetchReminders(ctx) {
      console.log("====== CONTROLLER HIT fetchReminders ======");

      try {
        const reminders = await strapi
          .service("api::reminder.reminder")
          .fetchReminders();

        ctx.body = reminders;
      } catch (err) {
        console.log("fetchReminders Error Message", err);
        throw err;
      }
    },
    async fetchReminder(ctx) {
      console.log("====== CONTROLLER HIT fetchReminder ======");
      console.log(ctx.request.body);

      try {
        const { documentId } = ctx.params;

        console.log("Reminder ID: ", documentId);

        const result = await strapi
          .service("api::reminder.reminder")
          .fetchReminder(documentId);

        if (!result) {
          return ctx.notFound("Reminder not found");
        }

        ctx.body = result;
      } catch (err) {
        console.log("fetchReminder Error Message", err);
        throw err;
      }
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
        console.log("updateReminder Error Message", err);

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
        console.log("deleteReminder Error Message", err);

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
        console.log("deleteAllReminders Error Message", err);

        throw err;
      }
    },
  }),
);
