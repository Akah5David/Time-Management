"use strict";

/**
 * attachment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::attachment.attachment",
  ({ strapi }) => ({
    async createAttachment(ctx) {
      print("===============Started running createAttachment==============");

      console.log("ctx content: ", ctx);
      
      try {
        let createdAttachment = await strapi
          .service("api::label.label")
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
      print("===============Started running fetchAttachments==============");

      try {
        let fetchedAttachments = await strapi
          .service("api::label.label")
          .fetchAttachments();

        if (fetchedAttachments.length === 0) {
          throw new Error("Failed to fetch Attachments");
        }

        //returns createdLabel to the front end
        ctx.body = fetchedAttachments;
      } catch (err) {
        console.error("fetchAttachments Error Message: ", err);

        throw err;
      }
    },
    async fetchAttachment(ctx) {
      print("===============Started running fetchAttachment==============");

      let attachmentId = ctx.params.id;

      try {
        let fetchedAttachment = await strapi
          .service("api::label.label")
          .fetchAttachment(attachmentId);

        if (!fetchedAttachment) {
          throw new Error("Failed to fetch an Attachment");
        }

        //returns createdLabel to the front end
        ctx.body = fetchedAttachment;
      } catch (err) {
        console.error("createLabel Error Message: ", err);

        throw err;
      }
    },
  }),
);
