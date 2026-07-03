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

    async fetchAttachment(ctx) {
      console.log(
        "===============Started running service fetchAttachment==============",
      );

      const attachmentId = ctx.params.id;

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
      const attachmentId = ctx.params.id;

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
            populate: ["attachmentFiles"],
          });

        if (!fetchedAttachment) {
          throw new Error("Fail to fetch Attachment");
        }

        // fetch all attachment documents
        const fetchedAttachments = await strapi
          .documents("api::attachment.attachment")
          .findMany({
            populate: ["attachmentFiles"],
          });

        if (!fetchedAttachments) {
          throw new Error("Fail to fetch all Attachments");
        }

        // checks if every media in fetchedAttachment.attachmentFiles array is used
        // by other attachment attachmentFiles before deleting that media
        for (const media of fetchedAttachment.attachmentFiles) {
          // Assume this media is not referenced anywhere else
          let isReferenced = false;

          // Check every attachment in fetchedAttachments
          for (const attachment of fetchedAttachments) {
            // Skip the attachment we're deleting
            if (attachment.documentId === attachmentId) {
              continue;
            }

            // Check every media inside this attachment
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
            //remove media from media library
            await strapi.plugin("upload").service("upload").remove(media);
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

//fetch attachment document with doucmentId equals attachmentId
const fetchedAttachment = await strapi
  .documents("api::attachment.attachment")
  .findOne({
    documentId: attachmentId,
    populate: ["attachmentFiles"],
  });

if (!fetchedAttachment) {
  throw new Error("Fail to fetch Attachment");
}

// fetch all attachment documents
const fetchedAttachments = await strapi
  .documents("api::attachment.attachment")
  .findMany({
    populate: ["attachmentFiles"],
  });

if (!fetchedAttachments) {
  throw new Error("Fail to fetch all Attachments");
}

// checks if every media in fetchedAttachment.attachmentFiles array is used
// by other attachment attachmentFiles before deleting that media
for (const media of fetchedAttachment.attachmentFiles) {
  // Assume this media is not referenced anywhere else
  let isReferenced = false;

  // Check every attachment in fetchedAttachments
  for (const attachment of fetchedAttachments) {
    // Skip the attachment we're deleting
    if (attachment.documentId === attachmentId) {
      continue;
    }

    // Check every media inside this attachment
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
    //remove media from media library
    await strapi.plugin("upload").service("upload").remove(media);
  }
}
