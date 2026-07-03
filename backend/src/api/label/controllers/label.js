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
        .createLabel(ctx);

      if (!createdLabel) {
        throw new Error("Failed to created Label");
      }

      //returns createdLabel to the front end
      ctx.body = createdLabel;
    } catch (err) {
      console.error("createLabel Error Message: ", err);

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
      console.error("fetchLabels Error Message: ", err);

      throw err;
    }
  },
  async fetchLabel(ctx) {
    console.log("===============Started running fetchLabel==============");

    try {
      let fetchedLabel = await strapi
        .service("api::label.label")
        .fetchLabel(ctx);

      if (!fetchedLabel) {
        throw new Error("Failed to fetch the label");
      }

      //returns createdLabel to the front end
      ctx.body = fetchedLabel;
    } catch (err) {
      console.error("fetchLabel Error Message: ", err);

      throw err;
    }
  },
  async updatelabel(ctx) {
    console.log("===============Started running updatelabel==============");

    try {
      let updatedlabel = await strapi
        .service("api::label.label")
        .updatelabel(ctx);

      if (!updatedlabel) {
        throw new Error("Failed to update the label");
      }

      //returns createdLabel to the front end
      ctx.body = updatedlabel;
    } catch (err) {
      console.error("updatelabel Error Message: ", err);

      throw err;
    }
  },
  async deleteLabel(ctx) {
    console.log("===============Started running deleteLabel==============");

    try {
      let deletedLabel = await strapi
        .service("api::label.label")
        .deleteLabel(ctx);

      if (!deletedLabel) {
        throw new Error("Failed to delete the label");
      }

      //returns createdLabel to the front end
      ctx.body = deletedLabel;
    } catch (err) {
      console.error("deleteLabel Error Message: ", err);

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
      console.error("deleteAllLabels Error Message: ", err);

      throw err;
    }
  },
}));
