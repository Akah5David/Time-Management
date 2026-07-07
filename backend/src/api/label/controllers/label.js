"use strict";

/**
 * label controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::label.label", ({ strapi }) => ({
  async createLabel(ctx) {
    console.log("===============Started running createLabel==============");

    try {
      let createdLabel = await strapi
        .service("api::label.label")
        .createLabel(ctx.request.body);

      if (!createdLabel) {
        return ctx.notFound("No label was created");
      }

      ctx.body = createdLabel;
    } catch (err) {
      console.log("createLabel Error Message", err);
      throw err;
    }
  },
  async fetchLabels(ctx) {
    console.log("===============Started running fetchLabels==============");

    try {
      let fetchedLabels = await strapi
        .service("api::label.label")
        .fetchLabels();

      if (fetchedLabels.length === 0) {
        return ctx.notFound("Failed to fetch all labels");
      }

      //returns fetchedLabels to the front end
      ctx.body = fetchedLabels;
    } catch (err) {
      console.log("fetchLabels Error Message", err);

      throw err;
    }
  },
  async fetchLabel(ctx) {
    console.log("===============Started running fetchLabel==============");

    console.log("label ID: ", ctx.params.id);
    try {
      let fetchedLabel = await strapi
        .service("api::label.label")
        .fetchLabel(ctx.params.documentId);

      if (!fetchedLabel) {
        return ctx.notFound("No Label found for update");
      }

      ctx.body = fetchedLabel;
    } catch (err) {
      console.log("fetchLabel Error Message", err);
      throw err;
    }
  },
  async updateLabel(ctx) {
    console.log("===============Started running updateLabel==============");
    console.log("Update request Body: ", ctx.request.body);

    try {
      let updatedLabel = await strapi
        .service("api::label.label")
        .updateLabel(ctx.params.documentId, ctx.request.body);

      if (!updatedLabel) {
        return ctx.notFound("No Label found");
      }

      ctx.body = updatedLabel;
    } catch (err) {
      console.log("updatelabel Error Message", err);

      throw err;
    }
  },
  async deleteLabel(ctx) {
    console.log("===============Started running deleteLabel==============");

    try {
      let deletedLabel = await strapi
        .service("api::label.label")
        .deleteLabel(ctx.params.documentId);

      if (!deletedLabel) {
        return ctx.notfound("No Label Found");
      }

      ctx.body = deletedLabel;
    } catch (err) {
      console.log("deleteLabel Error Message", err);

      throw err;
    }
  },
  async deleteAllLabels(ctx) {
    console.log("===============Started running deleteLabel==============");

    try {
      let deletedLabels = await strapi
        .service("api::label.label")
        .deleteAllLabels();

      if (!deletedLabels) {
        return ctx.notFound("No label found");
      }

      //returns createdLabel to the front end
      ctx.body = deletedLabels;
    } catch (err) {
      console.log("deleteAllLabels Error Message", err);

      throw err;
    }
  },
}));
