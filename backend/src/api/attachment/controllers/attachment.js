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

      console.log("ctx content: ", ctx);

      try {
        let createdAttachment = await strapi
          .service("api::attachment.attachment")
          .createAttachment(ctx);

        if (!createdAttachment) {
          throw new Error("Failed to create an Attachment");
        }

        //returns createdLabel to the front end
        ctx.body = createdAttachment;
      } catch (err) {
        console.error("createAttachment Error Message: ", err);

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
          throw new Error("Failed to fetch all Attachments");
        }

        //returns createdLabel to the front end
        ctx.body = fetchedAttachments;
      } catch (err) {
        console.error("fetchAttachments Error Message: ", err);

        throw err;
      }
    },
    async fetchAttachment(ctx) {
      console.log(
        "===============Started running fetchAttachment==============",
      );

      console.log("ctx content: ", ctx);

      try {
        let fetchedAttachment = await strapi
          .service("api::attachment.attachment")
          .fetchAttachment(ctx);

        if (!fetchedAttachment) {
          throw new Error("Failed to fetch an Attachment");
        }

        //returns createdLabel to the front end
        ctx.body = fetchedAttachment;
      } catch (err) {
        console.error("fetchAttachment Error Message: ", err);

        throw err;
      }
    },
    async updateAttachment(ctx) {
      console.log(
        "===============Started running updateAttachment==============",
      );

      console.log("ctx content: ", ctx);

      try {
        let updatedAttachment = await strapi
          .service("api::attachment.attachment")
          .updateAttachment(ctx);

        if (!updatedAttachment) {
          throw new Error("Failed to update an Attachment");
        }

        //returns createdLabel to the front end
        ctx.body = updatedAttachment;
      } catch (err) {
        console.error("updateAttachment Error Message: ", err);

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

        if (!deletedAttachments) {
          throw new Error("Failed to delete all Attachments");
        }

        //returns createdLabel to the front end
        ctx.body = deletedAttachments;
      } catch (err) {
        console.error("deleteAttachments Error Message: ", err);

        throw err;
      }
    },
  }),
);
