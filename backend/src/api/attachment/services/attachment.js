"use strict";

/**
 * attachment service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::attachment.attachment",
  ({ strapi }) => ({
    async createAttachment(body, files) {
      console.log(
        "===============Started running service createAttachment==============",
      );

      console.log("createAttachment service body/files: ", body, files);

      try {
        // Upload a file
        let uploadedAttachmentFiles = [];

        if (files?.attachmentFiles) {
          uploadedAttachmentFiles = await strapi
            .plugin("upload")
            .service("upload")
            .upload({
              data: {},
              files: files.attachmentFiles,
            });
        }

        const attachmentFileIds = uploadedAttachmentFiles.map(
          (file) => file.id,
        );

        const createdAttachment = await strapi
          .documents("api::attachment.attachment")
          .create({
            data: {
              name: body.name,
              attachmentFiles: attachmentFileIds,
            },
            locale: "en",
            status: "published",
            populate: {
              attachmentFiles: true,
              task: true,
            },
          });

        if (!createdAttachment) {
          throw new Error("Fail to create Attachment");
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

    async fetchAttachment(documentId) {
      console.log(
        "===============Started running service fetchAttachment==============",
      );

      console.log("attachment documentId: ", documentId);

      try {
        const fetchedAttachment = await strapi
          .documents("api::attachment.attachment")
          .findOne({
            documentId,
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
    async updateAttachment(documentId, body, files) {
      console.log(
        "===============Started running service updateAttachment==============",
      );

      console.log("updateAttachment service body/files: ", body, files);

      try {
        let uploadedAttachmentFiles = [];

        if (files?.attachmentFiles) {
          uploadedAttachmentFiles = await strapi
            .plugin("upload")
            .service("upload")
            .upload({
              data: {},
              files: files.attachmentFiles,
            });
        }

        const attachmentFileIds = uploadedAttachmentFiles.map(
          (file) => file.id,
        );

        const updatedAttachment = await strapi
          .documents("api::attachment.attachment")
          .update({
            documentId,
            data: {
              name: body.name,
              attachmentFiles: attachmentFileIds,
            },
            locale: "en",
            status: "published",
            populate: {
              attachmentFiles: true,
              task: true,
            },
          });

        if (!updatedAttachment) {
          throw new Error("Fail to update Attachment");
        }

        return updatedAttachment;
      } catch (err) {
        console.error("updateAttachment Service error message: ", err);

        throw err;
      }
    },
    async deleteAttachment(documentId) {
      console.log(
        "===============Started running service deleteAttachment==============",
      );

      try {
        const fetchedAttachment = await strapi
          .documents("api::attachment.attachment")
          .findOne({
            documentId,
            populate: ["attachmentFiles"],
          });

        if (!fetchedAttachment) {
          throw new Error("Fail to fetch Attachment");
        }

        const fetchedAttachments = await strapi
          .documents("api::attachment.attachment")
          .findMany({
            populate: ["attachmentFiles"],
          });

        if (!fetchedAttachments) {
          throw new Error("Fail to fetch all Attachments");
        }

        for (const media of fetchedAttachment.attachmentFiles) {
          let isReferenced = false;

          for (const attachment of fetchedAttachments) {
            if (attachment.documentId === documentId) {
              continue;
            }

            for (const mediafile of attachment.attachmentFiles) {
              if (mediafile.id === media.id) {
                isReferenced = true;
                break;
              }
            }

            if (isReferenced) {
              break;
            }
          }

          if (!isReferenced) {
            await strapi.plugin("upload").service("upload").remove(media);
          }
        }

        const deletedAttachment = await strapi
          .documents("api::attachment.attachment")
          .delete({
            documentId,
            locale: "en",
          });

        if (!deletedAttachment) {
          throw new Error("Fail to delete Attachment");
        }

        return deletedAttachment;
      } catch (err) {
        console.error("deleteAttachment Service error message: ", err);

        throw err;
      }
    },
    async deleteAllAttachments() {
      console.log(
        "===============Started running service deleteAllAttachments==============",
      );

      try {
        // fetch all attachment documents
        const fetchedAttachments = await strapi
          .documents("api::attachment.attachment")
          .findMany({
            populate: ["attachmentFiles"],
          });

        if (fetchedAttachments.length === 0) {
          throw new Error("Failed to fetch all Attachments");
        }

        // Creates a Map keyed by media id to eliminate duplicate media files
        const mediaMap = new Map();

        //puts all attachmentFiles into setOfAttachmentFiles ensuring no duplicate of attachmentFiles
        for (const attachment of fetchedAttachments) {
          for (const file of attachment.attachmentFiles) {
            mediaMap.set(file.id, file);
          }
        }

        //removing all attachmentFiles
        for (const file of mediaMap.values()) {
          await strapi.plugin("upload").service("upload").remove(file);
        }

        //delete fetchedAttachmentFiles
        const deletedAllAttachments = await strapi
          .documents("api::attachment.attachment")
          .deleteMany();

        if (!deletedAllAttachments) {
          throw new Error("Fail to delete Attachments");
        }

        return deletedAllAttachments;
      } catch (err) {
        console.error("deleteAllAttachments Service error message: ", err);

        throw err;
      }
    },
  }),
);
