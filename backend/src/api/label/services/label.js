"use strict";

/**
 * label service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::label.label", ({ strapi }) => ({
  async createLabel(formBody) {
    print("===============Started running service createLabels==============");

    console.log("createLabel formBody", formBody);

    try {
      const createdLabel = await strapi.documents("api::label.label").create({
        data: formBody,
        locale: "en",
        fields: ["name", "color"],
        status: "published",
        populate: ["tasks", "users_permission_user"],
      });

      return createdLabel;
    } catch (err) {
      console.error("createLable Service error message: ", err);

      throw err;
    }
  },
  async fetchLabels() {
    print("===============Started running search fetchLabels==============");

    try {
      const createdLabel = await strapi.documents("api::label.label").findMany({
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

      return createdLabel;
    } catch (err) {
      console.error("fetchLabels Service error message: ", err);

      throw err;
    }
  },
  async fetchLabel(labelId) {
    print("===============Started running service fetchLabel==============");

    console.log("fetchLabel labelId: ", labelId);

    try {
      const fetchedLabel = await strapi.documents("api::label.label").create({
        documentId: labelId,
        locale: "en",
        fields: ["name", "color"],
        status: "published",
        populate: ["tasks", "users_permission_user"],
      });

      return fetchedLabel;
    } catch (err) {
      console.error("fetchLabel Service error message: ", err);

      throw err;
    }
  },
}));
