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
      .service("api::subtask.subtask")
      .createSubtask(taskBody);

    ctx.body = result;
  },

  async fetchSubTasks(ctx) {
    console.log("CreatTask Running");

    console.log(ctx);

    const result = await strapi.service("api::subtask.subtask").fetchSubTasks();

    ctx.body = result;
  },
  async fetchSubTask(ctx) {
    console.log("CreatTask Running");

    console.log(ctx);

    let taskId = ctx.params.id;

    const result = await strapi
      .service("api::subtask.subtask")
      .fetchSubTask(taskId);

    ctx.body = result;
  },
}));

