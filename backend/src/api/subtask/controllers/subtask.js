'use strict';

/**
 * subtask controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::subtask.subtask', ({ strapi }) => ({
  async createSubtask(ctx) {
    console.log("CreatTask Running");

    console.log(ctx);

    const taskBody = ctx.request.body;

    const result = await strapi
      .service("api::project.project")
      .createSubtask(taskBody);

    ctx.body = result;
  },

  async fetchSubTasks(ctx) {
    console.log("CreatTask Running");

    console.log(ctx);

    const result = await strapi.service("api::project.project").fetchSubTasks();

    ctx.body = result;
  },
  async fetchSubTask(ctx) {
    console.log("CreatTask Running");

    console.log(ctx);

    let taskId = ctx.params.id;

    const result = await strapi
      .service("api::project.project")
      .fetchSubTask(taskId);

    ctx.body = result;
  },
}));

