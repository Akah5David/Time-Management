module.exports = {
  routes: [
    {
      method: "POST",
      path: "/reminders/create",
      handler: "reminder.createReminders",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/reminders",
      handler: "reminder.fetchReminders",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/reminders/:id",
      handler: "reminder.fetchReminder",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
