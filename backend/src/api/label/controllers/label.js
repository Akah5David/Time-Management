"use strict";

/**
 * label controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::label.label", ({ strapi }) => ({
  async createLabel(ctx) {
    print("===============Started running createLabel==============");

    let labelBody = ctx.request.body;
    try {
      let createdLabel = await strapi
        .service("api::label.label")
        .createLabel(labelBody);

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
    print("===============Started running fetchLabels==============");

    try {
      let fetchedLabels = await strapi
        .service("api::label.label")
        .fetchLabels();

      if (fetchedLabels.length === 0) {
        throw new Error("Failed to fetch labels");
      }

      //returns fetchedLabels to the front end
      ctx.body = fetchedLabels;
    } catch (err) {
      console.error("fetchLabels Error Message: ", err);

      throw err;
    }
  },
  async fetchLabel(ctx) {
    print("===============Started running fetchLabel==============");

    let labelId = ctx.params.id;

    try {
      let fetchedLabel = await strapi
        .service("api::label.label")
        .fetchLabel(labelId);

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
}));
