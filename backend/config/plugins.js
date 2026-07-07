module.exports = ({ env }) => ({
  graphql: {
    enabled: true,
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: true,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  upload: {
    enabled: true,
    config: {},
  },
  sentry: {
    enabled: true,
    config: {
      dsn: "",
      sendMetadata: true,
      init: {},
    },
  },
  "content-manager": {
    enabled: true,
  },
  "content-type-builder": {
    enabled: true,
  },
  email: {
    enabled: true,
  },
  documentation: {
    enabled: true,
  },

  "users-permissions": {
    enabled: true,
  },
  "productivity-centre": {
    enabled: true,
    resolve: "./src/plugins/productivity-centre",
  },
});
