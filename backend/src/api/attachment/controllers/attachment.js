"use strict";

/**
 * attachment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::attachment.attachment",
  ({ strapi }) => ({
    async createAttachment(ctx) {
      console.log(
        "===============Started running createAttachment==============",
      );

      const { body, files } = ctx.request;
      console.log(body, files)

      try {
        let createdAttachment = await strapi
          .service("api::attachment.attachment")
          .createAttachment(body, files);

        if (!createdAttachment) {
          return ctx.notFound("Failed to create an Attachment");
        }

        //returns createdLabel to the front end
        ctx.body = createdAttachment;
      } catch (err) {
        console.log("createAttachment Error Message", err);
        throw err;
      }
    },
    async fetchAttachments(ctx) {
      console.log(
        "===============Started running fetchAttachments==============",
      );

      try {
        let fetchedAttachments = await strapi
          .service("api::attachment.attachment")
          .fetchAttachments();

        if (fetchedAttachments.length === 0) {
          return ctx.notFound("Failed to fetch all Attachments");
        }

        //returns createdLabel to the front end
        ctx.body = fetchedAttachments;
      } catch (err) {
        console.log("fetchAttachments Error Message", err);

        throw err;
      }
    },
    async fetchAttachment(ctx) {
      console.log(
        "===============Started running fetchAttachment==============",
      );

      const { documentId } = ctx.params;

      try {
        let fetchedAttachment = await strapi
          .service("api::attachment.attachment")
          .fetchAttachment(documentId);

        if (!fetchedAttachment) {
          return ctx.notFound("Attachment not found");
        }

        //returns createdLabel to the front end
        ctx.body = fetchedAttachment;
      } catch (err) {
        console.log("fetchAttachment Error Message", err);
        throw err;
      }
    },
    async updateAttachment(ctx) {
      console.log(
        "===============Started running updateAttachment service==============",
      );

      const { documentId } = ctx.params;
      const { body, files } = ctx.request;

      try {
        let updatedAttachment = await strapi
          .service("api::attachment.attachment")
          .updateAttachment(documentId, body, files);

        if (!updatedAttachment) {
          return ctx.notFound("Failed to update Attachment");
        }

        //returns createdLabel to the front end
        ctx.body = updatedAttachment;
      } catch (err) {
        console.log("updateAttachment Error Message", err);

        throw err;
      }
    },
    async deleteAttachment(ctx) {
      console.log(
        "===============Started running deleteAttachment==============",
      );

      const { documentId } = ctx.params;

      try {
        let deletedAttachment = await strapi
          .service("api::attachment.attachment")
          .deleteAttachment(documentId);

        if (!deletedAttachment) {
          return ctx.notFound("Failed to delete Attachment");
        }

        ctx.body = deletedAttachment;
      } catch (err) {
        console.log("deleteAttachment Error Message", err);

        throw err;
      }
    },
    async deleteAllAttachments(ctx) {
      console.log(
        "===============Started running deleteAllAttachments==============",
      );

      try {
        // removes FetchedAttachments
        let deletedAttachments = await strapi
          .service("api::attachment.attachment")
          .deleteAllAttachments();

        if (deletedAttachments.length === 0) {
          return ctx.notFound("Failed to delete all Attachments");
        }

        //returns createdLabel to the front end
        ctx.body = deletedAttachments;
      } catch (err) {
        console.log("deleteAllAttachments Error Message", err);

        throw err;
      }
    },
  }),
);
