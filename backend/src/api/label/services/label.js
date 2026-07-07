"use strict";

/**
 * label service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::label.label", ({ strapi }) => ({
  async createLabel(labelBody) {
    console.log(
      "===============Started running service createLabel==============",
    );

    console.log("createLabel formBody", labelBody);

    try {
      const createdLabel = await strapi.documents("api::label.label").create({
        data: labelBody,
        locale: "en",
        status: "published",
        fields: ["name", "color"],
        populate: ["tasks", "users_permissions_user"],
      });

      if (!createdLabel) {
        return {};
      }

      return createdLabel;
    } catch (err) {
      console.error("Original Error:", err);

      throw new Error("Failed to create a new label");
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
          populate: ["tasks", "users_permissions_user"],
          pagination: {
            limit: 10,
            start: 0,
          },
          sort: "name:asc",
        });

      if (fetchedLabels.length === 0) {
        return [];
      }

      return fetchedLabels;
    } catch (err) {
      console.error("Original Error:", err);

      throw new Error("Failed to fetch labels");
    }
  },
  async fetchLabel(labelId) {
    console.log(
      "===============Started running service fetchLabel==============",
    );

    console.log("fetchLabel labelId: ", labelId);

    try {
      const fetchedLabel = await strapi.documents("api::label.label").findOne({
        documentId: labelId,
        locale: "en",
        fields: ["name", "color"],
        status: "published",
        populate: ["tasks", "users_permissions_user"],
      });

      if (!fetchedLabel) {
        return {};
      }

      return fetchedLabel;
    } catch (err) {
      console.error("Original Error:", err);

      throw new Error("Failed to fetch label");
    }
  },
  async updateLabel(labelId, body) {
    console.log(
      "===============Started running service updateLabel==============",
    );

    console.log("updateLabel labelId: ", labelId);
    console.log("updateLabel body: ", body);

    try {
      const updatedLabel = await strapi.documents("api::label.label").update({
        documentId: labelId,
        data: body,
        fields: ["name", "color"],
        status: "published",
        populate: ["tasks", "users_permissions_user"],
      });

      if (!updatedLabel) {
        return {};
      }

      return updatedLabel;
    } catch (err) {
      console.error("Original Error:", err);

      throw new Error("Failed to update label");
    }
  },
  async deleteLabel(labelId) {
    console.log(
      "===============Started running service deleteLabel==============",
    );

    console.log("deleteLabel labelId: ", labelId);

    try {
      const deletedLabel = await strapi.documents("api::label.label").delete({
        documentId: labelId,
      });

      if (!deletedLabel) {
        return {};
      }

      return deletedLabel;
    } catch (err) {
      console.error("Original Error:", err);

      throw new Error("Failed to delete label");
    }
  },
  async deleteAllLabels() {
    console.log(
      "===============Started running service deleteAllLabels==============",
    );

    try {
      const documents = await strapi.documents("api::label.label").findMany({
        fields: ["documentId"],
      });

      if (documents.length === 0) {
        return [];
      }

      const deletedLabels = [];

      for (const document of documents) {
        const deletedLabel = await strapi.documents("api::label.label").delete({
          documentId: document.documentId,
        });

        deletedLabels.push(deletedLabel);
      }

      if (deletedLabels.length === 0) {
        return [];
      }

      return deletedLabels;
    } catch (err) {
      console.error("Original Error:", err);

      throw new Error("Failed to delete all labels");
    }
  },
}));
