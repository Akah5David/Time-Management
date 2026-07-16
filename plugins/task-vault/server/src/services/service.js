const service = ({ strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },
});

export default service;

// "  AnalyticsService() {
//     strapi.Documents().
//   },
//   AchievementService() {
//     return "Welcome to Strapi 🚀";
//   },
//   ReportService() {
//     return "Welcome to Strapi 🚀";
//   },
//   NotificationService() {
//     return "Welcome to Strapi 🚀";
//   },
//   ScoreService() {
//     return "Welcome to Strapi 🚀";
//   },"
