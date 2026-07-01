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

      let reminderbody = ctx.request.body;

      console.log("reminderbody: ", reminderbody);

      const newReminders = await strapi
        .service("api::project.project")
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

      let { id } = ctx.request.params;

      console.log("Reminder ID: ", id);

      const reminder = await strapi
        .service("api::reminder.reminder")
        .fetchProject(id);

      ctx.body = reminder;
    },
  }),
);
