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
        throw new Error("Failed to create label");
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
        throw new Error("Failed to fetch all labels");
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

    try {
      let fetchedLabel = await strapi
        .service("api::label.label")
        .fetchLabel(ctx.params.id);

      if (!fetchedLabel) {
        return ctx.notFound("Label not found");
      }

      ctx.body = fetchedLabel;
    } catch (err) {
      console.log("fetchLabel Error Message", err);
      throw err;
    }
  },
  async updatelabel(ctx) {
    console.log("===============Started running updatelabel==============");

    try {
      let updatedlabel = await strapi
        .service("api::label.label")
        .updateLabel(ctx.params.id, ctx.request.body);

      if (!updatedlabel) {
        throw new Error("Failed to update the label");
      }

      ctx.body = updatedlabel;
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
        .deleteLabel(ctx.params.id);

      if (!deletedLabel) {
        throw new Error("Failed to delete the label");
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
        throw new Error("Failed to delete all labels");
      }

      //returns createdLabel to the front end
      ctx.body = deletedLabels;
    } catch (err) {
      console.log("deleteAllLabels Error Message", err);

      throw err;
    }
  },
}));
