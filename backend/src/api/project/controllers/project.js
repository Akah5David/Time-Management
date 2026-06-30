'use strict';

/**
 * project controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::project.project', ({strapi}) => ({
    //Creatin a new Project
    async createNewProject(ctx){
        console.log("====== CONTROLLER HIT ======");
        console.log(ctx)

        let projectBody = ctx.request.body;

        console.log("projectBody: ", projectBody)

        const newProject = await strapi.service('api::project.project').createNewProject(projectBody);

        return {data: newProject}

    }
}));
