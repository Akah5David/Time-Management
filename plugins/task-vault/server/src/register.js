const register = ({ strapi }) => {
  strapi.server.use(async (ctx, next) => {
    ctx.set('task-vault-Plugin-Version', '1.0.0');
    await next();
  });
};

export default register;
