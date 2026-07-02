"use strict";

/**
 * attachment service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::attachment.attachment",
  ({ strapi }) => ({
    async createAttachment(ctx) {
      console.log(
        "===============Started running service createAttachment==============",
      );

      const { body, files } = ctx.request;

      console.log("createAttachment service ctx: ", body, files);

      try {
        // Upload a file

        let uploadedAttachmentFiles = null;

        if (files?.attachmentFiles) {
          uploadedAttachmentFiles = await strapi
            .plugin("upload")
            .service("upload")
            .upload({
              data: {},
              files: files.attachmentFiles,
            });
        }

        console.log("uploadedAttachmentFiles: ", uploadedAttachmentFiles);

        //create Attachment

        const createdAttachment = await strapi
          .documents("api::attachment.attachment")
          .create({
            data: {
              name: body.name,
              attachmentFiles: uploadedAttachmentFiles.map((file) => file.id),
            },
            locale: "en",
            status: "published",
            populate: {
              attachmentFiles: true,
              task: true,
            },
          });

        if (!createdAttachment) {
          throw new Error("Fail to fetch Attachments");
        }

        return createdAttachment;
      } catch (err) {
        console.error("createAttachment Service error message: ", err);

        throw err;
      }
    },
    async fetchAttachments() {
      console.log(
        "===============Started running service fetchAttachments==============",
      );
      print;
      try {
        const fetchedAttachments = await strapi
          .documents("api::attachment.attachment")
          .findMany({
            locale: "en",
            status: "published",
            populate: ["task", "attachmentFiles"],
          });

        if (fetchedAttachments.length === 0) {
          throw new Error("Fail to fetch Attachments");
        }

        return fetchedAttachments;
      } catch (err) {
        console.error("fetchAttachments Service error message: ", err);

        throw err;
      }
    },

    async fetchAttachment(attachmentId) {
      print(
        "===============Started running service fetchAttachment==============",
      );

      console.log("attachmentId: ", attachmentId);

      try {
        const fetchedAttachment = await strapi
          .documents("api::attachment.attachment")
          .findOne({
            documentId: attachmentId,
            locale: "en",
            status: "published",
            populate: ["task", "attachmentFiles"],
          });

        return fetchedAttachment;
      } catch (err) {
        console.error("fetchAttachment Service error message: ", err);

        throw err;
      }
    },
    async updateAttachment(ctx) {
      console.log(
        "===============Started running service updateAttachment==============",
      );

      const { body, files } = ctx.request;
      const attachmentId = ctx.params;

      console.log("createAttachment service ctx: ", body, files);

      try {
        // Upload a file

        let uploadedAttachmentFiles = null;

        if (files?.attachmentFiles) {
          uploadedAttachmentFiles = await strapi
            .plugin("upload")
            .service("upload")
            .upload({
              data: {},
              files: files.attachmentFiles,
            });
        }

        console.log("uploadedAttachmentFiles: ", uploadedAttachmentFiles);

        //create Attachment

        const updatedAttachment = await strapi
          .documents("api::attachment.attachment")
          .update({
            documentId: attachmentId,
            data: {
              name: body.name,
              attachmentFiles: uploadedAttachmentFiles.map((file) => file.id),
            },
            locale: "en",
            status: "published",
            populate: {
              attachmentFiles: true,
              task: true,
            },
          });

        if (!updatedAttachment) {
          throw new Error("Fail to update Attachments");
        }

        return updatedAttachment;
      } catch (err) {
        console.error("createAttachment Service error message: ", err);

        throw err;
      }
    },
    async deleteAttachment(ctx) {
      console.log(
        "===============Started running service deleteAttachment==============",
      );

      const attachmentId = ctx.params.id;

      try {
        //fetch attachment document with doucmentId equals attachmentId
        const fetchedAttachment = await strapi
          .documents("api::attachment.attachment")
          .findOne({
            documentId: attachmentId,
            locale: "en",
            status: "published",
            populate: ["task", "attachmentFiles"],
          });

        if (!fetchedAttachment) {
          throw new Error("Fail to fetch Attachment");
        }

        // fetch all attachment documents
        const fetchedAttachments = await strapi
          .documents("api::attachment.attachment")
          .findMany({
            populate: ["task", "attachmentFiles"],
          });

        if (!fetchedAttachments) {
          throw new Error("Fail to fetch Attachments");
        }

        const isAttachmentFileMatch = fetchedAttachments.find((attachment) => {
          const isMatch = attachment.attachmentFiles.map((attachmentFile) => {
            if (attachmentFile.id === fetchedAttachment.attachmentFiles[0].id) {
              return true;
            } else {
              return false;
            }
          });
          return isMatch;
        });

        if (isAttachmentFileMatch === false) {
          //remove media from media library
          for (const file of fetchedAttachment.attachmentFiles) {
            await strapi.plugin("upload").service("upload").remove(file);
          }
        }

        //delete Attachment document

        const deletedAttachment = await strapi
          .documents("api::attachment.attachment")
          .delete({
            documentId: attachmentId,
            locale: "en",
          });

        if (!deletedAttachment) {
          throw new Error("Fail to delete Attachments");
        }

        return deletedAttachment;
      } catch (err) {
        console.error("deletedAttachment Service error message: ", err);

        throw err;
      }
    },
  }),
);
