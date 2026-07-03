"use strict";

/**
 * label service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::label.label", ({ strapi }) => ({
  async createLabel(ctx) {
    console.log(
      "===============Started running service createLabel==============",
    );

    let labelBody = ctx.request.body;
    console.log("createLabel formBody", labelBody);

    try {
      const createdLabel = await strapi.documents("api::label.label").create({
        data: labelBody,
        locale: "en",
        fields: ["name", "color"],
        status: "published",
        populate: ["tasks", "users_permission_user"],
      });

      if (!createdLabel) {
        throw new Error("Failed to create a new label");
      }

      return createdLabel;
    } catch (err) {
      console.error("createLable Service error message: ", err);

      throw err;
    }
  },
  async fetchLabels() {
    console.log(
      "===============Started running search fetchLabels==============",
    );

    try {
      const fetchedLabels = await strapi
        .documents("api::label.label")
        .findMany({
          locale: "en",
          fields: ["name", "color"],
          status: "published",
          populate: ["tasks", "users_permission_user"],
          pagination: {
            limit: 10,
            start: 0,
          },
          sort: "name:asc",
        });

      if (!fetchedLabels) {
        throw new Error("Failed to fetch all labels");
      }

      return fetchedLabels;
    } catch (err) {
      console.error("fetchLabels Service error message: ", err);

      throw err;
    }
  },
  async fetchLabel(ctx) {
    console.log(
      "===============Started running service fetchLabel==============",
    );

    const labelId = ctx.params.id;

    console.log("fetchLabel labelId: ", labelId);

    try {
      const fetchedLabel = await strapi.documents("api::label.label").findOne({
        documentId: labelId,
        locale: "en",
        fields: ["name", "color"],
        status: "published",
        populate: ["tasks", "users_permission_user"],
      });

      if (!fetchedLabel) {
        throw new Error("Failed to fetch label");
      }

      return fetchedLabel;
    } catch (err) {
      console.error("fetchLabel Service error message: ", err);

      throw err;
    }
  },
  async updateLabel(ctx) {
    console.log(
      "===============Started running service updateLabel==============",
    );

    const labelId = ctx.params.id;

    console.log("updateLabel labelId: ", labelId);

    try {
      const updatedLabel = await strapi.documents("api::label.label").update({
        documentId: labelId,
        fields: ["name", "color"],
        status: "published",
        populate: ["tasks", "users_permission_user"],
      });

      if (!updatedLabel) {
        throw new Error("Failed to update label");
      }

      return updatedLabel;
    } catch (err) {
      console.error("updateLabel Service error message: ", err);

      throw err;
    }
  },
  async deleteLabel(ctx) {
    console.log(
      "===============Started running service deleteLabel==============",
    );

    const labelId = ctx.params.id;

    console.log("fetchLabel labelId: ", labelId);

    try {
      const deletedLabel = await strapi.documents("api::label.label").delete({
        documentId: labelId,
      });

      if (!deletedLabel) {
        throw new Error("Failed to update label");
      }

      return deletedLabel;
    } catch (err) {
      console.error("deleteLabel Service error message: ", err);

      throw err;
    }
  },
  async deleteAllLabels() {
    console.log(
      "===============Started running service deleteAllLabels==============",
    );

    try {
      const deletedLabels = await strapi
        .documents("api::label.label")
        .deleteMany();

      if (!deletedLabels) {
        throw new Error("Failed to update label");
      }

      return deletedLabels;
    } catch (err) {
      console.error("deleteAllLabels Service error message: ", err);

      throw err;
    }
  },
}));
